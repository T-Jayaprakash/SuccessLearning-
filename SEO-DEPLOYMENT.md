# SEO & Deployment Notes

What was wrong, what changed in this repo, and the two things that still have to
be done by hand in the Cloudflare dashboard.

Canonical domain for the whole site: **https://www.successlearning.in**

---

## 1. Inner pages returned 404

**Diagnosis**

```
GET https://www.successlearning.in/        -> 200
GET https://www.successlearning.in/about   -> 404   (Apache/LiteSpeed error page)
GET https://www.successlearning.in/about/  -> 404
```

The site is an Angular SPA built with the plain `browser` builder — there is no
`about/index.html` on disk. Only `/index.html` exists, so the web server answers
404 for every route except `/`. The Angular router never gets a chance to run.
Crawlers see a 404 and drop the page from the index.

**Fix (in this repo)**

- `src/.htaccess` — new. Rewrites any request that is not an existing file or
  directory to `/index.html` with a **200** status, so `/about`,
  `/courses/ielts-coaching`, `/study-abroad/canada`, etc. all load. It also
  301-redirects `successlearning.in` → `www.successlearning.in`, sets long cache
  headers for the hashed build assets, and keeps `index.html`, `robots.txt` and
  `sitemap.xml` uncached so deploys go live immediately.
- `angular.json` — the `.htaccess`, `robots.txt` and `sitemap.xml` files are now
  copied into `dist/success-learning/` by `ng build`.

**Deploy**

```bash
ng build
```

Upload the **contents** of `dist/success-learning/` into `public_html/`.
`.htaccess` is a hidden file — turn on "show hidden files" in hPanel's File
Manager, or make sure your FTP client is not filtering dotfiles, otherwise the
routing fix will not be uploaded and the 404s stay.

Then purge the Cloudflare cache (Caching → Configuration → Purge Everything).

**Verify**

```bash
curl -sI https://www.successlearning.in/about | head -1
curl -sI https://www.successlearning.in/courses/ielts-coaching | head -1
curl -sI https://successlearning.in/about | head -1   # expect 301 -> www
```

The first two must say `HTTP/2 200`.

**If the origin is not Apache/LiteSpeed**

Same idea, different file:

```nginx
# nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

```caddy
# Caddy
handle {
    root * /srv/dist/success-learning
    try_files {path} /index.html
    file_server
}
```

---

## 2. robots.txt blocked crawlers

**Diagnosis**

The origin had no `robots.txt` at all (404). What was being served came from
**Cloudflare's managed robots.txt**, which injects a block list:

```
User-agent: GPTBot            Disallow: /
User-agent: ClaudeBot         Disallow: /
User-agent: Google-Extended   Disallow: /
User-agent: CCBot             Disallow: /
User-agent: Amazonbot / Applebot-Extended / Bytespider / meta-externalagent …
```

That is what SEMrush's AI-visibility report flags. On top of that, Cloudflare's
"Block AI bots" rule is actively returning **403** to those user agents, so the
block is enforced even for crawlers that ignore robots.txt.

**Fix (in this repo)**

`src/robots.txt` — a plain, standard file with no restrictions and the sitemap
reference:

```
User-agent: *
Allow: /

Sitemap: https://www.successlearning.in/sitemap.xml
```

**Fix (manual — Cloudflare dashboard, required)**

The uploaded file alone is not enough; Cloudflare rewrites/serves robots.txt at
the edge. In the Cloudflare dashboard for `successlearning.in`:

1. **AI Crawl Control** (older name: Bot Management → AI Scrapers & Crawlers):
   - turn **off** "Manage robots.txt" / "Add Cloudflare's managed robots.txt
     entries" — this is what adds the `Disallow: /` block list.
   - set the AI crawler policy to **Allow** (turn off "Block AI bots" / "Block AI
     scrapers and crawlers"), otherwise GPTBot, ClaudeBot, PerplexityBot etc.
     keep getting 403 and AI-visibility tools keep reporting the site as blocked.
2. **Security → WAF**: check there is no custom rule blocking bot/AI user agents.
3. Purge the cache, then confirm:

```bash
curl -s https://www.successlearning.in/robots.txt
```

The output should be only the four lines above — no "Cloudflare Managed content"
block.

---

## 3. sitemap.xml missing

**Fix (in this repo)**

`src/sitemap.xml` — 38 URLs, all on the `www` host. Every one was checked
against the **live** site on 16 Aug 2026 by driving the Angular router, not taken
from this repo's routes (the repo is older than the deployed build — see the
warning in `PERFORMANCE.md`):

| Group | Count |
| --- | --- |
| Core pages (`/`, `/about`, `/courses`, `/study-abroad`, `/testimonials`, `/gallery`, `/resources`, `/contact`) | 8 |
| Course detail pages (`/courses/<slug>`) | 12 |
| Local SEO landing pages (`/ielts-coaching-in-trichy`, …) | 6 |
| Study-abroad destinations (`/study-abroad/<slug>`) | 12 |

`/courses/pte-oet-duolingo` is excluded on purpose — it redirects to `/courses`
on the live site, so it must not be listed.

It is referenced from `robots.txt`.

**After deploying**, submit it in Google Search Console → Sitemaps:
`https://www.successlearning.in/sitemap.xml`, and in Bing Webmaster Tools.

The sitemap is a static file — when a course, destination or landing page is
added, add the URL here too and refresh `<lastmod>`. Sources of truth:
`src/app/app-routing.module.ts`, `src/assets/data/courses.json`,
`src/app/core/data/destinations.data.ts`.

> Note: the sitemap only helps once fix #1 is deployed. Until then Google fetches
> each sitemap URL and gets a 404.

---

## 4. Also fixed while in here

- **Canonical tags.** `index.html` hard-codes
  `<link rel="canonical" href="…/">`, and no page component overrode it — so
  every route was telling Google "I am a duplicate of the homepage".
  `AppComponent` now updates the canonical link (and `og:url`) on every
  `NavigationEnd` via `SeoService.setCanonicalFromPath()`.
- **www vs non-www.** Both hosts served 200 with no redirect (duplicate content).
  The `.htaccess` now 301s non-www → www, and every canonical, `og:url`,
  JSON-LD `url`/`logo` and sitemap entry uses `https://www.successlearning.in`.

---

## 5. Still open (recommended, not done here)

- **HTTP is not redirected to HTTPS.** `http://successlearning.in/` currently
  answers 200 instead of redirecting. Fix it with one toggle in Cloudflare:
  SSL/TLS → Edge Certificates → **Always Use HTTPS = On**. (Doing this in
  `.htaccess` instead risks a redirect loop behind Cloudflare's proxy, so use the
  dashboard toggle.)
- **Soft 404s.** `app-routing.module.ts` ends with
  `{ path: '**', redirectTo: '' }`, so any unknown URL now returns 200 and shows
  the homepage. Google reports these as soft 404s. Better: a small NotFound
  component that renders a real "page not found" screen and sets
  `<meta name="robots" content="noindex">`.
- **Client-side rendering.** All content is rendered by JavaScript. Google
  handles this, but most AI crawlers and SEO tools do not execute JS, which caps
  the site's AI visibility. Angular SSR / prerendering (`@angular/ssr`, or
  `ng add @nguniversal/express-engine` for v16) would fix that, and would also
  make the routing fix unnecessary. Bigger job — worth planning separately.
