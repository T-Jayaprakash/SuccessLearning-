# Deploy package — successlearning.in

Ready-to-upload copy of `public_html/`. Everything under
`deploy/public_html/` goes onto the server as-is.

Everything in this folder is a **drop-in replacement** for files already on the
server. No rebuild is needed, because the live site cannot be rebuilt right now:
the deployed JavaScript references pages and images (student-results gallery,
Korean classes, new logo, IDP/BSFL partner logos) that do not exist in the
GitHub repo. The repo's last commit is 17 May 2026, the live build is 10 Jun
2026. **Do not run `ng build` from the GitHub repo and upload it — that would
delete the newer pages from the live site.**

Upload target: Hostinger hPanel → File Manager → `public_html/`

## What to upload

| File in this folder | Goes to | Replaces |
| --- | --- | --- |
| `.htaccess` | `public_html/.htaccess` | (new file) |
| `robots.txt` | `public_html/robots.txt` | (new file) |
| `sitemap.xml` | `public_html/sitemap.xml` | (new file) |
| `index.html` | `public_html/index.html` | existing — **back it up first** |
| `assets/images/…` (53 files) | `public_html/assets/images/…` (same subfolders) | existing — **back them up first** |

`.htaccess` is a hidden file. In hPanel File Manager turn on
**Settings → Show hidden files**, or your FTP client will silently skip it and
the 404 fix will not take effect.

## Steps

1. **Back up** the current `index.html` and the whole `assets/images` folder
   (right-click → Compress → Download, or copy to `public_html/_backup/`).
2. Upload `.htaccess`, `robots.txt` and `sitemap.xml` into `public_html/`.
3. Upload the patched `index.html` into `public_html/` (overwrite).
4. Upload the `assets` folder into `public_html/`, merging and overwriting.
   Every filename, folder and file format is unchanged, so no code change is
   needed anywhere. Files that would not have shrunk meaningfully are simply not
   in this package — leave those on the server as they are.
5. Cloudflare dashboard → Caching → Configuration → **Purge Everything**.
6. Cloudflare dashboard → **AI Crawl Control**: turn off "Manage robots.txt" and
   set the AI crawler policy to Allow. Without this, Cloudflare keeps serving its
   own robots.txt with `Disallow: /` for GPTBot, ClaudeBot, Google-Extended, CCBot
   and others, and keeps answering them with 403.
7. Cloudflare dashboard → SSL/TLS → Edge Certificates → **Always Use HTTPS = On**
   (`http://successlearning.in/` currently answers 200 instead of redirecting).

## Verify (should all be 200, except the 301)

```bash
curl -sI https://www.successlearning.in/about | head -1
curl -sI https://www.successlearning.in/courses/korean-classes | head -1
curl -sI https://www.successlearning.in/study-abroad/south-korea | head -1
curl -sI https://www.successlearning.in/sitemap.xml | head -1
curl -sI https://successlearning.in/about | head -1        # 301 -> www
curl -s  https://www.successlearning.in/robots.txt          # 4 lines, no Cloudflare block
```

Then Google Search Console → Sitemaps → submit
`https://www.successlearning.in/sitemap.xml`.

## What each file changes

**`.htaccess`** — the actual 404 fix. Any URL that is not a real file on disk is
served `index.html` with status **200**, so `/about`, `/courses/ielts-coaching`,
`/study-abroad/canada` and every other route work for crawlers, not just for
users clicking inside the app. Also: non-www → www 301, one-year caching for the
hashed JS/CSS, no-cache for `index.html` / `robots.txt` / `sitemap.xml`, gzip.

**`robots.txt`** — plain, open crawl policy plus the sitemap reference. Only
takes effect after step 6.

**`sitemap.xml`** — 38 URLs, verified one by one against the live site on
16 Aug 2026 (8 core + 12 course pages + 6 local landing pages + 12 study-abroad
destinations). `/courses/pte-oet-duolingo` is deliberately excluded: it redirects
to `/courses`, so it must not be in the sitemap.

**`index.html`** — three head changes on top of the live file:
canonical + `og:url` now point at `https://www.successlearning.in/`; the
JSON-LD `url` matches; and the Bootstrap Icons stylesheet from jsDelivr is
loaded non-blocking (`rel="preload" as="style"` with a `<noscript>` fallback),
which is PSI's "render-blocking requests, 810 ms". Nothing else in the file is
touched.

**`assets/images/…`** — every image the deployed site actually references (found
by reading the live JS bundles, 53 of 63 were worth rewriting), resized and
recompressed. Same names, same formats:

| Folder | Files | Before | After | Saved |
| --- | --- | --- | --- | --- |
| `student-results/` | 10 | 13.19 MB | 1.37 MB | 90% |
| `gallery/` | 19 | 4.52 MB | 2.11 MB | 53% |
| `destinations/` | 10 | 2.33 MB | 1.35 MB | 42% |
| `images/` (root) | 7 | 0.99 MB | 0.71 MB | 29% |
| `courses/` | 7 | 0.54 MB | 0.42 MB | 23% |
| **total** | **53** | **21.58 MB** | **5.95 MB** | **72%** |

The `student-results` screenshots alone were 10.2 MB of the homepage's 12 MB
payload — the whole reason mobile LCP is 21.8 s. They were 1600–2560 px wide PNGs
displayed in a 278 px box; now 1000 px, and the certificate text is still sharp
(open `assets/images/student-results/image (1).png` if you want to check before
uploading). Gallery photos were up to 4160 px wide and are now capped at 1200 px.

## One broken image on the live site

`assets/images/destinations/hero.jpg` is referenced by the code but does not
exist on the server — it answers with a 29-byte HTML error page instead of an
image. Either upload the file or remove the reference when the source is found.

## Still worth doing (needs the source code)

- Explicit `width`/`height` on every `<img>` (only 16 of 38 have them) — fixes
  the 0.132 CLS.
- Serve the images as WebP (0.54 MB instead of 1.10 MB) — needs a template edit.
- Per-route canonical tags: every page currently reports the homepage as its
  canonical URL. The fix is committed in the GitHub repo
  (`app.component.ts` + `seo.service.ts`) but cannot reach the live site until
  the newer source is found and rebuilt.

**Priority: find the source the 10 Jun build came from** (another laptop, a
Downloads folder, whoever ran the last deploy) and push it to GitHub. Until
then the site cannot be changed beyond static files like these.
