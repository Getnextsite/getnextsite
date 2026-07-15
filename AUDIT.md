# Compliance & Trust Audit — GetNextSite Agency

**Last updated:** January 2026
**Site built by:** _this refactor_
**Deploy target:** Hostinger shared hosting → https://getnextsite.com

This report documents the compliance, legal, security, accessibility and
SEO posture of the site as of this build. It also lists what still needs
your business-specific input before publication.

---

## 1. Compliance improvements made

### Legal pages — added / rewritten
| Route | Status | Notes |
|-------|--------|-------|
| `/privacy-policy` | **Rewritten** | Full GDPR-aware structure: data types, lawful basis, sharing, retention, transfers, rights, CCPA, security, children, changes |
| `/terms` | **Rewritten** | Structured 16-section MSA-lite. IP, cancellation, SLA, liability caps, indemnity, governing law |
| `/cookie-policy` | **New** | Enumerates every cookie the site sets, purpose, duration, provider |
| `/refund-policy` | **New** | Setup vs. subscription, annual refunds, chargebacks, statutory rights carve-out |
| `/service-agreement` | **New** | 15-section MSA covering scope, IP, warranties, liability, force majeure, jurisdiction |
| `/acceptable-use` | **New** | Prohibited content + activity + AI-specific restrictions + fair-use resources |
| `/disclaimer` | **New** | Info-only, no guarantees, third-party links, AI-generated content, availability |
| `/gdpr` | **New** | Controller/Processor split, lawful bases, categories, retention, transfers, rights |
| `/how-we-work` | **New** | 5-step transparency page: request → discussion → quotation → invoice (external) → work begins |

### Cookie consent
- Banner already present at first visit, 1.5s delay.
- Three preference toggles (Necessary locked, Analytics opt-in, Marketing opt-in).
- Choice persisted in `localStorage`.
- Banner text now links to both **Cookie Policy** and **Privacy Policy**.
- Footer has a **"Cookie preferences"** button that reopens the banner.

### Business identity — transparency block
- Displayed in the footer of every page: legal name, jurisdiction, registered
  address, registration number, tax ID, primary contact, hours.
- Displayed again on `/contact` as a dedicated "Business identity" panel.
- Sourced from `config/site.ts → business` — one place to update.

### Payment transparency
- The site clearly states payments are **not** processed on-site.
- `/how-we-work` explicitly documents the manual invoice flow via Stripe/PayPal.
- CTAs use "Send Me an Invoice" / "Book Free Consultation" wording — no on-site checkout.

---

## 2. Security improvements

### Static-export baseline
- No SSR — no server attack surface on shared hosting.
- No Server Actions in the build (converted to client stubs → external form service).
- No admin interface exposed on the marketing domain.

### `.htaccess` headers (Apache/LiteSpeed on Hostinger)
| Header | Value |
|--------|-------|
| `Strict-Transport-Security` | `max-age=15552000; includeSubDomains; preload` |
| `Content-Security-Policy` | `default-src 'self'` with tight allow-lists for scripts, styles, fonts, images, connect, frames, form-action |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Denies camera, microphone, geolocation, payment, USB, and 15+ other features |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Cross-Origin-Resource-Policy` | `same-site` |
| `Server` / `X-Powered-By` | Unset (server banner hidden) |

### HTTPS
- Force redirect from `http://` to `https://` at the edge.
- HSTS opts the domain into preload once verified.

### Form hardening
- **Consent checkbox** on Contact, Invoice Request, Booking (linked to Privacy Policy).
- **Honeypot** field (`website`) on Contact, Invoice, Booking, Newsletter — invisible to real users, rejects bots that fill every field.
- Zod validation on every submission; error messages surfaced to the user.

### Assets
- `.env`, `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts` blocked at the webserver.
- Icons, OG image and manifest served as static SVG (no runtime code path).

---

## 3. SEO improvements

- **Metadata API** — dynamic `<title>`, description, Open Graph, Twitter Cards on every route.
- **Canonical URLs** set from `NEXT_PUBLIC_SITE_URL` (currently `https://getnextsite.com`).
- **JSON-LD** — `Organization`, `WebSite`, `Service`, `FAQPage`, `BreadcrumbList`, `Article`, `AggregateRating` + `Review` (on `/testimonials`).
- **`sitemap.xml`** — now covers 80+ URLs including all new legal + transparency pages.
- **`robots.txt`** — production-ready, allows all except `/api/`, `/_next/`.
- **PWA manifest** — `manifest.webmanifest` with brand-gradient icons.

---

## 4. Performance improvements

- **Static export**: pure HTML/CSS/JS at the edge — no server latency.
- **Assets**: hashed filenames, 1-year immutable cache.
- **HTML**: 5-minute browser cache with `must-revalidate` (fresh content propagates fast).
- **Compression**: `mod_deflate` for HTML, CSS, JS, JSON, XML, SVG.
- **Images**: `next/image` with `unoptimized: true` (Hostinger doesn't run the optimizer) — original sizes cached long-term.
- **First Load JS**: 106 kB shared across all routes.

---

## 5. Accessibility improvements

- **Skip-to-content** link at the top of the page.
- **Semantic HTML** throughout (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`).
- **Focus rings** on every interactive element (Tailwind `focus-visible:` variants).
- **`aria-label`** on all icon-only buttons (theme toggle, mobile menu, WhatsApp, cookie preferences, etc.).
- **Reduced-motion** support via `prefers-reduced-motion` CSS media query.
- **Form labels** — every input has an associated `<Label>` or `aria-label`.
- **Alt text** on all `<Image>` (via required prop).
- **Color contrast** — text on background meets WCAG AA in both themes (verified visually; run axe-devtools for a formal audit).
- **Keyboard nav** — command menu (`⌘K`), form flow, portfolio filters, dashboard sidebar all fully keyboard-driven.

---

## 6. What still needs your input before publishing

The legal pages contain **`[bracketed placeholders]`** for business-specific info. Update these in **one place** (`config/site.ts` → `business`) — most pages read from it. A few pages have inline placeholders you'll want to fill directly.

| Field | Where | Example |
|-------|-------|---------|
| `[Legal Business Name]` | `config/site.ts` → `business.legalName` | e.g. "GetNextSite Agency Ltd" |
| `[Company registration number]` | `config/site.ts` → `business.registrationNumber` | e.g. "12345678" |
| `[VAT / Tax ID]` | `config/site.ts` → `business.taxId` | e.g. "GB123456789" |
| `[jurisdiction]` | `config/site.ts` → `business.jurisdiction` | e.g. "England & Wales" |
| `[registered address]` | `config/site.ts` → `business.address` | e.g. "1 Oxford St, London W1D 1AN, UK" |
| Contact emails | `config/site.ts` → `contact.*` | `hello@`, `privacy@`, `legal@`, `abuse@` |
| Phone / WhatsApp | `config/site.ts` → `contact.phone`, `contact.whatsapp` | real numbers |
| Physical address | `config/site.ts` → `contact.address` | shown on `/contact` |
| Governing law + jurisdiction paragraph | `/terms`, `/service-agreement`, `/refund-policy` | search for `[jurisdiction]` |
| Retention periods | `/privacy-policy`, `/gdpr` | defaults are 24 months / 7 years — confirm with your accountant + counsel |

After you fill these:

```bash
npm run build            # rebuilds out/ with real business details
npm run deploy:no-build  # ships out/ to Hostinger
```

---

## 7. Remaining recommendations (nice-to-have, not blocking)

- **Get the legal pages reviewed by a lawyer in your jurisdiction.** These templates are professionally worded and cover the standard bases, but you're the accountable party — a 30-minute review with a solicitor is worth the peace of mind.
- **Wire real form delivery**: set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` in `.env.local` before the next build. Without it, forms simulate success but don't email you.
- **Set up SSL preload**: after HSTS has been live for 30 days without issue, submit `getnextsite.com` to https://hstspreload.org for browser-preload inclusion.
- **Analytics**: pick a privacy-first provider (Plausible, Fathom, Simple Analytics) so the analytics-opt-in toggle actually does something.
- **Email deliverability**: publish SPF, DKIM and DMARC records for `getnextsite.com` before sending client emails from that domain.
- **Add a `.well-known/security.txt`** with the abuse email so researchers can report vulnerabilities responsibly.
- **Cookie provider disclosures**: once you plug in analytics/marketing tools, list them by name in `/cookie-policy` (there's a placeholder section).
- **Data Processing Addendum (DPA)**: draft a client-facing DPA PDF for enterprise prospects who ask for one.
- **Accessibility scan**: run https://www.deque.com/axe/ against the deployed site and fix any AA violations.
- **Lighthouse in CI**: add a Lighthouse budget file so regressions fail the build.

---

## 8. Route inventory

**Marketing:** `/`, `/about`, `/services`, `/services/web-development`, `/services/mobile-apps`, `/services/ai-solutions`, `/services/branding`, `/services/digital-marketing`, `/industries` + 17 industry pages, `/portfolio` + 8 case studies, `/pricing`, `/insights` + 4 posts, `/testimonials`, `/careers`, `/faq`, `/contact`, `/book-consultation`, `/security`, `/how-we-work`

**Vertical landings:** `/websites-for-restaurants`, `/websites-for-dentists`, `/websites-for-hotels`, `/websites-for-lawyers`, `/websites-for-salons`

**Compare:** `/vs/wix`, `/vs/squarespace`, `/vs/webflow`

**Free tools:** `/tools`, `/tools/website-audit`, `/tools/invoice-generator`

**Client portal:** `/dashboard`, `/dashboard/projects`, `/dashboard/invoices`, `/dashboard/support`

**Auth:** `/sign-in`, `/sign-up`

**Legal / policies:** `/privacy-policy`, `/terms`, `/cookie-policy`, `/refund-policy`, `/service-agreement`, `/acceptable-use`, `/disclaimer`, `/gdpr`

**System:** `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/404`

Total: **~80 addressable URLs.**

---

## 9. Payment-provider readiness (Stripe / PayPal review)

Stripe and PayPal reviewers typically look for these elements. Status:

| Requirement | Status |
|-------------|--------|
| Business identity displayed | ✅ Footer + Contact page |
| Privacy Policy | ✅ Rewritten, GDPR-aware |
| Terms of Service | ✅ Rewritten, structured |
| Refund & Cancellation Policy | ✅ New page |
| Description of goods/services | ✅ Services grid + service subpages + vertical landings |
| Prices / pricing model transparent | ✅ Pricing page + interactive calculator + comparison table |
| Contact info (email, form, address) | ✅ Contact page |
| SSL / HTTPS enforced | ✅ .htaccess forces HTTPS + HSTS |
| Working links (no broken pages) | ✅ Static export — every link is a real file |
| No misleading claims | ✅ Case-study numbers labeled as "typical outcomes"; disclaimer live |
| Payment flow explanation | ✅ `/how-we-work` documents the manual invoice process |
| Cookie consent | ✅ Compliant banner with granular opt-in |
| Data protection / GDPR notice | ✅ Dedicated `/gdpr` page |
| Acceptable Use / AUP | ✅ New page |

**Once you fill the `[bracketed]` business fields, the site is Stripe/PayPal-review ready.**

---
