# Steady Growth Marketing — brand

Google Ads management in Lakewood, New Jersey. This is the whole identity: the mark,
the colour, the type, and the copy rules that carry as much of it as the colours do.

One rule above all the others: **the colours live in `styles.css`, in a single
`:root` block.** Change them there. Nothing else should carry a hex code.

---

## The idea

A firm that audits other people's ad accounts has to look like it can be trusted with
the numbers. That rules out most of what a marketing agency normally looks like.

**The mark is not an arrow.** It was one for a long time: a rising stroke, a falling
stroke, a chevron between them. Every agency in this category has that logo, because an
arrow is what you draw when you are illustrating the word "growth." Illustrating your own
name is the most junior thing a logo can do, and it produces a mark indistinguishable
from a template.

The mark is now **three equal steps rising inside a solid square.** Equal rise, equal
run, drawn as one path. The idea is in the proportion rather than in the picture: growth
that arrives in the same increment every time is what the name actually claims, and it is
the opposite of the rocket an arrow implies. It reads at 16px, it reads in one colour,
and it is a shape rather than a symbol, so it does not compete with the wordmark.

**The colour is forest green.** Not navy — navy is the default setting of paid search,
borrowed from finance, and an identity that matches every competitor's cannot do the one
job an identity has. Green is also the only colour that means anything here: the business
is whether the spend returns more than it costs.

The green is kept **deep**, and that is a constraint rather than a preference. Any colour
light enough to read as text on a dark ground is a pastel, whatever hue it started as;
that is how a serious red turns into pink. So the accent lives only on light grounds, and
on dark grounds the accent is bone. There is no tint of the brand colour anywhere.

The site reads as **printed rather than rendered**: a serif with real weight, hairline
rules instead of drop shadows, square corners instead of pills.

Five rules follow. These are the ones to defend when something new gets added.

- **No gradients.** Not on buttons, not on text. Gradient text in particular is the
  single clearest tell of a generated page.
- **No shadows, and no coloured glows.** Separation comes from rules and from space. A
  soft brand-tinted drop shadow under a button is the second clearest tell after a
  gradient. The shadow tokens exist and are all set to `none`.
- **One saturated colour.** `green-600` means *this is actionable*. If green appears
  somewhere that isn't a link, a button or a deliberate accent rule, it is wrong.
- **Nothing tinted on a dark ground.** On forest, text is bone and accents are bone.
- **The display italic is the emphasis**, not a colour. Headlines never change colour.

---

## The mark

Three equal steps rising left to right inside a solid square.

```
viewBox 0 0 100 100
block   <rect width="100" height="100"/>
step    M18 82 H39.33 V60.67 H60.67 V39.33 H82 V18
        stroke-width 13, linecap butt, linejoin miter
```

Butt caps and mitred joins on purpose: round caps soften it into something friendly,
and the mark is meant to read as drafted rather than drawn.

### Colour by ground

| Part | On stone | On forest |
| --- | --- | --- |
| Block | `forest-950` `#0C1D15` | `green-600` `#1B744A` |
| Step | `paper` `#EFF1EE` | `paper` `#EFF1EE` |

The block changes and the step does not. A forest block on a forest ground has no
silhouette, so on dark the block takes the signal green — which clears 3:1 against the
hero ground, so the mark keeps its edge.

### Files — `images/brand/`

| File | Use |
| --- | --- |
| `logo-lockup.svg` | Mark plus wordmark. Email signatures, documents, decks, invoices |
| `logo-lockup-reversed.svg` | The same on dark backgrounds |
| `logo-mark.svg` | Mark alone, where the name is already present |
| `logo-mark-reversed.svg` | Mark alone on dark |
| `logo-mark-mono-ink.svg` | One colour, for single-colour print and stamps |
| `logo-mark-mono-white.svg` | One colour on dark |
| `avatar-square.svg` | 512×512. Google Business Profile, social avatars |

The lockups set the wordmark as live `<text>`, so they need Source Serif 4 present.
Hand them to a printer or a designer with a note to convert the text to outlines.

The site inlines the mark as SVG rather than loading a file, so it stays crisp and costs
no extra request. **If you change the mark, change the inline copies too** — one in the
header and one in the footer of every page, plus `404.html` and `images/og-source.html`.
The header's copy is recoloured by CSS while it sits over the dark hero.

### Rules

- **Clear space:** at least one step's rise on every side — a quarter of the block.
- **Minimum size:** 16px. Below that the steps merge.
- **Don't** recolour it outside the palette, round its corners, add a shadow or outline,
  stretch it, rotate it, or add a fourth step.

---

## Wordmark

**Steady Growth** in Source Serif 4 bold, title case, above **MARKETING** in IBM Plex
Sans, letterspaced, in `green-600` on light and bone on dark.

Title case, not caps: the serif is already carrying the authority, and caps at this size
fight the letterspaced line underneath them.

---

## Colour

### Forest — the dark ramp, and the brand's dominant impression

Hue 152. Every rung carries bone text.

| Token | Hex | Use |
| --- | --- | --- |
| `--forest-950` | `#0C1D15` | Hero and footer grounds. Also `theme-color` |
| `--forest-900` | `#142A1F` | Dark sections |
| `--forest-850` | `#1C362A` | |
| `--forest-800` | `#274537` | Cards on dark grounds |
| `--forest-700` | `#3A5F4E` | Rules and borders on dark |

### Green — the signal

Used only on light grounds and as the mark's block on dark. Never lightened into mint.

| Token | Hex | Use |
| --- | --- | --- |
| `--green-800` | `#0F4A2F` | |
| `--green-700` | `#155B3A` | Hover and pressed |
| `--green-600` | `#1B744A` | **Primary.** Buttons, links, accent rules, the mark's block on dark |
| `--green-500` | `#218C5A` | Large text and UI on light grounds only |
| `--green-100` | `#DBE9E1` | Quiet fills |
| `--green-50` | `#EFF5F1` | Tinted icon grounds |

`green-600` is doing three jobs at once — link text on both grounds, a button under white
text, and a button shape against the forest hero — and those constraints pull in opposite
directions. It is at the only value that satisfies all three. If you darken it the hero
button drops below 3:1; if you lighten it the links fail. Change `paper-alt` instead.

### Stone — the neutrals

A cool, faintly green-grey. **Not a warm cream:** warm cream beside forest green reads as
Christmas, and a stone in the same hue family reads as aged paper and stays out of the way.

| Token | Hex | Use |
| --- | --- | --- |
| `--paper` | `#EFF1EE` | Page ground |
| `--paper-alt` | `#E2E6E0` | Alternating sections, client band |
| `--rule` | `#CAD1C7` | Hairlines |
| `--rule-strong` | `#77856F` | Table heads, emphasis rules |
| `--ink` | `#232720` | Body text |
| `--text-muted` | `#5C6558` | Secondary text, form labels, placeholders |
| `--stone-50`…`--stone-700` | | UI chrome. `stone-400` and lighter are never text |

`--star` `#9A7516` is the one colour outside the palette, and it's a convention rather
than a brand decision: review stars that aren't gold read as unfilled. Pulled well down
in lightness so it is a visible shape and so it never gets festive beside the green.

### Contrast

Measured against the rendered pages in a browser, not assumed. WCAG AA wants 4.5:1 for
body text and 3:1 for large text and UI.

| Pair | Ratio | |
| --- | --- | --- |
| Ink on paper | 13.37 | Pass |
| Ink on paper-alt | 12.03 | Pass |
| Muted text on paper | 5.35 | Pass |
| Muted text on paper-alt | 4.81 | Pass |
| Green-600 link on paper | 5.07 | Pass |
| Green-600 link on paper-alt | 4.56 | Pass |
| White on green-600 button | 5.76 | Pass |
| White on green-700 hover | 8.11 | Pass |
| Paper on forest-950 hero | 15.38 | Pass |
| Paper on forest-800 card | 9.28 | Pass |
| Mark: bone step on green-600 block | 5.07 | Pass |
| Green-600 button vs forest-950 hero | 3.03 | Large text and UI only |
| Rule-strong on paper | 3.44 | Large text and UI only |
| Rule-strong on paper-alt | 3.10 | Large text and UI only |
| Star gold on paper | 3.75 | Large text and UI only |
| Green-500 on paper | 3.72 | Large text and UI only |

Every text node on every page was checked in a browser against its real composited
background. If you add a colour, check it the same way rather than trusting this table.

---

## Type

| Role | Face | Notes |
| --- | --- | --- |
| Display | **Source Serif 4** | Real weights and a true italic. Authority reads as weight and age, not as novelty |
| Body | **IBM Plex Sans** | Has grain. Inter and the usual geometric sans do not, which is why pages set in them look generated |

Source Serif 4 replaced Instrument Serif, which is a high-contrast editorial face — it
looks like a magazine, and a magazine is not what a firm handling your budget should look
like. Source Serif has weight to lean on, so a headline can be solid instead of merely large.

It also sets **wider**, so the display scale came down about 16% when it went in. If you
change the display face again, check that the hero headline and the tool strip still fit.

Both load from Google Fonts, with Charter and Georgia behind the serif and `system-ui`
behind the sans, so a blocked font request degrades to similar proportions, not to Times.

**The italic is the accent.** A highlighted word in a headline is set in the display
italic — not in another colour, and never in a gradient.

---

## Voice

The copy rules carry as much of the brand as the colours, and they are the reason the
site reads as credible rather than promotional.

- **Say the uncomfortable thing first.** The legal page opens by stating the category is
  the most expensive in paid search. The home care page says Google only works where
  there is search volume, and that Meta is stronger where there isn't. A firm that warns
  you before you hire it is more believable than one that doesn't, and it turns away
  buyers who were going to be unhappy.
- **Never invent a number.** No fabricated results, client counts, years in business or
  case studies. The site carried made-up performance figures once and they were removed.
  Where a number would help, describe the mechanism instead. The only figures on the site
  are ones somebody counted, and the review count on the homepage carries a comment
  saying when it was last verified.
- **Proof sits next to the claim it supports**, never in a wall at the bottom.
- **Quote reviewers as they wrote.** Typos and all, or paraphrase — never silently
  corrected.
- American English. Contractions are fine. No contrarian framing, no jargon headlines,
  no em-dash aphorisms, no condescension.

---

## Applying it

- Colours: `styles.css`, the single `:root` block at the top. The only other place a
  token is set is the 640px media query, which lowers the header height on phones.
- Mark: `images/brand/`, plus the inline SVG in each page's header and footer,
  `404.html`, `favicon.svg` and `images/og-source.html`.
- Fonts: loaded in the `<head>` of every page.
- Share image: `images/og-image.png`, regenerated by screenshotting
  `images/og-source.html` at 1200×630.

Anything that needs a colour not on this page is a decision, not a detail. Add it to
`:root` with a note saying what it is for, rather than dropping a hex into a rule.
