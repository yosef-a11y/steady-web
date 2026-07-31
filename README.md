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

### 3. Point the domain at GitHub Pages

Do this **last**, after you've previewed the site at
`https://yosef-a11y.github.io/steady-web/` and are happy with it.

There is deliberately no `CNAME` file in the repo yet. Adding one makes Pages claim the domain
immediately, which would redirect the preview URL to a domain still served by Netlify — leaving you
no way to check the site first. GitHub creates the `CNAME` file for you when you set the custom
domain in the UI.

Update DNS at your registrar:

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
- **Results / testimonials** — swap the copy in the `#results` and `#testimonials` sections. The
  testimonials currently use initials-only attribution; add real names and companies as you get
  permission.
- **FAQ** — questions live in `#faq`. If you add or change one, mirror it in the `FAQPage` JSON-LD
  block in `<head>` so the structured data stays accurate.

## Known limitation of GitHub Pages

GitHub Pages doesn't support custom response headers, so the security and cache-control headers that
`netlify.toml` used to set are gone. `Referrer-Policy` is preserved via a `<meta>` tag; the rest
(`X-Frame-Options`, `Content-Security-Policy`, `Strict-Transport-Security`, immutable asset caching)
can't be replicated. For a brochure site with no login and no user data this is low-risk, but if you
ever need those headers back, Cloudflare Pages supports them via a `_headers` file and deploys from
this same repo.

## Before going live

- [ ] Enable Pages (Settings → Pages → Source: GitHub Actions), then re-run the failed workflow
- [ ] Preview at `https://yosef-a11y.github.io/steady-web/`
- [ ] Set the Web3Forms access key and send a test submission
- [ ] Move DNS and set the custom domain, then enable Enforce HTTPS
- [ ] Add a real social share image at `images/og-image.png` (1200×630) — the meta tags already point at it
- [ ] Replace placeholder testimonials with attributed real ones
- [ ] Mark `generate_lead` as a key event in GA4
- [ ] Submit `sitemap.xml` in Google Search Console
- [ ] Delete the Netlify site once the domain has fully moved
