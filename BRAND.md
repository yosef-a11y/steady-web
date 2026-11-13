# Steady Growth Marketing — brand

Google Ads management in Lakewood, New Jersey. This is the identity: the mark, the
colour, the type, the layout rules, and the copy rules that carry as much of it as
the rest.

One rule above all the others: **the colours live in `styles.css`, in a single
`:root` block.** Change them there. Nothing else should carry a hex code.

---

## The idea

A firm that audits other people's ad accounts has to look like it can be trusted with
the numbers. Most of what the brand does is about *not* looking like the thing a
template produces.

**The colour is the original navy, blue and warm paper.** It was never the problem.
Two values are nudged from the originals for contrast and both are noted below;
nothing else moved.

**The type is arranged the way a newspaper arranges it, not the way a landing page
does.** Sans headlines, serif reading text. The generated-page convention is the
inverse — a display serif over a geometric sans — so inverting it is most of the
distance to looking considered. Libre Franklin is a Franklin Gothic, the American
newspaper headline face; Source Serif carries prose, where a serif is simply easier
to read for several hundred words.

**The layout is an editorial grid, not a stack of cards.** A rule across the column,
the kicker hanging in the left margin beside the heading, and content in a shared
hairline grid. The thing it replaced — a centred eyebrow pill over a big heading,
then a tray of equal cards each with a rounded icon tile, a border and a hover lift —
is the default shape of a generated page. It is not ugly; it is anonymous, and
anonymous is the one thing a firm selling judgement cannot afford to look.

**The mark is not an arrow.** It was one: a rising stroke, a falling stroke, a chevron
between them. Every agency in this category has that logo, because an arrow is what
you draw when you are illustrating the word "growth." Illustrating your own name is
the most junior thing a logo can do. It is now three equal steps rising inside a solid
square — equal rise, equal run, one path. The idea is in the proportion, not the
picture.

### The rules to defend

- **No gradients.** Not on text, not on buttons, and not as a soft coloured wash
  behind a dark section. That glow is what a template does to stop a flat colour
  looking empty; a flat ground with a faint rule grid reads as graph paper, which is
  the right reference here.
- **No shadows, no coloured glows, no hover lifts.** Separation comes from rules and
  from space.
- **No icon tiles.** A rounded square with an icon in it on every card is the single
  clearest template tell after a gradient. The heading can carry the card.
- **One saturated colour.** Blue means *this is actionable*.
- **Nothing tinted on a dark ground.** On navy, text and accents are paper. Any
  colour light enough to read as text on a dark ground is a pastel.
- **Reading text is a serif; interface text is not.**

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
and the mark should read as drafted rather than drawn.

| Part | On paper | On navy |
| --- | --- | --- |
| Block | `navy-950` `#0F1424` | `blue-600` `#1E6FD9` |
| Step | `paper` `#FAF8F3` | `paper` `#FAF8F3` |

The block changes and the step does not. A navy block on a navy ground has no
silhouette, so on dark the block takes the signal blue.

**Clear space:** one step's rise on every side, a quarter of the block.
**Minimum size:** 16px. Three steps is the most that survives it, which is why there
are three.
**Don't** recolour outside the palette, round the corners, add a shadow or outline,
stretch, rotate, or add a fourth step.

Files are in `images/brand/`: lockup, reversed lockup, mark, reversed mark, two
single-colour versions, and a 512px avatar. The lockups set the wordmark as live
`<text>`, so convert it to outlines before handing one to a printer.

The site inlines the mark as SVG. **If you change it, change the inline copies too** —
one in the header and one in the footer of every page, plus `404.html`, `favicon.svg`
and `images/og-source.html`.

### Wordmark

**Steady Growth** in Libre Franklin 800, title case, above **MARKETING** letterspaced
in `blue-600` on paper and in paper on navy.

---

## Colour

### Ink — the navy ramp

| Token | Hex | Use |
| --- | --- | --- |
| `--navy-950` | `#0F1424` | Hero, footer and CTA grounds. Also `theme-color` |
| `--navy-900` | `#1A2133` | Body text, dark sections. Same value as `--ink` |
| `--navy-850` | `#202942` | |
| `--navy-800` | `#27324F` | Cards and avatars on dark grounds |
| `--navy-700` | `#323F67` | |

### Signal — brand blue

| Token | Hex | Use |
| --- | --- | --- |
| `--blue-800` | `#15509F` | |
| `--blue-700` | `#1A5FBF` | **Body links.** 5.76:1 on paper, 5.19:1 on paper-alt |
| `--blue-600` | `#1E6FD9` | **Buttons and accent rules.** White on it is 4.85:1 |
| `--blue-500` | `#2E86E0` | |
| `--blue-400` | `#5B9BD5` | |
| `--blue-300` | `#8FC2F2` | Small text and list marks on navy |
| `--blue-100` | `#DBEAFE` | |
| `--blue-50` | `#EFF6FF` | |

Links take `blue-700` rather than `blue-600` because `blue-600` reaches 4.57:1 on paper
but only 4.11:1 on the alternating band. `blue-600` stays the button ground, where it
carries white at 4.85:1.

### Paper — the warm neutrals

| Token | Hex | Use |
| --- | --- | --- |
| `--paper` | `#FAF8F3` | Page ground |
| `--paper-alt` | `#F0ECE2` | Alternating sections, client band |
| `--rule` | `#DFD8C9` | Hairlines, and the grid between cells |
| `--rule-strong` | `#968464` | Table heads, emphasis rules, the process numerals |
| `--ink` | `#1A2133` | Body text |
| `--text-muted` | `#5E5A50` | Secondary text, kickers, form labels |
| `--stone-50`…`--stone-700` | | Warm greys for UI chrome. Never small text |

Two values are nudged from the originals, both for contrast and both effectively
invisible as a palette change:

- `--rule-strong` was `#C6BDA9`, which sat at 1.76:1 on paper — a table-head rule you
  could not see. Same hue family, now clears 3:1 on both grounds.
- `--star` was a bright amber at 1.87:1 on paper, which is not a star, it's a
  suggestion. Now `#A87715`. Stars stay gold because a star that isn't gold reads as
  unfilled.

### Contrast

Measured in a browser against the real composited background, not assumed.

| Pair | Ratio | |
| --- | --- | --- |
| Ink on paper | 15.11 | Pass |
| Ink on paper-alt | 13.60 | Pass |
| Muted text on paper | 6.48 | Pass |
| Muted text on paper-alt | 5.83 | Pass |
| Blue-700 link on paper | 5.76 | Pass |
| Blue-700 link on paper-alt | 5.19 | Pass |
| White on blue-600 button | 4.85 | Pass |
| Paper on navy-950 hero | 17.27 | Pass |
| Paper on navy-800 card | 11.95 | Pass |
| Blue-300 small text on navy-950 | 9.75 | Pass |
| Blue-600 button vs navy-950 | 3.78 | Large text and UI only |
| Rule-strong on paper | 3.32 | Large text and UI only |
| Star gold on paper | 3.75 | Large text and UI only |

Every text node on every page was checked in a browser. If you add a colour, check it
the same way rather than trusting this table.

---

## Type

| Role | Face | Notes |
| --- | --- | --- |
| Headings, interface | **Libre Franklin** | A Franklin Gothic — the American newspaper headline face. Set at 700/800 with tight tracking |
| Reading text | **Source Serif 4** | Prose, ledes, standfirsts, FAQ answers, table cells |

The split is the point: a headline is a label and a paragraph is something you read,
and the two want different things. It is also the inverse of the serif-display /
sans-body pairing that marks a page as generated.

Both load from Google Fonts, with Helvetica behind the sans and Charter and Georgia
behind the serif.

**Emphasis in a headline is one phrase set in the serif italic** — not a colour, and
never a gradient. A magazine does this; a template does not, because it needs two
families to be deliberate about.

---

## Layout

- **Section headers** are a rule across the column, the kicker hanging in a 190px left
  margin, the heading at `clamp(1.45rem, 2.5vw, 1.95rem)` capped at 26ch, and the
  standfirst in the serif at the measure.
- **Grids share one hairline.** `gap: 1px` over a `--rule` background with a single
  outer border, so cells are divided rather than floated.
- **The reading measure is `--measure`, 68ch.** Prose never exceeds it.
- **Buttons are square and flat.** No radius, no shadow, no transform on hover.
- **Process steps are hanging numerals**, not circles joined by a dashed line.
- **Dark bands are flat** with the faint rule grid, no radial washes.

---

## Voice

- **Say the uncomfortable thing first.** The legal page opens by stating the category
  is the most expensive in paid search. The home care page says Google only works
  where there is search volume. A firm that warns you before you hire it is more
  believable than one that doesn't, and it turns away buyers who were going to be
  unhappy.
- **Never invent a number.** No fabricated results, client counts, years in business
  or case studies. The site carried made-up performance figures once and they were
  removed. The only figures on the site are ones somebody counted, and the review
  count on the homepage carries a comment saying when it was last verified.
- **Proof sits next to the claim it supports**, never in a wall at the bottom.
- **Quote reviewers as they wrote.** Typos and all, or paraphrase — never silently
  corrected.
- American English. Contractions are fine. No contrarian framing, no jargon headlines,
  no em-dash aphorisms, no condescension.

---

## Applying it

- Colours: `styles.css`, the single `:root` block. The only other place a token is set
  is the 640px media query, which lowers the header height on phones.
- Layout: the **Editorial layout layer** at the end of `styles.css`, which is where
  the component defaults get overridden. Add to it rather than editing earlier rules.
- Mark: `images/brand/`, plus the inline SVG in each page's header and footer.
- Share image: `images/og-image.png`, from `images/og-source.html` at 1200×630.
