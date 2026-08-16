# Performance Notes (PageSpeed 52 mobile / 56 desktop)

Measured on the live homepage on 16 Aug 2026, matching the PSI run.

## Where the 16 MB goes

Loading `https://www.successlearning.in/` in a real browser and reading the
Resource Timing API:

```
all resources : 12.2 MB
images        : 11.9 MB  (25 requests)  <- 97% of the page
```

Almost all of it is seven screenshots in one section:

| File | Transferred | Natural size | Displayed at |
| --- | --- | --- | --- |
| `student-results/image (6).png` | 2 569 KB | 2560×1751 | 278×174 |
| `student-results/image (1).png` | 1 501 KB | 1600×1094 | 278×174 |
| `student-results/image (5).png` | 1 353 KB | 1600×1094 | 278×174 |
| `student-results/image (3).png` | 1 275 KB | 1600×1094 | 278×174 |
| `student-results/image (4).png` | 1 252 KB | 1600×1094 | 278×174 |
| `student-results/image (2).png` | 1 236 KB | 1600×1094 | 278×174 |
| `student-results/image (7).png` | 1 073 KB | 2560×1751 | 278×174 |
| **total** | **10.2 MB** | | |

They are PNG screenshots of certificates — the worst possible format for that
content — served at 9× the pixels they are displayed at. This single section is
PSI's "Improve image delivery — est. savings of 10,525 KiB" and it is what drags
mobile LCP to 21.8 s on a throttled connection.

## Fix 1 — recompress those images (biggest win by far)

`scripts/optimize-images.py` (new) resizes to a sane width and writes WebP +
JPEG next to each source, without touching the originals:

```bash
pip3 install --user pillow
python3 scripts/optimize-images.py src/assets/images --out optimized
```

Result on the seven screenshots plus three other heavy images:

```
10.67 MB  ->  0.54 MB as WebP   (94.9% smaller)
          ->  0.87 MB as JPEG   (91.9% smaller)
```

Certificate text stays perfectly readable at 1000 px wide / quality 80.

Ready-made output for the seven screenshots is in
`../successlearning-optimized-images/` — copy the `.webp` files into
`src/assets/images/student-results/` and point the template at them. Expected
effect: homepage payload 12 MB → ~2 MB, mobile LCP from ~22 s to a few seconds.

Because the live site cannot be rebuilt from this repo (see the warning at the
bottom), the script also has a `--mode dropin` pass that keeps the original
filename **and** format, so the output can be uploaded straight over the server's
files with no code change (PNGs get a palette pass only when the RMS drift stays
under the threshold, so photos are not banded).

That is what `../successlearning-upload/assets/` contains — every image the
deployed bundles reference, pulled from the live server and rewritten:

| Folder | Files | Before | After | Saved |
| --- | --- | --- | --- | --- |
| `student-results/` | 10 | 13.19 MB | 1.37 MB | 90% |
| `gallery/` | 19 | 4.52 MB | 2.11 MB | 53% |
| `destinations/` | 10 | 2.33 MB | 1.35 MB | 42% |
| `images/` (root) | 7 | 0.99 MB | 0.71 MB | 29% |
| `courses/` | 7 | 0.54 MB | 0.42 MB | 23% |
| **total** | **53** | **21.58 MB** | **5.95 MB** | **72%** |

Ten more files were left alone because they would not have shrunk by 15%.
Switch to the WebP output whenever the real source turns up.

Also found while pulling the assets: `assets/images/destinations/hero.jpg` is
referenced by the deployed code but is missing on the server — the URL returns a
29-byte HTML error page, so that image is broken on the live site.

## Fix 2 — render-blocking CSS (done in this repo)

`index.html` loaded Google Fonts and the Bootstrap Icons CSS as blocking
stylesheets (PSI: "Render-blocking requests, est. savings 810 ms"). Both are now
loaded with `rel="preload" as="style"` + `onload` promotion, with a `<noscript>`
fallback, and `cdn.jsdelivr.net` is preconnected.

## Fix 3 — cache lifetimes (done in this repo)

PSI: "Use efficient cache lifetimes — est. savings 1,223 KiB". The origin served
assets with no far-future caching. The `.htaccess` added for the SEO fix sets one
year on hashed JS/CSS/fonts, six months on images, and no-cache on `index.html`,
`robots.txt` and `sitemap.xml`.

## Fix 4 — CLS 0.132 (needs template edits)

Only 16 of 38 `<img>` elements on the homepage carry `width`/`height`
attributes, so the page reflows as images arrive. Add explicit `width` and
`height` (or a CSS `aspect-ratio`) to every `<img>` — especially the course
cards, destination cards and the student-results gallery.

## Fix 5 — right-size the rest

Same script, same idea:

| File | Now | After |
| --- | --- | --- |
| `IMG-20231227-WA0003.jpg` (eager, above the fold, 1600×1200 shown at 480×360) | 176 KB | 60 KB @ 960 px |
| `courses/korean.jpg` (960×723 shown at 310×233) | 219 KB | 67 KB @ 640 px |
| `destinations/canada.jpg` | 278 KB | 89 KB @ 700 px |

Also: the repo carries `src/assets/images/destinations/*.png` (8.3 MB) that
nothing references — the code uses the `.jpg` versions. Deleting the PNGs cuts
the deploy upload by ~8 MB.

## Fix 6 — preload the LCP image

Once the hero image is settled, add
`<link rel="preload" as="image" href="…">` for it in `index.html` so it starts
downloading before the JS bundle boots. Angular renders everything client-side,
so today no image request even starts until `main.js` has parsed.

---

⚠️ **The live site is not built from this repository.**

The deployed bundle references `assets/images/student-results/…`,
`assets/images/sl-logo-new.png`, `assets/images/courses/korean.jpg` and
`assets/images/partner-bsfl.jpeg`. None of those exist on `origin/main` (last
commit 17 May 2026) or on `origin/gh-pages` (a build from 29 May 2026), while the
live build is from 10 Jun 2026. Fixes 1, 4, 5 and 6 touch templates and assets
that only exist in whatever working copy the live site is built from — apply them
there, and push that source to GitHub so the repo stops drifting.
