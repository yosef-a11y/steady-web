#!/usr/bin/env python3
"""Make the header nav and footer link columns identical on every page.

index.html is the single source of truth. Every other page gets its nav and
its footer link columns rewritten from it, with `href="#x"` turned into
`href="/#x"` because the homepage's in-page anchors have to become root
anchors everywhere else.

Why this exists: each new landing page was built by slicing the header and
footer out of an existing page. Those slices were a snapshot, so a page built
from a stale one silently shipped without the links added since, and the next
page built from *that* one inherited the gap and added its own. By 23 Nov 2026
four pages were missing between one and three nav entries each, and nothing
caught it — verify.mjs checks that links resolve, not that they are all there.

Usage: python3 tools/sync-nav.py [--check]
  --check  report drift and exit non-zero; change nothing.
"""
import re, sys, glob, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCE = 'index.html'

NAV = re.compile(r'<nav class="nav" aria-label="Main navigation">.*?</nav>', re.S)
# The three link columns, from the first through the last, leaving the brand
# column and the footer-bottom bar alone.
FOOT = re.compile(r'<div class="footer-links">.*(?=\s*</div>\s*</div>\s*<div class="footer-bottom">)', re.S)

def rootify(block):
    """Homepage in-page anchors become root anchors on every other page."""
    return re.sub(r'href="#', 'href="/#', block)

def main():
    check = '--check' in sys.argv
    src = (ROOT / SOURCE).read_text(encoding='utf-8')
    nav_m, foot_m = NAV.search(src), FOOT.search(src)
    if not (nav_m and foot_m):
        print(f'could not find nav/footer in {SOURCE}'); return 2
    nav, foot = rootify(nav_m.group(0)), rootify(foot_m.group(0))

    drift = []
    for path in sorted(glob.glob('*/index.html', root_dir=ROOT)):
        p = ROOT / path
        s = p.read_text(encoding='utf-8')
        out, changed = s, []
        for name, pat, want in (('nav', NAV, nav), ('footer', FOOT, foot)):
            m = pat.search(out)
            if not m:
                changed.append(f'{name} block not found'); continue
            if m.group(0) != want:
                changed.append(name)
                out = out[:m.start()] + want + out[m.end():]
        if changed:
            drift.append((path, changed))
            if not check:
                p.write_text(out, encoding='utf-8')

    for path, what in drift:
        print(f'  {path:50} {", ".join(what)}')
    if not drift:
        print('nav and footer are identical on every page')
        return 0
    if check:
        print(f'\n{len(drift)} page(s) drifted; run without --check to fix')
        return 1
    print(f'\nsynced {len(drift)} page(s) from {SOURCE}')
    return 0

if __name__ == '__main__':
    sys.exit(main())
