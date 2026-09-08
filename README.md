# Steady Growth Marketing — website

Static marketing site. No build step, no dependencies, no framework.

**Hosted on GitHub Pages.** Every push to the default branch publishes automatically via
`.github/workflows/deploy.yml` — there is no dashboard to visit and no deploy button to press.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The entire homepage |
| `styles.css` | Design system + all styling |
| `main.js` | Nav, scroll reveal, counters, FAQ, form guard, analytics events |
| `thank-you.html` | Post-form-submission page (fires the `generate_lead` GA event) |
| `404.html` | Not-found page (GitHub Pages serves this automatically) |
| `.github/workflows/deploy.yml` | Publishes the site on every push |
| `.nojekyll` | Stops GitHub Pages running the files through Jekyll |
| `favicon.svg` | Browser tab icon |
| `images/logo-mark.svg` | Standalone logo mark |
| `robots.txt`, `sitemap.xml` | SEO |

The logo is inlined as SVG inside the HTML so it stays crisp at any size and costs zero extra
requests. To swap in a raster version instead, drop it at `images/steady-logo.png` and replace the
`<svg class="logo-mark">` blocks in `index.html` with
`<img src="images/steady-logo.png" class="logo-mark" alt="Steady Growth Marketing">`.

## Local preview

Any static server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publishing changes

Commit and push to the default branch. The Actions workflow builds and deploys in about a minute;
watch it under the repo's **Actions** tab. That's the whole process.

## One-time setup

### 1. Enable GitHub Pages

Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**. Do this once; after that
the workflow handles everything.

### 2. Connect the contact form

The form posts to [Web3Forms](https://web3forms.com) — free, no account required, 250 submissions
per month.

1. Go to web3forms.com, enter `yosef@steadygrowthmarketing.com`, and they email you an access key.
2. In `index.html`, find `YOUR_WEB3FORMS_ACCESS_KEY` and replace it with that key.
3. Push. Submit a test message and confirm it arrives.

Until the key is set, the form shows a visible warning and logs an error in the browser console —
so a misconfigured form is impossible to miss.

Note the form's `redirect` field points at `https://steadygrowthmarketing.com/thank-you.html`. If
you test a submission before the domain has moved, you'll land on the old Netlify site. The
submission still arrives in your inbox — only the landing page is wrong, and it corrects itself
once DNS moves.

Spam protection is the hidden `botcheck` field. Web3Forms rejects any submission that fills it in.

**Required fields:** name, email, phone, message. Company, website, service, and budget are optional.

**Google Ads click ID.** Every submission includes a `gclid` field. `main.js` reads `?gclid=` on
arrival and stores it in `localStorage` for 90 days (the default Google Ads conversion window),
because visitors usually land from an ad, browse, and submit later from a URL with no gclid left on
it. Reading it only at submit time would miss nearly all of them.

Use it to import offline conversions into Google Ads (Tools → Conversions → Imports), so closed
deals get attributed back to the clicks that produced them. Submissions with an empty `gclid` came
from somewhere other than a Google ad — or from a visitor whose first click was over 90 days ago.

To also capture `wbraid`/`gbraid` (which replace `gclid` on some iOS traffic) or UTM parameters,
the same block in `main.js` extends to them.

### 3. Domain

Done. `steadygrowthmarketing.com` resolves to GitHub Pages via Squarespace DNS, with the Google
Workspace mail records intact. The records, for reference:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `yosef-a11y.github.io` |

Verify those IPs against the current list in
[GitHub's docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
before you change anything — GitHub has changed them before.

Then repo **Settings → Pages → Custom domain** → enter the domain → tick **Enforce HTTPS** once the
certificate finishes provisioning (usually minutes, occasionally up to 24 hours).

Delete the old Netlify site only after the domain resolves to GitHub Pages, so there's no gap.

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
- **Reviews** — the `#reviews` section holds real Google reviews, newest first. To add one, copy a
  `.testimonial-card` block and fill in the quote, initials, name, and month. The layout is a CSS
  masonry wall, so any number of reviews of any length arranges itself.
- **FAQ** — questions live in `#faq`. If you add or change one, mirror it in the `FAQPage` JSON-LD
  block in `<head>` so the structured data stays accurate.

## SEO and AI discoverability

What's in place, and what each piece is for:

| Piece | Purpose |
| --- | --- |
| `<title>` / meta description | Primary keywords up front: Google Ads, Meta Ads, e-commerce, lead gen |
| `meta name="robots"` with `max-snippet:-1` | Lets Google and AI Overviews quote the page at length |
| JSON-LD `@graph` in `<head>` | Organization + ProfessionalService with services, `knowsAbout`, phone, email; plus WebSite and WebPage |
| JSON-LD `FAQPage` | The six FAQ answers, eligible for FAQ rich results and directly quotable by AI |
| `.about-lead` paragraph | A single self-contained sentence describing the business, written for AI engines to lift verbatim |
| `llms.txt` | Plain-text summary of the business for AI crawlers, mirroring the page |
| `robots.txt` | Explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended and others |
| `images/og-image.png` | 1200×630 share image for social and AI previews; regenerate from `images/og-source.html` if the tagline changes |
| `sitemap.xml` | Includes the image entry and a current `lastmod` |

The Google Business Profile link is in `sameAs`, and the address is Lakewood, NJ. Both appear in the
structured data, the About paragraph, and `llms.txt`.

Not done on purpose: `Review` and `AggregateRating` markup. Google doesn't award rich results for
reviews a business publishes about itself, and marking them up risks a manual action.

## Known limitation of GitHub Pages

GitHub Pages doesn't support custom response headers, so the security and cache-control headers that
`netlify.toml` used to set are gone. `Referrer-Policy` is preserved via a `<meta>` tag; the rest
(`X-Frame-Options`, `Content-Security-Policy`, `Strict-Transport-Security`, immutable asset caching)
can't be replicated. For a brochure site with no login and no user data this is low-risk, but if you
ever need those headers back, Cloudflare Pages supports them via a `_headers` file and deploys from
this same repo.

## Before going live

- [x] Enable Pages with the GitHub Actions source
- [x] Set the Web3Forms access key
- [x] Move DNS to Squarespace and point the domain at GitHub Pages
- [ ] Tick Enforce HTTPS on the Pages settings page once the certificate has issued
- [ ] Delete the Netlify site. Nameservers no longer point at Netlify, so the whole account can go
- [ ] Mark `generate_lead` as a key event in GA4
- [ ] Add the site in Google Search Console and submit `sitemap.xml`
- [ ] Send yourself a test through the live contact form
