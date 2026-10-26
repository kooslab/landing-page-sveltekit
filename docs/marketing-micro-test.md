# Koostory Agency: Meta Ads Microtest Context

Handoff document for continuing this work in another AI session or repository.
Last updated: October 2026.

---

## 0. How to work with Ilmo

- Ilmo is new to marketing: explain concepts in plain words with concrete examples, structured answers.
- Show his original question, then an improved version (grammar corrected), then answer.
- Ask short, compact clarifying questions when something is unclear.
- Use American English for all ad and landing page copy.
- Minimal emojis.

---

## 1. Who and what

- **Ilmo**, founder of **Koostory UG (haftungsbeschränkt)**, Berlin. Software development and AI automation agency.
- Background: 7 years software/systems engineer, 6 years co-founder and CPO of a coding bootcamp (CodeStates, Korea), 3 years software sales, last ~3 to 4 years running Koostory.
- Stack: Python, Node.js, TypeScript, SvelteKit/React/Next.js, Flask/FastAPI, AWS, Vercel, Supabase, Neon.
- Almost all past clients came through **referrals**. No outbound or paid acquisition experience for the agency yet.
- Goal of this workstream: validate a niche and message for the agency with **small-budget Meta ad microtests**, then build a funnel that gets booked calls.

---

## 2. Past projects (evidence base)

| Client                                   | What was built                                                                                                                                                                                                                                                                               | Revenue (approx.)                 | Enjoyment (1-5)               |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------------------- |
| MindLogic (Korean university AI product) | 52 custom SSO integrations (SAML/OIDC), one per university                                                                                                                                                                                                                                   | ~$70K, ongoing monthly            | 5                             |
| MyWorkspace (coworking, Gangnam, Seoul)  | Virtual office automation: card subscription payments, e-signature contracts, packages/pricing, refunds/renewals, legacy data migration, onboarding UX. Also: 10 years of customer data from 3-4 sources merged into one source of truth. Also: WordPress form to Zendesk ticket integration | ~$60K over 2 years                | 5 (automation), 1 (WordPress) |
| Finance-team outsourcing firm            | Bank statement data via API into spreadsheets, rule/AI-based chart-of-accounts matching, Retool back office for managing many clients, web crawlers (exchange rates, coin prices, etc.)                                                                                                      | ~$3K/month for ~18 months (~$54K) | 4                             |
| Agent T (startup)                        | Private tour guide matching PWA, subscription payments, KakaoTalk AlimTalk + SMS                                                                                                                                                                                                             | ~$20K                             | 3 (business failed)           |
| Parking AI (US startup)                  | CCTV video AI webhooks, deduplicating noisy entry/exit events, per-site fee rules, monthly passes, on-prem + cloud                                                                                                                                                                           | ~$15K-18K                         | 5 (cloud/data), 1 (on-prem)   |
| Logisna (delivery ops)                   | Touchscreen kiosk web app, thermal printer server, rider app (assign, photo proof, complete/cancel): basically a small TMS                                                                                                                                                                   | ~$7K-8K                           | 4                             |
| First 144                                | Flutter app for Seoul/Gyeonggi apartment market data with in-app subscriptions; Project E, AI event management tool                                                                                                                                                                          | ? + ~$7K                          | 3                             |

**Key MyWorkspace result: reduced admin/management staff from 3 people to 1.** This is the main proof point.

Patterns across projects:

1. Connecting systems that don't talk to each other (SSO, APIs, payments, webhooks).
2. Turning messy, scattered data into one clean source.
3. Payments and subscriptions.
4. Replacing manual staff work with automation.

Revenue concentration: the top 3 long-term relationships (MindLogic, MyWorkspace, finance firm) are ~75% of revenue. Enjoyment and revenue overlap on the same projects.

---

## 3. Positioning (current)

**Core problem Ilmo solves:** employees doing manual, hands-on work in spreadsheets, with data scattered across tools, collecting and cleaning it by hand so one task takes hours. Plus AI-based automation (matching, classifying, cleaning, reading documents).

**Strongest fit:** small businesses and small agencies with **recurring payments, memberships, or retainer clients** that they have to manage.

**One-liner (draft):**
"Small businesses with members or recurring clients: I automate the billing, contracts and data your team still handles in spreadsheets."

**Client-facing framing:** clients don't buy "AI," they buy "this task now happens by itself."

**Things to avoid:**

- WordPress projects (hard to debug plugins).
- On-premise / local machine / hardware-heavy work.
- Positioning around finance or accounting: Ilmo's finance work was data retrieval and matching only, no deep finance domain knowledge.
- Coworking spaces as a **target** (low margins, they usually buy off-the-shelf software). Keep MyWorkspace as a **proof story** only.
- US healthcare/clinics for now (HIPAA compliance).

**Secondary offer (not for Meta):** SSO and integrations for B2B SaaS (based on MindLogic). Better reached via LinkedIn and direct outreach, not Meta.

---

## 4. Market decisions

- **US first** (biggest market, higher budgets; Ilmo prefers American English). UK possible later, Germany later in German.
- Target **US East Coast** first so sales calls fit Berlin afternoon/evening (NY is 6 hours behind Berlin).
- Angle vs competitors: senior engineer, EU company, fixed prices. More reliable than cheap offshore freelancers, cheaper than US agencies.

**Round 1 segments:**

| Segment                                                                                       | Typical pain                                                | Margin      |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------- |
| Small agencies and consultancies with retainer clients                                        | Monthly billing, client reports from many tools, onboarding | High        |
| Education and training businesses (academies, course companies, coaching programs, bootcamps) | Enrollments, subscriptions, student data, cancellations     | Medium-high |
| Boutique fitness and wellness studios (multi-location)                                        | Memberships, failed payments, class/member data             | Medium      |

Education is a strong candidate for lead segment because of Ilmo's 6 years as bootcamp CPO (insider credibility). **Not yet confirmed by Ilmo.**

---

## 5. Concepts (for reference)

**Awareness levels (Eugene Schwartz):** unaware, problem aware, solution aware, product aware, most aware. Each level needs a different message. Round 1 targets **problem aware**: ads name a pain, not a product.

**Funnel stages (each tested separately, in order):**

1. Ad message (Round 1, this test): does the problem resonate? Metric: CTR, CPC.
2. Offer + landing page (Round 2): does the page get booked calls? Metric: cost per booked call.
3. Sales call: qualify, diagnose.
4. Proposal and close.

**Important:** microtests measure **interest, not budget**. Filter for ability to pay when choosing segments and in the booking form.

**Rule:** change one variable at a time. Round 1 = segments and messages in one country. Round 2 = winning message across countries (US vs UK vs DE) or offer variants.

---

## 6. Test plan and budget

### Round 1: message test (problem aware)

- 9 ads = 3 segments x 3 pain messages.
- **Meta structure:** 1 campaign, objective **Traffic** (link clicks). **9 ad sets with exactly 1 ad each**, each with its own daily budget (ABO). Same audience in all 9. Reason: if ads share an ad set, Meta pushes almost all spend to one ad and the others never get a fair test.
- Budget: **$3-4 per ad set per day, 3-4 days** = $10-15 per ad total.
- Daily total: $27-36. **Round 1 total: $90-135 (one time, not monthly).**
- Stop rule per ad: ~$10-15 spent or ~1,000 impressions.
- Compare: CTR (link click-through rate) and CPC. Winner must be clearly ahead; small differences at this budget can be noise.
- Note: Ilmo's Meta ad account currency may be EUR (verify); budgets then show in euros.

### Month overview

| Week      | What                                               | Budget       |
| --------- | -------------------------------------------------- | ------------ |
| 1         | Round 1: 9 messages, find strongest segment        | $90-135      |
| 2         | Round 1b: 4-5 new variations for winning segment   | $50-75       |
| 3-4       | Round 2: offer test, landing page + booking button | $200-400     |
| **Total** |                                                    | **$350-600** |

Do not raise budgets mid-test.

---

## 7. Draft ad messages (Round 1, US English)

Each ad = square image (1080x1080, plain bold text on solid color), primary text (2-3 lines: pain + result), headline, button "Learn more".

**Agencies / consultancies**

- agency-1: "Your team spends a full day every month pulling client reports from 6 tools?"
- agency-2: "Still copying client data between your CRM, invoices and spreadsheets by hand?"
- agency-3: "Every new client means another hour of manual setup in 5 different tools?"

**Education / training**

- edu-1: "Enrollments, payments and student data still living in spreadsheets?"
- edu-2: "Your team chases failed tuition payments by hand every month?"
- edu-3: "Student data spread across forms, Stripe and spreadsheets that never match?"

**Studios**

- studio-1: "Chasing failed payments and cancellations by hand every month?"
- studio-2: "Members in your booking app, payments in Stripe, and the truth in a spreadsheet?"
- studio-3: "Your front desk spends hours on renewals, freezes and refunds?"

Primary text, headlines, and image text still to be written in full.

---

## 8. What to prepare

**A. Meta setup (one time)**

- Koostory Facebook Page (logo, short description, website link). Ads run under this name.
- Meta Pixel on landing pages (track visits and bookings).
- Domain verification in Meta Business settings.

**B. 9 ads** (section 7).

**C. 3 landing pages, one template** (not 9 pages). Suggested paths:

- `koostory.net/agencies`
- `koostory.net/education`
- `koostory.net/studios`

Page structure:

1. Headline repeating the ad's pain (message match).
2. What Koostory does, 2 sentences.
3. Proof: MyWorkspace, "3 admin staff to 1".
4. How it works: 3 steps (free call, automation plan, build).
5. CTA: "Book a free 30-minute automation check."

**D. Booking tool:** Cal.com or Calendly. Hours set for US East Coast. 2-3 qualifying questions (e.g. team size, tools used, biggest manual task).

**E. 9 UTM links**, e.g.:

```
koostory.net/education?utm_source=meta&utm_campaign=round1&utm_content=edu-1
koostory.net/education?utm_source=meta&utm_campaign=round1&utm_content=edu-2
koostory.net/education?utm_source=meta&utm_campaign=round1&utm_content=edu-3
```

Same pattern for agency-1..3 and studio-1..3.

**F. Results sheet:** one row per ad: spend, impressions, clicks, CTR, CPC, bookings. Update after day 2 and day 4.

Time estimate: ~1 to 1.5 days total.

---

## 9. Open questions

1. Can MyWorkspace be named publicly with the "3 staff to 1" result, or must the case study be anonymous ("a coworking company in Seoul")?
2. Confirm education as lead segment?
3. Round 2 offer details and price range for a typical automation project.
4. Exact audience targeting settings in Meta (job titles, interests, age, East Coast states).

---

## 10. Background: Flash Hub research (why we're doing it DIY)

- Flash Hub (Manuel Pistner) sells a value ladder: free content, then a $97-equivalent (€97) Microtesting Workshop (self-serve, €20-90 Meta ad budget), then a free strategy call, then a "Done With You / Done For You" AI Sales System (price not published; one data point ~€5,000).
- Their "2x ROI guarantee" means they keep working for free until 2x ROI if success criteria are met. It is not a money-back guarantee.
- Their system fits high-ticket services. Decision: run microtests ourselves instead.
