# Citation / AI-visibility audit

Baseline for whether the site is actually reachable by search and answer
engines. Re-run the same queries each month and append; the point is the
trend, not any single reading.

**What this measures.** Queries were run through the web search available to
the session, and the same queries restricted to `steadygrowthmarketing.com`
to probe index coverage directly. That engine is not Google. Google Search
Console recorded real impressions on 10 Nov 2026, so Google clearly indexes
more than what is seen here. What this measures is the Bing-family index,
which is the one ChatGPT's search reads — so for the AI-traffic question it
is the right index to look at, and the wrong one to generalise from.

---

## 2026-11-22 — first run

### Index coverage: 2 of 22 pages

Domain-restricted queries returned only:

- `/` (the homepage)
- `/growth-marketing-consultant/`

Probes on three different topics, each restricted to the domain, failed to
surface the relevant page:

| Probe | Page that should have matched | Result |
| --- | --- | --- |
| self storage move-ins, unit mix, lease-up | 4 storage pages, 8,978 words | no links; fell back to SEC filings |
| ABA intake, verification of benefits, BCBA recruiting | 2 ABA pages, 5,475 words | only `/growth-marketing-consultant/` |
| brand name + Lakewood NJ | homepage | nothing; engine could not confirm the business exists |

**Twenty pages and roughly 42,000 words are not in that index.** Zero
citations for any target query is therefore not a content problem. Nothing is
being rejected on quality — most of it has not been crawled.

### The cached homepage is stale and carries the deleted figures

Asked about the business, the engine reported "150+ clients served, a 3.2x
average ROAS, and over $12M in ad spend managed," plus a testimonial claiming
"3.5x return within three months."

**None of that is on the site.** A grep of the whole repo finds no trace, and
`git log -S` finds no commit removing them, so they predate this history.
They are the fabricated performance figures that were taken down. The index is
serving a copy from before the removal.

So the stale cache is not just a coverage problem. Until those pages are
re-crawled, answer engines may repeat invented statistics as current fact
about the business. That is the most urgent item here.

### Who ranks instead

Unprompted queries for the main terms:

- **ABA** — Cardinal Digital Marketing, ClicksGeek, MagicClickz, graphed.com
- **Self storage** — StoragePug, Inside Self Storage, Stackmatix, Stora,
  graphed.com, ClicksGeek
- **Lakewood NJ** — EZMarketing, mbadv.agency, Prager Microsystems, WebCitz,
  alwaystopofmind.com, plus Clutch and DesignRush directories

graphed.com and ClicksGeek appear across several verticals with the same
page-per-industry structure this site uses, and notably graphed.com's storage
page leads on move-ins — the same angle as ours. The approach is sound; they
are simply indexed and we are not.

Directories (Clutch, DesignRush) rank for the local query. That is relevant to
`sameAs` and third-party corroboration, which is currently a single entry.

---

## Actions taken on 2026-11-22

- **IndexNow on every deploy.** The deploy workflow now submits changed pages
  to the IndexNow engines, intersected against `sitemap.xml` so only canonical
  URLs go. A `submit_all` input forces the full set, for the one-time catch-up.
  Key is public by design at `/<key>.txt`.
- **Sitemap `lastmod` corrected.** All 22 were older than the file's real last
  change, which tells a crawler there is nothing to come back for.
  `tools/sitemap-lastmod.py` now derives each date from the last commit that
  changed the page's content, ignoring site-wide mechanical edits (the
  cache-buster bump, nav and footer entries, the GA4 snippet) so the dates stay
  honest and the file does not claim every page changed at once.

## Still needed from Yosef

- **Bing Webmaster Tools.** IndexNow accelerates re-crawling but a verified
  property with the sitemap submitted is what makes it reliable. This is the
  single highest-value thing outstanding.
- **Search Console export** to Google Sheets, so weekly work is chosen from
  real impression data rather than from coverage grepping.
- **Profiles for `sameAs`** — any directory, association or professional
  listing that genuinely exists. None will be invented.
