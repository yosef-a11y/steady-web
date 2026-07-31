# Steady Growth Marketing — website

Static marketing site. No build step, no dependencies, no framework. Deploys to Netlify as-is.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The entire homepage |
| `styles.css` | Design system + all styling |
| `main.js` | Nav, scroll reveal, counters, FAQ, analytics events |
| `thank-you.html` | Post-form-submission page (fires the `generate_lead` GA event) |
| `404.html` | Not-found page (Netlify serves this automatically) |
| `netlify.toml` | Publish dir, redirects, security + caching headers |
| `favicon.svg` | Browser tab icon |
| `images/logo-mark.svg` | Standalone logo mark |
| `robots.txt`, `sitemap.xml` | SEO |

The logo is inlined as SVG inside the HTML so it stays crisp at any size and costs zero extra
requests. To swap in a raster version instead, drop it at `images/steady-logo.png` and replace the
`<svg class="logo-mark">` blocks in `index.html` with `<img src="images/steady-logo.png" class="logo-mark" alt="Steady Growth Marketing">`.

## Local preview

Any static server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying to Netlify

Connect this repo to Netlify. Settings:

- **Build command:** _(leave empty)_
- **Publish directory:** `.`

`netlify.toml` already sets the publish directory, so a fresh site should pick it up automatically.

## Contact form

Uses [Netlify Forms](https://docs.netlify.com/forms/setup/). The `data-netlify="true"` attribute on
the form means Netlify detects it at deploy time — no backend needed. Submissions show up under
**Forms** in the Netlify dashboard.

To get email notifications: Netlify dashboard → Forms → Form notifications → add an email
notification pointed at yosef@steadygrowthmarketing.com.

Spam protection is handled by the `bot-field` honeypot. If spam gets through, enable reCAPTCHA by
adding `data-netlify-recaptcha="true"` to the form and a `<div data-netlify-recaptcha="true"></div>`
above the submit button.

## Analytics

Google Analytics (`G-7BZ01Y3KFS`) is loaded on every page. Custom events fired:

| Event | When |
| --- | --- |
| `form_submit` | Contact form submitted |
| `generate_lead` | Thank-you page loads (the real conversion) |
| `click_to_call` | Any phone number clicked |
| `click_to_email` | Any email address clicked |

Mark `generate_lead` as a key event in GA4 (Admin → Events) so it shows up as a conversion.

## Editing content

Everything is plain HTML — search for the text you want to change in `index.html` and edit it.

Common edits:

- **Stats band** — the `data-count`, `data-prefix`, `data-suffix`, and `data-decimals` attributes
  drive the count-up animation. The visible text is the fallback for no-JS, so update both.
- **Results / testimonials** — swap the copy in the `#results` and `#testimonials` sections. The
  testimonials currently use initials-only attribution; add real names and companies as you get
  permission.
- **FAQ** — questions live in `#faq`. If you add or change one, mirror it in the `FAQPage` JSON-LD
  block in `<head>` so the structured data stays accurate.

## Before going live

- [ ] Add a real social share image at `images/og-image.png` (1200×630) — the meta tags already point at it
- [ ] Replace placeholder testimonials with attributed real ones
- [ ] Set up the Netlify form email notification
- [ ] Mark `generate_lead` as a key event in GA4
- [ ] Submit `sitemap.xml` in Google Search Console
