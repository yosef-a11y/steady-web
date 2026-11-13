# Steady Growth Marketing — brand

Google Ads management in Lakewood, New Jersey. This is the whole identity: colour,
logo, type, and the copy rules that carry as much of it as the colours do.

One rule above all the others: **the colours live in `styles.css`, in a single
`:root` block.** Change them there. Nothing else should carry a hex code.

---

## The idea

Every agency in paid search is navy and blue. Finance borrowed it, SaaS borrowed it,
and now it is the default setting of the category — which means it says "marketing
agency" and nothing more specific than that. An identity that looks like the identity
of everyone you are competing against cannot do the one job an identity has.

So: **graphite, bone, and claret.**

A warm near-black that reads as printing ink. A bone ground with real pigment in it,
not an off-white. And one saturated colour: the deep red of a correction, a mark-up,
a bound ledger.

The red is the argument. This firm's pitch is that it goes through an account and finds
the money being wasted in it. Claret is the colour you would use to circle that money.
It is the audit mark. It reads as somebody reviewed your work, which is exactly what is
being sold, and it is rare enough in this category that the page doesn't get mistaken
for a competitor's.

The site should read as **printed rather than rendered**: a serif with one weight and
a real italic, hairline rules instead of drop shadows, square corners instead of pills.
Soft gradients, rounded cards floating on shadows and a geometric sans are the house
style of every template, and therefore of every competitor. A page that looks typeset
looks considered, and considered is the pitch.

Four rules follow. These are the ones to defend when something new gets added.

- **No gradients.** Not on buttons, not on text. Gradient text in particular is the
  single clearest tell of a generated page.
- **No shadows.** Separation comes from rules and from space. The shadow tokens exist
  and are all set to `none`, so a component can ask for one and get nothing.
- **One saturated colour.** Claret means *this is actionable*. If claret appears
  somewhere that isn't a link, a button or a deliberate accent rule, it is wrong.
- **Red stays off the headlines.** The display italic is the emphasis. Keeping claret
  out of the hero headline leaves the button as the only saturated thing in the
  viewport, which is the entire reason for having a signal colour.

---

## Colour

### Graphite — the dark ramp

Hue held at 32° with saturation at 9–14%, so it reads as warm black rather than as a
colour. Every rung carries white text.

| Token | Hex | Use |
| --- | --- | --- |
| `--graphite-950` | `#1A1714` | Hero and footer grounds. Also `theme-color` |
| `--graphite-900` | `#25211D` | Body text, logo wordmark. Same value as `--ink` |
| `--graphite-850` | `#302C27` | |
| `--graphite-800` | `#3E3832` | Logo dark stroke, cards on dark grounds |
| `--graphite-700` | `#534D46` | |

### Claret — the signal

Hue 352°. One colour, spent sparingly. On a page where everything is accented, nothing is.

| Token | Hex | Use |
| --- | --- | --- |
| `--claret-800` | `#671D27` | |
| `--claret-700` | `#76232E` | Hover and pressed states |
| `--claret-600` | `#8C2B38` | **Primary.** Buttons, links, accent rules, logo arrow |
| `--claret-500` | `#BD4253` | Logo rising stroke on dark grounds |
| `--claret-400` | `#CA6875` | Logo rising stroke on light grounds; accents on dark |
| `--claret-300` | `#E199A2` | Small text and the wordmark's second line on dark |
| `--claret-100` | `#F3DDE0` | Ornament only |
| `--claret-50` | `#F9F0F2` | Tinted icon grounds |

The logo needs two different rising-stroke values. The light-ground pairing
(`claret-400` beside a `claret-600` arrow) inverts on dark, where the arrow has to
become the lighter of the two. Using one value for both put the footer arrow at
2.14:1, which is not a logo, it's a rumour.

### Bone — the neutrals

Warm and pigmented. This is the part that does the most work and the part most likely
to be broken by someone pasting in a stock grey: `#F8FAFC` next to `#F2EFE9` doesn't
read as a variation, it reads as a mistake.

| Token | Hex | Use |
| --- | --- | --- |
| `--paper` | `#F2EFE9` | Page ground |
| `--paper-alt` | `#E6E1D6` | Alternating sections, client band |
| `--rule` | `#D6D0C2` | Hairlines |
| `--rule-strong` | `#877B64` | Table heads, emphasis rules |
| `--ink` | `#25211D` | Body text |
| `--text-muted` | `#655E53` | Secondary text. A **warm** grey |
| `--stone-50`…`--stone-700` | | Warm greys for UI chrome. Never for small text |

`--star` `#A87715` is the one colour outside the palette, and it's a convention rather
than a brand decision: review stars that aren't gold read as unfilled. It replaced a
bright amber sitting at 1.87:1 on bone, which is not a star, it's a suggestion.

### Contrast

Measured against the rendered pages, not assumed. WCAG AA wants 4.5:1 for body text and
3:1 for large text and UI.

| Pair | Ratio | |
| --- | --- | --- |
| Ink on paper | 13.93 | Pass |
| Ink on paper-alt | 12.26 | Pass |
| Muted text on paper | 5.58 | Pass |
| Muted text on paper-alt | 4.91 | Pass |
| Claret-600 link on paper | 7.27 | Pass |
| Claret-600 link on paper-alt | 6.40 | Pass |
| White on claret-600 button | 8.34 | Pass |
| White on claret-700 hover | 10.24 | Pass |
| Paper on graphite-950 hero | 15.55 | Pass |
| White on graphite-800 card | 11.56 | Pass |
| Claret-300 small text on graphite-950 | 7.89 | Pass |
| Claret-300 on graphite-800 | 5.11 | Pass |
| Claret-400 accent on graphite-950 | 4.89 | Pass |
| Claret-500 logo stroke on graphite-950 | 3.46 | Large text and UI only |
| Rule-strong on paper | 3.63 | Large text and UI only |
| Rule-strong on paper-alt | 3.19 | Large text and UI only |
| Star gold on paper | 3.44 | Large text and UI only |
| Star gold on paper-alt | 3.03 | Large text and UI only |

Every text node on every page was checked in a browser against its real composited
background. If you add a colour, check it the same way rather than trusting the table.

---

## Logo

A rising stroke, a descending stroke, and an arrow between them. The arrow is the
growth; the two strokes are the steadiness either side of it.

### Files — `images/brand/`

| File | Use |
| --- | --- |
| `logo-lockup.svg` | Mark plus wordmark. Email signatures, documents, decks, invoices |
| `logo-lockup-reversed.svg` | The same on dark backgrounds |
| `logo-mark.svg` | Mark alone, where the name is already present |
| `logo-mark-reversed.svg` | Mark alone on dark |
| `logo-mark-mono-ink.svg` | One colour, for single-colour print and stamps |
| `logo-mark-mono-white.svg` | One colour on dark |
| `avatar-square.svg` | 512×512. Google Business Profile, social avatars, favicons |

### Colour by ground

| Part | On bone | On graphite |
| --- | --- | --- |
| Rising stroke | `claret-400` `#CA6875` | `claret-500` `#BD4253` |
| Descending stroke | `graphite-800` `#3E3832` | white |
| Arrow | `claret-600` `#8C2B38` | `claret-300` `#E199A2` |

The site inlines the mark as SVG rather than loading a file, so it stays crisp and
costs no extra request. **If you change the mark, change the inline copies too** —
one in the header and one in the footer of every page, and the header's copy is
recoloured by CSS while it sits over the dark hero.

### Rules

- **Clear space:** at least the height of the arrow free on every side.
- **Minimum size:** 24px tall for the mark, 120px wide for the lockup. Below that the
  arrow's notch fills in.
- **Don't** recolour it outside the palette, add a shadow or outline, stretch it,
  rotate it, place it on a busy photo, or rebuild the wordmark in another typeface.
- On photography or any mid-tone background, use a mono version rather than the
  three-colour mark.

---

## Type

| Role | Face | Notes |
| --- | --- | --- |
| Display | **Instrument Serif** | One weight and a true italic. Headlines lead on size and shape, never on bold |
| Body | **IBM Plex Sans** | Has grain. Inter and the usual geometric sans do not, which is why pages set in them look generated |

Both load from Google Fonts. Fallbacks are Charter and Georgia behind the serif and
`system-ui` behind the sans, so a blocked font request degrades to similar proportions
rather than to Times.

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
- **Proof sits next to the claim it supports**, never in a wall at the bottom. A client
  quote goes under the paragraph it evidences or it doesn't go up.
- **Quote reviewers as they wrote.** Typos and all, or paraphrase — never silently
  corrected.
- American English. Contractions are fine. No contrarian framing, no jargon headlines,
  no em-dash aphorisms, no condescension.

---

## Applying it

- Colours: `styles.css`, the single `:root` block at the top. The only other place a
  token is set is the 640px media query, which lowers the header height on phones.
- Logo: `images/brand/`, plus the inline SVG in each page's header and footer.
- Fonts: loaded in the `<head>` of every page.
- Share image: `images/og-image.png`, regenerated by screenshotting
  `images/og-source.html` at 1200×630.
- Favicon: `favicon.svg`, which carries its own dark ground and uses the reversed scheme.

Anything that needs a colour not on this page is a decision, not a detail. Add it to
`:root` with a note saying what it is for, rather than dropping a hex into a rule.
