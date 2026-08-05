# Client logos

Drop client logo files here, then add one `<img>` line to that client's review card in
`index.html` — as the **first child** of the `<article class="testimonial-card">`, above the
`quote-mark` div:

```html
<img class="review-logo" src="images/logos/quality-bath.svg" alt="Quality Bath">
```

The CSS hides the decorative quote mark automatically whenever a logo is present, so the card
doesn't end up with both.

## Expected filenames

| Client | File |
| --- | --- |
| Quality Bath | `quality-bath.svg` |
| Bodno | `bodno.svg` |
| Blinkless | `blinkless.svg` |
| Remote Central | `remote-central.svg` |
| Attain ABA | `attain-aba.svg` |
| Rosewood Recovery | `rosewood-recovery.svg` |
| Evian Care | `evian-care.svg` |

## Requirements

- **SVG preferred** — stays sharp at any size and is usually the smallest file. PNG is fine if
  that's all you have; use one at least 2× the display size (so ~60px tall) with a transparent
  background.
- **Transparent background.** A logo on a white rectangle will show as a visible box against the
  card.
- Logos render at 26px tall, greyscale, going full colour on hover. Wide horizontal lockups work
  best; tall stacked logos will look small next to them.

## Permission

These are your clients' trademarks. Displaying them as a client list is normal practice for an
agency, but it's worth having their okay — particularly for anyone on a contract with a publicity
clause.
