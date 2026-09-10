# Public Safety BDA / ERRCS landing page

A standalone, single-purpose landing page built for Google Ads traffic. Three self-contained files —
no build step, no framework, no external CSS or fonts.

| File | Purpose |
| --- | --- |
| `index.html` | The landing page (CSS and JS inlined) |
| `thank-you.html` | Post-submission page — fires the `generate_lead` conversion |
| `privacy.html` | Privacy policy (Google requires a reachable one for lead-gen ads) |

Preview locally:

```bash
python3 -m http.server 8000   # from the repo root
# http://localhost:8000/lp/public-safety-bda/
```

---

## Branding

Palette, typography and geometry were sampled from a screenshot of firstcomms.net (the site itself is
unreachable from this build environment — blocked by egress policy):

| Token | Value | Where it came from |
| --- | --- | --- |
| `--cream-200` | `#EBE1DA` | Page ground |
| `--brown-900` | `#240D07` | Header, ticker, footer, dark sections |
| `--brown-700` / `--brown-600` | `#5A2415` / `#74341E` | Headings / body copy |
| `--orange` | `#F4491B` | Brand orange — rules, marks, decorative fills |
| `--orange-btn` | `#D93F12` | Buttons only, see below |

**Why two oranges.** White text on the brand orange `#F4491B` measures 3.61:1, under the 4.5:1 AA
threshold — a real accessibility failure and something Google's landing page assessment can pick up.
Buttons therefore use `#D93F12`, which hits exactly 4.50:1 with white and is visually indistinguishable
at button size. The true brand orange is used everywhere it sits on cream or dark, where contrast is
not an issue.

Type is a monospace stack (`ui-monospace` first), matching the site's mono treatment — uppercase and
letter-spaced for headings, nav, buttons and labels. No webfont is loaded, so there is no font request
and no layout shift; if you want the exact face from the live site, name it and it can be added to the
front of the stack.

The logo mark is an inline SVG redraw of the angular FirstComms glyph. **Swap in the real asset when you
have it** — it appears in `index.html` (header + footer), `thank-you.html`, `privacy.html`, and as the
data-URI favicon in all three.

The one thing the reference site has that this page does not is the **hero photograph**. Drop a real
photo into the hero's right column (or as a background behind the copy) when you have one you own —
no stock placeholder was invented.

## Before this page runs traffic

These are blockers, not polish.

- [ ] **Form destination.** The form posts to Web3Forms using the Steady Growth access key. If leads
      should land in the client's inbox instead, get a key at web3forms.com and replace `access_key`.
- [ ] **Analytics property.** `G-7BZ01Y3KFS` is Steady Growth's GA4 property. Replace it in all three
      files if the client tracks separately.
- [ ] **Canonical + redirect URLs.** Both point at `steadygrowthmarketing.com/lp/public-safety-bda/`.
      If the page moves to the client's domain, update the `<link rel="canonical">`, the `og:url`, and the
      hidden `redirect` field. **The final URL's domain must match the ad's display URL** — this is a policy
      requirement, not a preference.
- [ ] **Claims audit.** Copy claims 14+ years, in-house architect-stamped drawings, in-house testing,
      design, installation and permitting, and the Toms River address — all sourced from public
      descriptions of FirstComms. Have the client confirm each one. There are deliberately **no
      testimonials, no project counts and no certification logos** on the page; add only real ones.
- [ ] **Technical review.** The code figures below are industry-standard and sourced, but an RF engineer
      at FirstComms should sign off before this is public — it is their name on the claims.

## Where the technical content came from

The code and engineering content was compiled from published industry sources: IFC Section 510 model
language and AHJ standards (−95 dBm, DAQ 3.0, 95%/99% coverage split, critical-area definitions),
NFPA 1225 Chapter 18 (which carries the ERCES provisions previously in NFPA 1221 Chapter 9 — NFPA 1221
has not been withdrawn and many AHJs still cite it), 2021 IFC equipment requirements (UL 2524 listing,
12-hour standby power, NEMA 3R/4 enclosures, anti-oscillation circuitry and per-channel AGC), IFC
510.6.1 annual inspection, FCC Part 90.219 booster rules, and published commissioning sequences and
FirstNet Band 14 interference guidance from ERRCS specialist firms.

Two deliberate omissions: **jurisdiction-specific permit fees and plan-review timelines** (the figures
in circulation are Florida-specific and would be wrong for a New Jersey page), and **any hard price**.
Both are answered honestly on the page instead — "it depends on the building, and the grid test tells
us." Every code figure on the page is hedged to the AHJ having final authority, which is both true and
the right posture for a page that a fire official might read.

---

## Why the page is built the way it is (Quality Score)

Quality Score is three components. The page can only move one of them directly — but it is the one most
accounts lose points on.

### Landing page experience

**Relevance.** One page, one offer. Every section answers a question a BDA searcher actually types:
what it is, do I need one, what do the codes require, what does it cost, how long does it take. The H1
names the service; the body uses the vocabulary of the search terms (BDA, ERRCS, ERCES, public safety
DAS, grid test, AHJ, IFC 510, NFPA 1225) without stuffing them.

**Message match by ad group.** Add `?kw=<key>` to the final URL and the H1 swaps to match the ad group.
Supported keys, defined in the `HEADLINES` map near the bottom of `index.html`:

| `kw=` | Use for the ad group |
| --- | --- |
| `bda-install` | BDA installation / BDA system |
| `errcs` | ERRCS / ERCES design and installation |
| `testing` | Radio coverage testing / grid test |
| `failed-test` | Failed radio test / failed inspection |
| `annual` | Annual BDA inspection and testing |
| `das` | Public safety DAS |

Only keys in that table render — arbitrary query text is never written into the page, so this cannot be
used to inject content.

**Speed.** One HTTP request for the whole page: CSS and JS are inlined, the fonts are system fonts (zero
network cost, zero layout shift), and there are no raster images — the logo, icons and system schematic
are inline SVG. Analytics is the only third-party request and loads `async`.

**Transparency.** Real business name, street address, hours, phone, a working privacy policy, and an
explicit note that the AHJ has final authority on code interpretation. No countdown timers, no fake
scarcity, no interstitials.

**Navigability.** Sticky header with in-page anchors only — nothing links away from the offer. A form in
the first viewport on desktop, a sticky call/quote bar on mobile, and a CTA every screen or two.

**Accessibility and mobile.** Labelled inputs, keyboard-operable accordion with `aria-expanded`, visible
focus rings, a skip link, AA contrast, `prefers-reduced-motion` respected, tap targets ≥44px.

### Ad relevance and expected CTR — campaign side

The page cannot fix these; the account structure does.

- **Tight ad groups.** One theme per ad group, 5–15 keywords, matching `?kw=` value, and headlines that
  repeat the keyword. Suggested split: BDA installation · ERRCS design · radio coverage testing ·
  failed test remediation · annual inspection · public safety DAS.
- **Match types.** Phrase and exact for the money terms. Broad only with a smart bidding strategy and a
  hard negative list.
- **Negatives from day one.** `jobs`, `salary`, `training`, `certification`, `course`, `wiki`, `cell
  booster`, `weboost`, `cell phone signal`, `diy`, `for sale`, `amazon`, `used`, `rental`. Cellular
  signal-booster traffic is the single biggest waste on this keyword set — it looks identical and
  converts at zero.
- **Assets.** Sitelinks to the page anchors (`#testing`, `#compliance`, `#faq`, `#process`), callouts
  (Free coverage assessment · Stamped drawings in house · Permitting handled · Annual inspections),
  structured snippet "Services", a call asset on the real number, and a location asset for Toms River.
- **Geo.** Target by presence in the service area, not "presence or interest".

### Conversion tracking

Two paths, both already wired:

1. **Online conversion.** `thank-you.html` fires GA4 `generate_lead`. Mark it as a key event in GA4
   (Admin → Events), then import it into Google Ads, or drop the Google Ads conversion snippet directly
   on that page.
2. **Offline conversion.** Every submission carries a `gclid` field. `index.html` reads `gclid`,
   `wbraid` or `gbraid` on arrival and keeps it in `localStorage` for 90 days — visitors usually land
   from an ad, read, and submit later from a URL that no longer has the click ID, so reading it at
   submit time would miss most of them. Feed closed jobs back through Tools → Conversions → Imports so
   bidding optimizes toward real revenue, not raw form fills.

The form also posts a `page_source` field with the `kw`, `utm_campaign` and `utm_term` values, so the
lead email shows which ad group produced it.

Suggested tracking template (account level):

```
{lpurl}?kw=bda-install&utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&gclid={gclid}
```

Set `kw` per ad group, and enable auto-tagging so `gclid` arrives regardless.

### What to watch after launch

Quality Score is diagnostic, not a goal — it moves after clicks accumulate, and only on keywords with
traffic. Read it per keyword (Keywords → Modify columns → Quality Score, plus the three component
columns), not as an account average.

- Landing page experience "below average" with good CTR → the ad promises something the page does not
  say. Fix the `kw` mapping or add a section.
- Ad relevance "below average" → the keyword is in the wrong ad group. Split it out.
- Expected CTR "below average" → the ad copy, not the page. Test headlines that name the code or the
  consequence (CO delays), which is what this audience is actually afraid of.
