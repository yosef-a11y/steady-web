#!/usr/bin/env python3
"""Regenerate sitemap.xml <lastmod> values from git history.

A page's lastmod should be the last time its *content* changed, not the last
time the file was touched. Site-wide mechanical edits — bumping the
styles.css?v= cache-buster, adding a nav or footer link when a new page is
published — touch every file without changing what the page says, and a
sitemap that claims all 22 pages changed on the same day teaches crawlers to
ignore its dates.

So each commit's diff for a page is examined, and the commit only counts if it
changed a line that isn't one of those mechanical edits.

Usage: python3 tools/sitemap-lastmod.py [--check]
  --check  report what would change and exit non-zero; don't write.
"""
import re, subprocess, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
PREFIX = 'https://steadygrowthmarketing.com/'

# A changed line matching any of these is a mechanical, site-wide edit.
MECHANICAL = (
    re.compile(r'styles\.css\?v='),                                   # cache-buster bump
    re.compile(r'<li><a href="/[a-z0-9\-]+/">[^<]*</a></li>\s*$'),     # nav / footer entry
    re.compile(r'dataLayer|gtag\(|^\s*</?script>\s*$'),               # the GA4 snippet
)

def git(*args):
    return subprocess.run(['git', *args], cwd=ROOT, capture_output=True, text=True).stdout

def substantive_date(path):
    """Date of the newest commit that changed something other than boilerplate."""
    commits = git('log', '--format=%H %ad', '--date=short', '--', path).splitlines()
    for line in commits:
        sha, date = line.split(' ', 1)
        diff = git('show', '--format=', '--unified=0', sha, '--', path).splitlines()
        for d in diff:
            if not (d.startswith('+') or d.startswith('-')):
                continue
            if d.startswith(('+++', '---')):
                continue
            body = d[1:]
            if not body.strip():
                continue
            if any(p.search(body) for p in MECHANICAL):
                continue
            return date          # a real content change
    return commits[0].split(' ', 1)[1] if commits else None

def main():
    check = '--check' in sys.argv
    sm = ROOT / 'sitemap.xml'
    text = sm.read_text(encoding='utf-8')
    changed = []

    def repl(m):
        loc, old = m.group(1), m.group(2)
        rel = loc[len(PREFIX):]
        path = (rel.rstrip('/') + '/index.html') if rel else 'index.html'
        if not (ROOT / path).exists():
            return m.group(0)
        new = substantive_date(path)
        if not new or new == old:
            return m.group(0)
        changed.append((rel or '/', old, new))
        return m.group(0).replace(f'<lastmod>{old}</lastmod>', f'<lastmod>{new}</lastmod>')

    out = re.sub(r'<loc>([^<]+)</loc>\s*<lastmod>([\d-]+)</lastmod>', repl, text)

    for rel, old, new in changed:
        print(f'  {rel:46} {old} -> {new}')
    if not changed:
        print('sitemap lastmod values are already correct')
        return 0
    if check:
        print(f'\n{len(changed)} stale lastmod value(s); run without --check to fix')
        return 1
    sm.write_text(out, encoding='utf-8')
    print(f'\nupdated {len(changed)} lastmod value(s)')
    return 0

if __name__ == '__main__':
    sys.exit(main())
