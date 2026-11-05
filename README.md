# GVP Website (Global Visit Permit)

Corporate website for GVP, written for government decision-makers: ministers, immigration and police leadership, airport and port authorities, tourism boards and procurement committees.

**Stack:** Next.js 15 (App Router) · React 19 · MUI 6 · Node.js · Prisma 6 · MongoDB · Nodemailer (SMTP)
**Theme:** "Passport Ink" (emerald, parchment, copper) by default. A second palette, "Diplomatic Oxblood" (oxblood, bone, celadon), is saved in `src/theme/tokens.ts`; switch with `NEXT_PUBLIC_THEME="diplomatic-oxblood"` and restart.

**Home-page-only preview:** on by default. Every link and button is clickable (menus and the "More" dropdown still open) but nothing navigates. Set `NEXT_PUBLIC_HOME_ONLY="false"` to enable all pages.

---

## 1. Getting started

Requirements: Node.js 18.18 or newer (20 LTS recommended) and a MongoDB database running as a **replica set** (MongoDB Atlas works out of the box; Prisma needs a replica set for writes).

```bash
cd gvp-website
npm install            # also runs `prisma generate`
cp .env.example .env   # then fill in DATABASE_URL and the SMTP settings
npm run db:push        # creates the `enquiries` collection indexes
npm run dev            # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Other scripts: `npm run lint`, `npm run typecheck`, `npm run db:studio` (browse enquiries in Prisma Studio).

---

## 2. Environment variables

See `.env.example` for the full list.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for metadata, sitemap and emails |
| `NEXT_PUBLIC_THEME` | `passport-ink` (default) or `diplomatic-oxblood` |
| `NEXT_PUBLIC_HOME_ONLY` | `true` (default) disables navigation for the home-page preview; `false` enables all pages |
| `NEXT_PUBLIC_SHOW_PLACEHOLDERS` | `true` highlights `[bracketed]` placeholder copy in the accent colour; set `false` before launch |
| `DATABASE_URL` | MongoDB connection string |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | SMTP server |
| `MAIL_FROM` | Sender on outgoing emails |
| `ENQUIRY_TO` | Inbox(es) that receive new enquiries (comma-separated) |
| `SEND_ACKNOWLEDGEMENT` | `true` sends a thank-you email to the person who enquired |

---

## 3. Project structure

```
prisma/schema.prisma          Enquiry model (MongoDB)
public/brand/                 GVP logo (white) and mark
src/app/                      Pages (App Router)
  page.tsx                    1. Home
  about/                      2. About GVP
  solution/                   3. Our Solution: BMS
  partnership-model/          4. Partnership Model (zero capex, BOT)
  revenue-share/              5. Open and Transparent Revenue Share
  destination-promotion/      6. Destination Promotion
  team/                       7. Team and Leadership
  security/                   8. Security, Data Sovereignty and Governance
  delivery/                   9. Delivery Approach and Local Capacity
  track-record/               10. Experience and Track Record
  faqs/                       11. FAQs for Government
  contact/                    12. Contact and Government Enquiries
  privacy/, terms/            Legal pages (drafts for counsel)
  api/enquiries/route.ts      POST endpoint for the enquiry form
  sitemap.ts, robots.ts       SEO
src/components/
  layout/                     Header (sticky, mobile drawer) and Footer
  ui/                         Section, PageHero, FeatureGrid, InfoTable, BulletList,
                              Diagrams (BOT lifecycle, revenue waterfall, phases),
                              FaqAccordion, PersonCard, CtaBanner, Stamp, MrzStrip,
                              SecurityPattern, Rich (placeholder highlighting)
  contact/ContactForm.tsx     Enquiry form (client)
src/lib/
  site.ts                     Navigation, contact details, interest options
  faqs.ts                     FAQ content
  validation.ts               Zod schema shared by form and API
  prisma.ts, mailer.ts, rateLimit.ts
src/theme/                    Tokens, fonts and MUI theme
```

Copy for each page lives at the top of that page's `page.tsx`, taken from *GVP Website: Complete Content Draft*.

---

## 4. How the enquiry backend works

1. The form validates in the browser with the same Zod schema the server uses.
2. `POST /api/enquiries` checks content type, origin and a per-IP rate limit (5 per 10 minutes), validates again, and silently drops bot submissions caught by a hidden honeypot field.
3. The enquiry is **saved to MongoDB first**, so an SMTP outage never loses an enquiry.
4. An HTML + plain-text notification goes to `ENQUIRY_TO` (reply-to is the enquirer), and an acknowledgement goes to the enquirer.
5. The record's `emailStatus` is set to `SENT` or `FAILED` (with the error) so failed notifications can be followed up in Prisma Studio.

The rate limiter is in-memory. If you deploy across several instances or serverless functions, replace it with a shared store such as Redis.

---

## 5. "Download" buttons

The PDFs named in the draft (BMS Overview, Revenue Transparency Framework, Team Profiles) don't exist yet. Until they do, those buttons open the contact form with the area of interest and topic pre-filled (for example `/contact?interest=BMS&topic=BMS%20Overview`). When the PDFs are ready, put them in `public/downloads/` and point the `href`s on the Solution, Revenue Share and Team pages at them.

---

## 6. Images

There is no photography yet. Heroes use the guilloche security pattern instead. To add licensed photos:

- **Page heroes:** `<PageHero image="/images/hero-airport.jpg" … />` adds the photo under an ink-green overlay.
- **Leadership:** add approved portraits under `public/team/` and set `photo` on each leader in `src/app/team/page.tsx`.

---

## 7. Pre-publishing checklist (from the content draft)

- [ ] Replace every `[bracketed]` placeholder, then set `NEXT_PUBLIC_SHOW_PLACEHOLDERS="false"`
  - HQ location (About), revenue split % (Revenue Share), audit frequency, team size `[25+]`
  - Bios and titles (Team), Chief Programme Director name, supporting leadership
  - Destination marketing commitment, trade-event wording
  - ISO 27001 / standards wording (Security)
  - Key figures, reference projects, case study, testimonials, press (Track Record)
  - Address, phone, email, LinkedIn (`src/lib/site.ts`)
  - Company name, hosting location, retention period, jurisdiction (Privacy, Terms)
- [ ] **Confidentiality:** don't mention any active negotiation or country-specific proposal (including Mauritius) until the client approves
- [ ] **Competitors:** don't name or compare with other providers
- [ ] **Claims:** substantiate every figure, certification and past achievement
- [ ] **Legal review:** revenue share, BOT, procurement route, data protection, Privacy and Terms pages
- [ ] **Biographies and photos:** approval from each individual
- [ ] **Fee and split figures:** illustrative only until contract terms are agreed

---

## 8. Accessibility and quality

- WCAG AA colour contrast (accent buttons use dark base text; accent text on light backgrounds uses the darker `accentDark` token)
- Skip link, visible focus rings, semantic headings, labelled form fields, focus moves to the first invalid field
- Respects `prefers-reduced-motion`
- Mobile-first layouts; tables collapse to stacked rows on small screens
- Security headers set in `next.config.mjs`
