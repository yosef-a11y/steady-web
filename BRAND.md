# Steady Growth Marketing — brand

The identity is already built and running. This writes it down so it can be applied
consistently, handed to a designer or a printer, and checked against.

One rule above all the others: **the colours live in `styles.css`, in a single `:root`
block.** Change them there. Nothing else should carry a hex code.

---

## The idea

The site reads as **printed rather than rendered**. Warm paper instead of blue-grey,
a serif that has one weight and a real italic, hairline rules instead of drop shadows,
square corners instead of pills.

That is a deliberate stance against what a marketing agency site usually looks like.
Soft gradients, rounded cards floating on shadows and a geometric sans are the house
style of every template, which makes them the house style of every competitor. A page
that looks typeset looks considered, and considered is the whole pitch.

Three things follow from it, and they are the ones to defend when something new gets
added:

- **No gradients.** Not on buttons, not on text. Gradient text in particular is the
  single clearest tell of a generated page.
- **No shadows.** Separation comes from rules and from space. The shadow tokens exist
  and are all set to `none`.
- **One saturated colour.** Blue means *this is actionable*. If blue appears somewhere
  that isn't a link, a button or a deliberate accent rule, it is wrong.

---

## Colour

### Ink — the navy ramp

Hue held around 225°, saturation at 32–35% so the ramp reads as one family. Every rung
is dark enough to carry white text.

| Token | Hex | Use |
| --- | --- | --- |
| `--navy-950` | `#0F1424` | Hero and footer grounds |
| `--navy-900` | `#1A2133` | Body text, wordmark. Same value as `--ink` |
| `--navy-850` | `#202942` | |
| `--navy-800` | `#27324F` | Logo dark stroke |
| `--navy-700` | `#323F67` | |

### Signal — brand blue

| Token | Hex | Use |
| --- | --- | --- |
| `--blue-700` | `#1A5FBF` | Hover and pressed states |
| `--blue-600` | `#1E6FD9` | **Primary.** Buttons, links, accent rules |
| `--blue-500` | `#2E86E0` | Logo arrow |
| `--blue-400` | `#5B9BD5` | Logo light stroke |
| `--blue-300` | `#8FC2F2` | Highlighted headline words on dark grounds |
| `--blue-100` | `#DBEAFE` | |
| `--blue-50` | `#EFF6FF` | |

### Paper — the neutrals

Warm, not blue-grey. This is the part that does the most work and the part most likely
to be broken by someone pasting in a stock grey.

| Token | Hex | Use |
| --- | --- | --- |
| `--paper` | `#FAF8F3` | Page ground |
| `--paper-alt` | `#F0ECE2` | Alternating sections, client band |
| `--rule` | `#DFD8C9` | Hairlines |
| `--rule-strong` | `#C6BDA9` | Table heads, emphasis rules |
| `--ink` | `#1A2133` | Body text |
| `--text-muted` | `#5E5A50` | Secondary text. A **warm** grey — not slate |

### Contrast

Measured, not assumed. WCAG AA wants 4.5:1 for body text and 3:1 for large text and UI.

| Pair | Ratio | |
| --- | --- | --- |
| Ink on paper | 15.11 | Pass |
| Muted text on paper | 6.48 | Pass |
| Muted text on paper-alt | 5.83 | Pass |
| Blue-600 link on paper | 4.57 | Pass |
| White on blue-600 button | 4.85 | Pass |
| White on navy-950 hero | 18.33 | Pass |
| Blue-600 on navy-950 | 3.78 | Large text and UI only |

That last row is the one to watch: brand blue on the dark hero or footer is fine for a
button or a heading, but not for body copy. Use `--blue-300` for small text on navy.

---

## Logo

A rising stroke, a descending stroke, and an arrow between them. The arrow is the growth;
the two strokes are the steadiness either side of it.

### Files — `images/brand/`

| File | Use |
| --- | --- |
| `logo-lockup.svg` | Mark plus wordmark. Email signatures, documents, decks, invoices |
| `logo-lockup-reversed.svg` | The same on dark backgrounds |
| `logo-mark.svg` | Mark alone, where the name is already present |
| `logo-mark-reversed.svg` | Mark alone on dark |
| `logo-mark-mono-ink.svg` | One colour, for single-colour print, stamps, fax headers |
| `logo-mark-mono-white.svg` | One colour on dark |
| `avatar-square.svg` | 512×512 square. Google Business Profile, social avatars, favicons |

The site itself inlines the mark as SVG rather than loading a file, so it stays crisp and
costs no extra request. If you change the mark, change the inline copies too — there is
one in the header and one in the footer of every page.

### Rules

- **Clear space:** keep at least the height of the arrow free on every side.
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
| Body | **IBM Plex Sans** | Has grain. Inter and the usual geometric sans do not, which is why pages using them look generated |

Both load from Google Fonts. Fallbacks are Charter and Georgia for the serif, system-ui
for the sans, so a blocked font request degrades to something with similar proportions
rather than to Times.

**The italic is the accent.** Highlighted words in a headline are set in the display
italic, not in a different colour and never in a gradient. On dark grounds they take
`--blue-300`.

---

## Voice

The copy rules matter as much as the colours, and they are the reason the site reads as
credible rather than promotional.

- **Say the uncomfortable thing first.** The legal page opens by saying the category is
  the most expensive in paid search. The home care page says Google only works where
  there is search volume. An agency that warns you before you hire it is more believable
  than one that doesn't, and it filters out buyers who were going to be unhappy.
- **Never invent a number.** No fabricated results, client counts, years in business or
  case studies. The site carried made-up performance figures once and they were removed.
  Where a number would help, describe the mechanism instead. The only figures on the site
  are real ones someone counted.
- **Proof sits next to the claim it supports**, not in a wall at the bottom.
- American English. Contractions are fine. No contrarian framing, no jargon headlines,
  no em-dash aphorisms, no condescension.

---

## Applying it

- Colours: `styles.css`, the single `:root` block at the top.
- Logo: `images/brand/`, plus the inline SVG in each page's header and footer.
- Fonts: loaded in the `<head>` of every page.
- Social and share image: `images/og-image.png`, regenerated from `images/og-source.html`.

Anything that needs a colour not on this page is a decision, not a detail. Add it to
`:root` with a note saying what it is for, rather than dropping a hex into a rule.
