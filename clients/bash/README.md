# Bash: Google Ads landing pages and tracking

Client: **Bash Soft Serve** / **Bash Party Rental**, Coral Springs, FL · (954) 997-2251
Kickoff call: 10/29/26

| Page | Path | Goal |
| --- | --- | --- |
| Soft serve (main product) | `soft-serve/` | Station or machine rental leads, corporate + personal |
| Tables & chairs | `tables-chairs/` | Local rental leads within ~10 miles |
| Thank-you | `thank-you/?type=softserve` or `?type=tables` | Fires the conversion |
| Shared | `bash.css`, `bash.js` | Styles, tracking, form logic. **All IDs live in `BASH_CONFIG` at the top of `bash.js`.** |

All three pages are `noindex`. They are ad landing pages, not SEO pages, and they're kept out of
Steady's sitemap.

## Where these need to live before ads run

Google Ads requires the ad's final URL to be on the advertiser's own domain. Pages on
steadygrowthmarketing.com are for preview and approval only. For launch, copy the `clients/bash/`
folder to Bash's domain, keeping the four folders side by side, e.g.:

- `bashsoftserve.com/events/soft-serve/`
- `bashsoftserve.com/events/tables-chairs/`
- `bashsoftserve.com/events/thank-you/`

The pages are plain HTML with no build step, so any host that serves static files works. If
bashsoftserve.com is on a builder (Wix, Squarespace, GoDaddy), a subdomain such as
`go.bashsoftserve.com` pointed at GitHub Pages or Netlify is the easiest route.

---

## What we know (research + call notes)

The client sites (bashpartyrental.com, bashsoftserve.com) were blocked from this session's network,
so this comes from search-indexed copies of their pages, Yelp, and the call notes. **Confirm the
starred items with Bash.**

**Soft serve (main product, little competition)**
- Station with attendant, or machine rental. Presentation is the priority, with many options
- Standard package: cups, cones, 2–4 toppings, vanilla **or** chocolate. Sugar cones and extra toppings cost more
- One flavor per machine; 60–75 servings per hour per machine
- Attendant up to 5 hours at no extra charge
- Kosher, ORB certified, cholov yisroel. Dairy and non-dairy
- Custom flavors, logo cups, logo napkins, branded cart
- Machines need their own circuit; Bash brings extension cords. Indoors only in summer (humidity)
- ★ Customer provides a table and tablecloth (from the listing; does this apply to the cart setup?)
- Area: Palm Beach, Broward, Miami-Dade
- Site lists the machine at $0.00 with "call to reserve". No public pricing today

**Tables & chairs (lots of competition, 10-mile radius only)**
- ★ Prices from the site: folding chair $2, kids folding chair $2, resin chair $4, gold Chiavari $5.50, cross-back wood $7, 6-ft table $10, kids table $10, 48" round $12, 60" round $15
- Weekend: 2 days for the price of 1. Weekend orders by phone only
- Drop-off standard; setup and takedown extra; damage insurance at checkout; sales tax extra
- 9402 NW 38th St, Coral Springs, FL

**Not advertised:** bounce houses, water slides and other inflatables (per Yosef). Ice cream truck is a negative.

---

## Campaign plan

Target CPA: **under $125**.

### Campaign 1: Soft Serve | Search
- **Location:** Palm Beach, Broward, Miami-Dade counties. "Presence: people in or regularly in" only
- **Final URL:** `/soft-serve/`
- **Bidding:** Maximize Conversions to start. Move to Target CPA ~$110 after 30 conversions
- **Ad groups**
  - Soft serve station: soft serve station rental, soft serve catering, soft serve bar for party
  - Ice cream catering: ice cream catering, ice cream station for party, ice cream bar rental
  - Corporate: corporate ice cream catering, ice cream for office party, employee appreciation ice cream
  - Machine rental: soft serve machine rental, ice cream machine rental for party
  - Kosher: kosher ice cream catering, kosher dessert station (small volume, high fit)
- **Ad copy angles:** "Served Inside Your Event", "Your Logo on Every Cup", "Kosher, ORB Certified",
  "Attendant Included". Sitelinks to #options, #events, #quote
- **Assets:** call asset (with call reporting on), location asset, image assets once photos arrive

### Campaign 2: Tables & Chairs | Search
- **Location:** 10-mile radius around 9402 NW 38th St, Coral Springs. Presence only
- **Final URL:** `/tables-chairs/`
- **Budget:** keep it small. The category is crowded; let it prove itself on CPA before scaling
- **Ad groups:** table and chair rental, chair rental (Chiavari / folding), kids table and chair rental
- **Ad copy angles:** price in the headline ("Chairs From $2"), "2 Days for 1 on Weekends", "Kids Sizes"

### Shared negative keyword list (apply to both)
```
truck
ice cream truck
bounce
bounce house
water slide
inflatable
jobs
hiring
career
for sale
buy
used
wholesale
supplier
repair
parts
manual
how to
recipe
diy
cuisinart
ninja creami
taylor
franchise
shop
parlor
open now
costco
home depot
lowes
walmart
amazon
```
Watch the search terms report weekly for the first month; "near me" searches are usually shop-seekers
on the soft serve side, but "ice cream catering near me" is good. Decide from real search terms.

---

## Tracking setup (step by step)

### 1. Fill in `BASH_CONFIG` in `bash.js`
| Key | Where to get it |
| --- | --- |
| `ga4Id` | GA4 → Admin → Data streams → web stream → Measurement ID |
| `adsId` | Google Ads → Goals → Conversions → any action → Tag setup → "AW-…" |
| `labels.*` | Same screen, the part after the slash of each action's send_to |
| `web3formsKey` | web3forms.com, using the inbox that should receive Bash's leads |
| `softServeStationFrom`, `machineRentalFrom`, `tablesOrderMinimum` | Bash's minimums (numbers only). Left as `null`, the price lines stay hidden |
| `deliveryZips` | Confirm with Bash. Drives the ZIP checker on the tables page |

Anything left as a placeholder is skipped, so nothing breaks before the IDs are in.

### 2. Create these conversion actions in Google Ads
| Action | Type | Primary? | Count | Notes |
| --- | --- | --- | --- | --- |
| Lead form: Soft serve | Website, Submit lead form | Primary | One | Fires on `thank-you/?type=softserve` |
| Lead form: Tables & chairs | Website, Submit lead form | Primary | One | Fires on `thank-you/?type=tables` |
| Calls from ads | Call asset, 60s+ | Primary | One | Turn on call reporting |
| Calls from website | Website call, Google forwarding number, 60s+ | Primary | One | The page swaps the number for ad visitors |
| Click-to-call | Website, Phone call click | **Secondary** | One | Observation only. Would double count with the two call actions |

Use the **Manual (code)** option for each website action, copy its label into `BASH_CONFIG.labels`.

Since soft serve leads are worth far more than a table order, set campaign-level goals so the Tables
campaign bids only on the Tables form + calls, and the Soft Serve campaign on the Soft Serve form + calls.

### 3. Enhanced conversions for leads
Google Ads → Goals → Settings → Enhanced conversions for leads → On, method **Google tag**. The
thank-you page already sends the hashed email and phone from the form.

### 4. Offline conversions (closing the loop)
Every lead email includes `gclid`, `gbraid`, `wbraid` and UTMs. Once a quote turns into a booking,
upload it (Goals → Conversions → Uploads) as **Booked event** with the booking value. After a month
of uploads, Bash can bid on actual bookings instead of form fills. This is the single biggest lever
for holding CPA under $125 on real revenue.

### 5. GA4
Link GA4 to Google Ads. Mark `generate_lead` as a key event. Don't import it into Ads as primary:
the Ads tag already counts the lead, and importing would double it.

### 6. Test before launch
1. Open the page with `?gclid=test123` added to the URL
2. Submit the form. The email should include `gclid: test123`
3. Google Tag Assistant should show the conversion firing on the thank-you page, once
4. Refresh the thank-you page: it should **not** fire again

---

## Needed from Bash before launch
1. **Minimum prices** for a station, a machine rental, and a table/chair delivery order (call notes: use them to weed out small jobs)
2. **Photos:** five soft serve photos received 10/29 and placed (`images/`). They're 640×480, so ask Bash for the originals: the hero looks soft on large screens. Still wanted: logo cups close-up, a corporate/office setup, and table & chair setups for the tables page
3. **Reviews** with name, event type and city. Google reviews are ideal. Include the kids-tables bar mitzvah review from the current site
4. **Logo:** received 10/29. Save it as `clients/bash/images/bash-logo.png` (600×300 is fine) and it appears in the header, footer and thank-you page. Until the file is there, the pages show a text fallback. Colors are matched to it: tent red for calls to action, Bash purple and Party gold for accents
5. **Machine rental details:** what's included, delivery fee, deposit, how long it can stay
6. **Confirm** the table/chair prices, the ZIP list, and whether the customer supplies a table for a station
7. **Lead inbox** for the forms, and who answers calls (fast callback = lower CPA)
8. **Domain access** for hosting the pages (see above)
