# Round 1 Ad Specs

## Campaign Structure

- **Objective:** Traffic (link clicks)
- **Budget type:** ABO (Ad Set Budget Optimization)
- **Campaign:** 1 campaign named `koostory-round1-message-test`
- **Ad sets:** 9 total, each with exactly 1 ad
- **Daily budget per ad set:** $3–4 USD (verify if account currency is EUR)
- **Duration:** 3–4 days
- **Total budget:** $90–135

## Audience Targeting

- **Country:** United States
- **Region:** East Coast states (NY, NJ, CT, MA, PA, VA, MD, DC, NC, GA, FL)
- **Age:** 25–55
- **Placements:** Automatic (Meta default)

Segment-specific interests/job titles to layer on:

| Segment   | Suggested Interests / Job Titles                                                        |
| --------- | --------------------------------------------------------------------------------------- |
| Agencies  | Marketing agency, Creative agency, Digital marketing, Agency owner, Consultant          |
| Education | Online education, Course creator, Training company, Coaching business, Bootcamp         |
| Studios   | Fitness studio, Yoga studio, Pilates, Boutique fitness, Wellness studio, Multi-location |

## Ad Creative Specs

- **Format:** Single image
- **Image size:** 1080x1080 (square)
- **Image style:** Plain bold text on solid color background (no stock photos)
- **CTA button:** "Learn more"

### Ad Copy per Variant

#### Agencies / Consultancies → Landing: /for/agencies

| ID       | Image Text (bold on solid bg)                                                  | Primary Text                                                                                              | Headline                                     |
| -------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| agency-1 | Your team spends a full day every month pulling client reports from 6 tools?   | Your team pulls client reports from 6 different tools every month. What if it happened automatically?     | Stop copy-pasting. Automate your client ops. |
| agency-2 | Still copying client data between your CRM, invoices and spreadsheets by hand? | CRM, invoices, spreadsheets — your team copies data between them by hand. There's a better way.           | One system instead of six tabs.              |
| agency-3 | Every new client means another hour of manual setup in 5 different tools?      | Every new client = another hour of manual setup across 5 tools. We build the system that does it for you. | New client? Zero manual setup.               |

#### Education / Training → Landing: /for/education

| ID    | Image Text                                                                  | Primary Text                                                                               | Headline                                        |
| ----- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| edu-1 | Enrollments, payments and student data still living in spreadsheets?        | Enrollments in one place, payments in another, student records in a third. Sound familiar? | Your student data deserves one source of truth. |
| edu-2 | Your team chases failed tuition payments by hand every month?               | Failed payments shouldn't be a manual job. We automate dunning, retries, and follow-ups.   | Stop chasing payments. Automate them.           |
| edu-3 | Student data spread across forms, Stripe and spreadsheets that never match? | Forms say one thing, Stripe says another, the spreadsheet matches neither. We fix that.    | One dashboard. Every student. Every dollar.     |

#### Studios → Landing: /for/studios

| ID       | Image Text                                                                       | Primary Text                                                                                                  | Headline                                        |
| -------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| studio-1 | Chasing failed payments and cancellations by hand every month?                   | Failed payments and cancellations eat hours every month. Automate the busywork.                               | Automate the membership grind.                  |
| studio-2 | Members in your booking app, payments in Stripe, and the truth in a spreadsheet? | Your booking app, Stripe, and spreadsheets never agree. We connect them into one system.                      | One system for bookings, payments, and members. |
| studio-3 | Your front desk spends hours on renewals, freezes and refunds?                   | Renewals, freezes, refunds — your front desk does them by hand. We build the tool that does it automatically. | Free your front desk from spreadsheet hell.     |

## UTM Links

Pattern: `koostory.net/{segment}?utm_source=meta&utm_campaign=round1&utm_content={ad-id}`

```
koostory.net/for/agencies?utm_source=meta&utm_campaign=round1&utm_content=agency-1
koostory.net/for/agencies?utm_source=meta&utm_campaign=round1&utm_content=agency-2
koostory.net/for/agencies?utm_source=meta&utm_campaign=round1&utm_content=agency-3
koostory.net/for/education?utm_source=meta&utm_campaign=round1&utm_content=edu-1
koostory.net/for/education?utm_source=meta&utm_campaign=round1&utm_content=edu-2
koostory.net/for/education?utm_source=meta&utm_campaign=round1&utm_content=edu-3
koostory.net/for/studios?utm_source=meta&utm_campaign=round1&utm_content=studio-1
koostory.net/for/studios?utm_source=meta&utm_campaign=round1&utm_content=studio-2
koostory.net/for/studios?utm_source=meta&utm_campaign=round1&utm_content=studio-3
```

## Naming Convention

- **Campaign:** `koostory-round1-message-test`
- **Ad sets:** `r1-{segment}-{number}` e.g. `r1-agency-1`, `r1-edu-2`, `r1-studio-3`
- **Ads:** Same as ad set name

## Stop Rules

- Per ad: stop after ~$10–15 spent OR ~1,000 impressions
- Compare: CTR (link click-through rate) and CPC
- Winner must be clearly ahead; small differences at $10–15 spend can be noise

## After Round 1

- **Round 1b (week 2):** 4–5 new variations for the winning segment, $50–75
- **Round 2 (weeks 3–4):** Offer test with landing page + booking, $200–400
