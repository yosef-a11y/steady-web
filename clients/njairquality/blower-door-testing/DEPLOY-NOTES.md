# `/blower-door-testing/` — deploy notes

A single self-contained page for **njairquality.com/blower-door-testing/**, built to win the
blower-door and duct-leakage ad groups on mobile.

Two files, nothing else. No frameworks, no external CSS, no web fonts, no image requests:
the whole page paints from one HTTP response, which is the cheapest way to hold a good
**landing page experience** score in Google Ads.

```
index.html   the page (CSS, JS and JSON-LD all inline)
logo.svg     logo — see item 1
```

Drop both into the `/blower-door-testing/` directory on njairquality.com and the page works.

---

## Confirm before it goes live

Nine items. The first five are facts about the business that I could not verify from the
outside — **check each one and correct the page if it's wrong.** Everything else on the page
is either measurable (code limits, physics) or a claim about how you work that you control.

### 1. Swap in the real logo
`logo.svg` is my redraw of the badge from the image you sent — close, but not the original
artwork. Drop your real file in as `logo.svg` (or save it as `logo.png` and change the three
`src="logo.svg"` references). Keep the `width`/`height` attributes matching the real file's
aspect ratio so the page doesn't shift as it loads.

### 2. Service area — "all 21 New Jersey counties"
The page claims statewide coverage, in the hero trust strip, the service-area section, the
footer and the JSON-LD. Your existing duct-leakage page lists 18 counties.

**If you don't cover all 21, delete the ones you don't** in three places: the `.counties`
chip list, the town list under it, and the `areaServed` array in the JSON-LD at the bottom.
Paying for clicks in a county you won't drive to is the most expensive mistake on this page.

### 3. Business hours
I used **Mon–Fri 8am–6pm, Sun 9am–4pm**. Appears in the booking section, the footer, and
`openingHoursSpecification` in the JSON-LD. Fix all three if that's wrong — hours in
structured data show up in Google's local panels.

### 4. "BPI-certified testers"
In the hero trust strip, the FAQ ("Who is allowed to perform the test"), and `knowsAbout`.
Your county pages recommend hiring a BPI-certified pro, so I assumed you hold it. **If the
certification is RESNET HERS Rater instead, or both, say so** — and put the actual
certification number on the page if you have one. It's the single strongest trust signal in
this category and none of your competitors publish theirs.

### 5. Reviews
The three quotes are real customer reviews of NJ Air Quality pulled from public review
sites, but they're about duct work, not blower door tests, and they carry no names.
**Replace them with your three newest Google reviews**, word for word, with the reviewer's
real first name and last initial and the month — ideally reviews that mention a test or a
permit.

Deliberately **not** included: `Review` or `AggregateRating` schema. Google doesn't award
rich results for reviews a business publishes about itself, and marking them up risks a
manual action. The stars in the cards are decorative only.

### 6. The form endpoint
Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `index.html`. Go to
[web3forms.com](https://web3forms.com), enter your email, and they send you a key — free,
no account, 250 submissions a month. Or swap the whole `<form>` for your CRM's embed.

Until you replace it, **the form refuses to submit** and shows the phone number instead.
That's on purpose: a form that silently fails eats leads, and a broken one you can see is
better than a broken one you can't.

The form's `redirect` field points at `https://njairquality.com/thank-you/`. Either create
that page or change the field — otherwise a submitter lands on a 404 after a successful send.

### 7. Analytics and conversion tracking
In the analytics block near the bottom:
- `G-XXXXXXXXXX` → your GA4 measurement ID
- `AW-XXXXXXXXX` → your Google Ads conversion ID
- `AW-XXXXXXXXX/YYYYYYYYYYYY` → the **phone call** conversion label, then uncomment that line
- `AW-XXXXXXXXX/ZZZZZZZZZZZZ` → the **form submit** conversion label, then uncomment that line

Until the IDs are real, `gtag` is a harmless no-op — the events fire into nothing and nothing
on the page breaks.

Two things worth doing in the Ads account while you're in there:
- Turn on **call reporting** so calls placed from the ad itself are counted next to taps on this page.
- Add a **call extension** and a **call asset** using (973) 557-5437. On mobile, most of this
  traffic will convert before it ever reaches the page.

### 8. The 8 vs 4 CFM25 duct limit
The page states **4.0 CFM25 per 100 sq ft** (2021 IECC R403.3.5, as NJ adopted it) and adds a
note that an 8 CFM25 figure came from an earlier New Jersey amendment. Your current
`/what-is-a-duct-leakage-test/` page says 8. You know what the inspectors in your townships
are actually enforcing — if 8 still applies to some permits, reword that callout. Either way,
**the two pages shouldn't contradict each other.**

### 9. Real job photos (optional, and worth it)
The page uses hand-drawn SVG diagrams rather than stock photography. That's a deliberate
choice — they load instantly, they're unique to you, and they explain the service better than
a stock photo of a fan in a doorway. But **three real photos would still lift conversion**:
a tester with the fan in a doorway, a thermal image with a leak glowing, and the certificate
on a phone screen. Add them under the process section:

```html
<div class="grid g3" style="margin-top:28px">
  <img src="job-1.jpg" alt="Blower door fan sealed into a doorway in a new build"
       width="800" height="600" loading="lazy" style="border-radius:14px">
  <img src="job-2.jpg" alt="Thermal image showing air leaking at a rim joist"
       width="800" height="600" loading="lazy" style="border-radius:14px">
  <img src="job-3.jpg" alt="Signed envelope leakage test certificate"
       width="800" height="600" loading="lazy" style="border-radius:14px">
</div>
```

Keep them under ~150KB each and always set `width`/`height` — an unsized image shifts the
layout as it loads, and layout shift is scored.

---

## What the competitors are doing, and what this page does about it

| | Them | This page |
| --- | --- | --- |
| **Local Energy Audits** | Publishes prices ($350 contractor / $390 residential), promises same-day docs, and says they seal on site and pass 90% of homes within two hours. The strongest offer in the market. | Matches the offer and beats the framing: sealing materials on the truck, **first re-test free**, result read out loud before they pack up. Their "90% of the time" is a statistic; "we don't leave until it passes or you know exactly why" is a promise. |
| **NJ Energy Code** | Hundreds of thin town pages (`/blower-door-test-toms-river-nj/`). Wins on local coverage, loses on depth — every page says the same little. | One deep page with real code detail, worked arithmetic, and 11 FAQs. Ranks and converts on substance, and names 27 towns for the "near me" queries without a page per town. |
| **Home Energy Consultants** | Genuine technical depth — CFM50, ACH50, Retrotec, Minneapolis Duct Blaster, smoke pencils. Credible to a builder. | Same depth, but translated. ACH50 explained as a 20 mph wind on every surface, with the actual multiplication shown. Builders trust it; homeowners can follow it. |
| **Blower Door Tester** | BPI positioning, little else. | BPI plus the thing none of them offer: the company that finds the leak can also seal it, same visit. |

**The gap all four leave open:** every one of them sells *a measurement*. Nobody sells *the
outcome* — a closed permit. That's what this page sells, from the H1 down.

---

## Why it's built for Quality Score

Quality Score is expected CTR, ad relevance, and landing page experience. This page is aimed
at the last two.

**Ad relevance.** Your keyword list spans three intents and the page answers all three in its
own words — not stuffed, just covered:

- *Blower door* — blower door test, door blower test, blower door tester, blower door testing
  companies near me, blower door test cost, blower door test for new construction,
  blower door test form
- *Duct* — duct blaster test, duct leakage test, duct testing near me, duct pressure testing,
  ductwork pressure testing, ductwork leak test
- *HVAC* — hvac duct leak test, hvac duct leakage test, air duct leakage test, blower test hvac,
  air blower test

**Landing page experience.** Load speed (one request, no fonts, no libraries, no images),
mobile layout, original useful content, transparent contact details, and easy navigation —
all five of Google's stated criteria.

**The specific plays:**
- **Answers above the ask.** The "four questions everybody calls to ask" block sits high on
  the page and answers cost, duration, the pass threshold and turnaround *before* asking for
  anything. Google reads gated answers as a poor experience, and searchers bounce off them.
- **Cost is addressed, not dodged.** "Blower door test cost" is in your keyword list. A page
  that ignores it after taking that click is exactly what "low landing page experience"
  means. See the pricing note below.
- **Call-first, mobile-first.** A sticky call bar in the thumb zone on every screen, the
  number in the header, and tap-to-call in the hero, the body, the booking section, the
  footer and the final CTA — 11 tap targets. The form is the fallback, not the gate.
- **Every tel: tap reports a conversion**, labelled by where on the page it was tapped
  (`sticky_bar`, `hero`, `header`, `footer`, `body`). After a couple of weeks you'll know
  which CTA is actually earning the calls.
- **The gclid survives the visit.** Someone clicks your ad, reads, then calls two days later
  from a URL with no `gclid` on it. The page stores it for 90 days so the lead can still be
  tied back to the click that paid for it — import those as offline conversions under
  Tools → Conversions → Imports.
- **Structured data:** `HVACBusiness` + `Service` + `WebPage` + an 11-question `FAQPage`,
  which is what gets you quoted in AI Overviews and answer engines.

---

## Consider publishing your price

Local Energy Audits publishes $350 and $390. You currently don't, and the page works without
it — it promises a flat quote in two minutes, no trip charge, no fuel surcharge, no report
fee, and no charge for the first re-test, which is a real differentiator on its own.

But price transparency converts, and it filters out the callers who were only ever shopping.
If you want to publish, paste this above the `<!-- ================= COMPARISON` marker and
fill in your real numbers:

```html
<section>
  <div class="wrap">
    <div class="sec-head center">
      <p class="eyebrow">Flat-rate pricing</p>
      <h2>What it costs</h2>
      <p class="lede">One price, told to you before we book. No trip charge, no fuel
        surcharge, no report fee, and no charge for the first re-test.</p>
    </div>
    <div class="grid g3">
      <article class="card needcard">
        <span class="tag tag-yes">Most common</span>
        <h3>Blower door test</h3>
        <p><b style="font-size:1.6rem;color:var(--navy)">$XXX</b><br>
          Single-family home. Test, on-site leak diagnosis with thermal imaging, and the
          signed certificate.</p>
      </article>
      <article class="card needcard">
        <span class="tag tag-maybe">Best value</span>
        <h3>Blower door + duct leakage</h3>
        <p><b style="font-size:1.6rem;color:var(--navy)">$XXX</b><br>
          Both tests, one visit, both certificates. Cheaper than booking them separately.</p>
      </article>
      <article class="card needcard">
        <span class="tag tag-smart">Builders</span>
        <h3>Multiple units</h3>
        <p><b style="font-size:1.6rem;color:var(--navy)">From $XXX/unit</b><br>
          Whole developments, one point of contact, scheduled around your trades.</p>
      </article>
    </div>
  </div>
</section>
```

Then update the "What does it cost?" answer block and the first FAQ to match, so the page
doesn't say two different things.

---

## Next, once this page is live

1. **Clone it to `/duct-leakage-testing/`.** Roughly a third of your keyword list is duct
   terms (`duct blaster test`, `duct leakage test near me`, `ductwork pressure testing`,
   `hvac duct leak test`). They're pointing at a blower-door page right now, and ad relevance
   is scored per keyword. Same page, duct-first: swap the H1, lead with the duct diagram,
   make the blower door the secondary section, re-point the canonical. Then split the ad
   groups and send each to its own page.
2. **Three ad groups, not one** — *blower door*, *duct leakage*, *near me / cost*. Different
   intent, different headlines, different landing page.
3. **Call-only ads for mobile in business hours.** Your leads are calls. Skip the page entirely
   for that traffic and pay for the call.
4. **Negatives from day one:** `rental`, `rent`, `buy`, `for sale`, `diy`, `training`,
   `certification`, `class`, `course`, `jobs`, `salary`, `calculator`, `manometer`,
   `retrotec`, `minneapolis`, `how to`, `free`. Plus the other states — `pa`, `ny`,
   `philadelphia`, `delaware`, `maryland`, `texas` — the national competitors bid broadly and
   you don't want their overflow.
5. **Ask for reviews that name the service.** "Blower door test" and "passed our permit" in
   the review text does more for this page than any copy change.
