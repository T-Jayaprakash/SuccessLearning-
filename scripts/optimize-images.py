#!/usr/bin/env python3
"""
Resize + recompress site images.

The site ships full-resolution screenshots and photos (2560px wide PNGs shown in
a 278px box), which is what pushes the homepage payload past 16 MB and LCP past
20s on mobile.

Two modes:

  webp (default) — writes a .webp plus an optimised .jpg next to every source.
                   Smallest possible files, but the templates have to be updated
                   to point at the new extension.

  dropin         — keeps the original filename AND format, so the output can be
                   uploaded straight over the files on the server with no code
                   change. Files that do not shrink by at least --min-gain are
                   left out of the output entirely.

Usage:

    pip3 install --user pillow
    python3 scripts/optimize-images.py src/assets/images --out optimized
    python3 scripts/optimize-images.py live-assets --out dropin --mode dropin

Originals are never modified.
"""

import argparse
import os
import shutil
import sys

try:
    from PIL import Image, ImageChops, ImageStat
except ImportError:
    sys.exit("Pillow is required:  pip3 install --user pillow")

SOURCE_EXT = {".png", ".jpg", ".jpeg", ".webp"}


def resized(src, max_width):
    image = Image.open(src)
    image.load()
    before = image.size
    if image.width > max_width:
        height = round(image.height * max_width / image.width)
        image = image.resize((max_width, height), Image.LANCZOS)
    if image.mode in ("RGBA", "P", "LA"):
        image = image.convert("RGB")
    return image, before


def rms_error(a, b):
    """How far a palette-reduced PNG drifted from the true-colour version."""
    stat = ImageStat.Stat(ImageChops.difference(a, b.convert("RGB")))
    return (sum(value ** 2 for value in stat.rms) / len(stat.rms)) ** 0.5


def write_webp(image, dst_base, quality):
    image.save(dst_base + ".webp", "WEBP", quality=quality, method=6)
    image.save(dst_base + ".jpg", "JPEG", quality=quality, optimize=True, progressive=True)
    return os.path.getsize(dst_base + ".webp")


def write_dropin(image, dst, quality, max_drift):
    """Same filename, same format. PNGs get a palette pass when it stays faithful."""
    ext = os.path.splitext(dst)[1].lower()
    if ext in (".jpg", ".jpeg"):
        image.save(dst, "JPEG", quality=quality, optimize=True, progressive=True)
        return
    if ext == ".webp":
        image.save(dst, "WEBP", quality=quality, method=6)
        return

    image.save(dst, "PNG", optimize=True)
    plain_size = os.path.getsize(dst)
    quantized = image.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.Dither.NONE)
    if rms_error(image, quantized) <= max_drift:
        candidate = dst + ".q.png"
        quantized.save(candidate, "PNG", optimize=True)
        if os.path.getsize(candidate) < plain_size:
            os.replace(candidate, dst)
        else:
            os.remove(candidate)


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("folder", help="folder to walk, e.g. src/assets/images")
    parser.add_argument("--out", default="optimized", help="output folder (default: optimized)")
    parser.add_argument("--mode", choices=("webp", "dropin"), default="webp")
    parser.add_argument("--max-width", type=int, default=1200, help="max width in px (default: 1200)")
    parser.add_argument("--quality", type=int, default=80, help="WebP/JPEG quality (default: 80)")
    parser.add_argument("--min-kb", type=int, default=40, help="skip files smaller than this (default: 40)")
    parser.add_argument("--min-gain", type=int, default=15,
                        help="dropin mode: keep the result only if it is this %% smaller (default: 15)")
    parser.add_argument("--max-drift", type=float, default=5.0,
                        help="dropin mode: max RMS error allowed for a palette-reduced PNG (default: 5)")
    args = parser.parse_args()

    rows, skipped, total_before, total_after = [], 0, 0, 0

    for root, _dirs, files in os.walk(args.folder):
        for name in sorted(files):
            if os.path.splitext(name)[1].lower() not in SOURCE_EXT:
                continue
            src = os.path.join(root, name)
            size = os.path.getsize(src)
            rel = os.path.relpath(src, args.folder)
            if size < args.min_kb * 1024:
                skipped += 1
                continue

            try:
                image, before = resized(src, args.max_width)
            except OSError as error:
                print(f"skipped {rel}: {error}", file=sys.stderr)
                skipped += 1
                continue

            dst = os.path.join(args.out, rel)
            os.makedirs(os.path.dirname(dst), exist_ok=True)

            if args.mode == "webp":
                after = write_webp(image, os.path.splitext(dst)[0], args.quality)
            else:
                write_dropin(image, dst, args.quality, args.max_drift)
                after = os.path.getsize(dst)
                if after > size * (1 - args.min_gain / 100):
                    os.remove(dst)
                    skipped += 1
                    continue

            rows.append((rel, size, before, after, image.size))
            total_before += size
            total_after += after

    if not rows:
        print(f"nothing worth optimising in {args.folder}")
        return

    kb = lambda value: f"{value / 1024:.0f} KB"
    label = "webp" if args.mode == "webp" else "after"
    print(f"{'file':<46}{'before':>9}{'dims':>12}{label:>9}{'new dims':>12}")
    for rel, size, before, after, new in sorted(rows, key=lambda r: -r[1]):
        print(f"{rel:<46}{kb(size):>9}{f'{before[0]}x{before[1]}':>12}"
              f"{kb(after):>9}{f'{new[0]}x{new[1]}':>12}")
    saved = 100 - 100 * total_after / total_before
    print(f"\n{len(rows)} files rewritten, {skipped} left alone: "
          f"{total_before / 1024 / 1024:.2f} MB -> {total_after / 1024 / 1024:.2f} MB ({saved:.1f}% smaller)")
    print(f"output: {os.path.abspath(args.out)}")


if __name__ == "__main__":
    main()
