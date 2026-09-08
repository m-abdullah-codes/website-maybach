"""Rebuild public/fonts/*.woff2 from the untouched Google builds in src/fonts/masters.

Two operations, both lossless for this design:

* Latin faces are variable fonts whose delta tables are most of their weight. The type scale
  (docs/02 §2.2) asks for one weight of Bodoni Moda (400) and two of Manrope (400 and 500), so the
  wght axis is pinned or clipped to exactly that. The opsz axis stays: `font-optical-sizing: auto`
  is what keeps the Didone's hairlines honest from 26 px to 96 px. They are then cut to Latin-1
  (every accented letter a European marque or model name uses) plus the typographic punctuation
  in the copy; Greek, Cyrillic and Vietnamese go.
* Arabic faces carry the whole Unicode Arabic block plus its presentation forms. They are cut to
  Modern Standard Arabic (letters, diacritics, punctuation, both digit systems) with the full
  layout closure, so shaping — initial / medial / final / isolated forms, lam-alef, marks — is
  untouched. Every Arabic codepoint in content/ is verified present before a file is written.

Run: python scripts/subset-fonts.py

The faces are served from /fonts with a one-year immutable cache (next.config.ts), so bump the ?v
token in the @font-face urls in src/app/globals.css and in the preload links in src/lib/fonts.ts
whenever a face is rebuilt.
"""

import os
import sys
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src", "fonts", "masters")
OUT = os.path.join(ROOT, "public", "fonts")

# Modern Standard Arabic, both digit systems, Arabic punctuation, plus ASCII and the typographic
# punctuation the copy uses. Persian / Urdu letters and the legacy presentation-form codepoints are
# dropped; the shaping glyphs behind them stay because the layout closure keeps them.
ARABIC = (
    "U+0600-0605,U+060C,U+060D,U+061B,U+061C,U+061E-061F,U+0621-063A,U+0640-0652,U+0653-0655,"
    "U+0660-066D,U+0670-0671,U+06D6-06DC,U+06DF-06E8,U+06EA-06ED,U+06F0-06F9,"
    "U+FD3E,U+FD3F,U+FDF2,U+FDFA,U+FDFD,U+200C-200F,U+2010-2011,"
    "U+0020-007E,U+00A0,U+00AB,U+00BB,U+00B7,U+00D7,U+2018-201D,U+2022,U+2026,U+FEFF"
)

LATIN = [
    # file, wght limit
    ("bodoni-moda-latin.woff2", {"wght": 400}),
    ("bodoni-moda-latin-italic.woff2", {"wght": 400}),
    ("manrope-latin.woff2", {"wght": (400, 500)}),
]

LATIN_UNICODES = (
    "U+0020-007E,U+00A0,U+00B7,U+00D7,U+00A9,U+00AE,U+00B0,U+00BD,U+2122,"
    "U+2010-2015,U+2018-201D,U+2022,U+2026,U+2032,U+2033,U+FEFF,"
    "U+00C0-00FF,U+0152,U+0153,U+0160,U+0161,U+0178,U+017D,U+017E"
)
ARABIC_FILES = ["amiri-arabic.woff2", "plex-sans-arabic-400.woff2", "plex-sans-arabic-500.woff2"]


def kb(path):
    return os.path.getsize(path) / 1024


def content_codepoints():
    text = ""
    for name in ("site.ar.json", "cars.json"):
        with open(os.path.join(ROOT, "content", name), encoding="utf8") as handle:
            text += handle.read()
    return sorted({ord(c) for c in text if 0x600 <= ord(c) <= 0x77F})


def main():
    used = content_codepoints()
    rows = []

    for name, limits in LATIN:
        src, dst = os.path.join(SRC, name), os.path.join(OUT, name)
        before = kb(src)
        font = TTFont(src)
        instancer.instantiateVariableFont(font, limits, inplace=True, updateFontNames=False)
        tmp = dst + ".tmp.ttf"
        font.flavor = None
        font.save(tmp)
        subset.main([
            tmp,
            "--unicodes=" + LATIN_UNICODES,
            "--layout-features=*",
            "--flavor=woff2",
            "--desubroutinize",
            "--name-IDs=1,2,3,4,5,6",
            "--output-file=" + dst,
        ])
        os.remove(tmp)
        rows.append((name, before, kb(dst)))

    for name in ARABIC_FILES:
        src, dst = os.path.join(SRC, name), os.path.join(OUT, name)
        before = kb(src)
        tmp = dst + ".tmp"
        subset.main([
            src,
            "--unicodes=" + ARABIC,
            "--layout-features=*",
            "--flavor=woff2",
            "--desubroutinize",
            "--name-IDs=1,2,3,4,5,6",
            "--output-file=" + tmp,
        ])
        cmap = TTFont(tmp).getBestCmap()
        missing = [c for c in used if c not in cmap]
        if missing:
            os.remove(tmp)
            sys.exit(f"{name}: {len(missing)} codepoint(s) in content/ would be lost: "
                     + " ".join(f"U+{c:04X}" for c in missing))
        os.replace(tmp, dst)
        rows.append((name, before, kb(dst)))

    total_before = sum(r[1] for r in rows)
    total_after = sum(r[2] for r in rows)
    for name, before, after in rows:
        print(f"{name:32} {before:6.1f} KB -> {after:6.1f} KB  ({after / before - 1:+.0%})")
    print(f"{'total':32} {total_before:6.1f} KB -> {total_after:6.1f} KB  "
          f"({total_after / total_before - 1:+.0%})")


if __name__ == "__main__":
    main()
