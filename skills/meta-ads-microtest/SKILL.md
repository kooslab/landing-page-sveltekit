---
name: meta-ads-microtest
description: Manage Meta (Facebook/Instagram) ad microtests for Koostory agency using the Meta ads MCP server. Use when the user wants to create, launch, monitor, or analyze Meta ad campaigns for lead generation testing. Triggers include 'meta ads', 'microtest', 'ad campaign', 'round 1', 'launch ads', 'ad results', 'CTR', 'CPC', 'ad budget', 'ad copy', 'kill ad', 'pause ad', 'winning segment', or any reference to the microtest plan in docs/marketing-micro-test.md. Also use when the user asks about Meta Pixel setup, UTM tracking, or landing page creation for ad campaigns.
---

# Meta Ads Microtest

Run small-budget Meta ad microtests for Koostory agency to validate market segments and messages before scaling. Uses the Meta ads MCP server (`https://mcp.facebook.com/ads`) for all campaign operations.

## Prerequisites

Before first use, verify:

1. Meta ads MCP server is connected: `claude mcp list` should show `meta-ads`
2. If not connected: `claude mcp add --transport http meta-ads https://mcp.facebook.com/ads`
3. Authenticated: run `/mcp` → select `meta-ads` → Authenticate via browser
4. Meta Pixel installed on koostory.net (in `src/app.html`)
5. Domain `koostory.net` verified in Meta Business Suite

For MCP tool details, see [references/meta-mcp-tools.md](references/meta-mcp-tools.md).

## Workflow: Launch Round 1

Read [references/round1-ads.md](references/round1-ads.md) for full ad specs, copy, and targeting.

### Step 1: Create campaign

Create 1 campaign:

- Name: `koostory-round1-message-test`
- Objective: Traffic (link clicks)
- Status: Paused
- Special ad categories: None

### Step 2: Create 9 ad sets

For each of the 9 variants (agency-1..3, edu-1..3, studio-1..3):

- Name: `r1-{id}` (e.g. `r1-agency-1`)
- Daily budget: $3–4 USD
- Schedule: Start date = tomorrow, run 3–4 days
- Targeting: US East Coast, age 25–55, segment-specific interests (see references/round1-ads.md)
- Placements: Automatic
- Optimization: Link clicks
- 1 ad per ad set

### Step 3: Upload ad images

For each ad, generate or upload a 1080x1080 square image:

- Bold text on solid color background
- Text = the "Image Text" column from references/round1-ads.md
- No stock photos, no logos

### Step 4: Create 9 ads

For each ad set, create 1 ad:

- Name: same as ad set (e.g. `r1-agency-1`)
- Primary text, headline, image text: from references/round1-ads.md
- CTA: "Learn more"
- URL: UTM-tagged link from references/round1-ads.md
- Status: Paused

### Step 5: Review and go live

List all 9 ads for user review. Only set ads live after explicit user confirmation. Never auto-activate.

## Workflow: Monitor Results

### Pull metrics

Request ad-level reporting for the campaign with these columns:

- Ad set name, ad name
- Spend, impressions, link clicks
- CTR (link click-through rate), CPC (cost per link click)

### Evaluate

- **Stop rule:** pause any ad that has spent $10–15 or reached ~1,000 impressions
- **Compare:** rank ads by CTR (higher = better) and CPC (lower = better)
- **Winner criteria:** must be clearly ahead; small differences at this budget = noise
- Present results as a sorted table

### Decide next step

Based on results, suggest:

- Which segment won (agencies vs education vs studios)
- Which message won within that segment
- Whether to proceed to Round 1b (4–5 new variations, $50–75) or Round 2 (offer test)

## Workflow: Round 1b

Same structure as Round 1 but:

- Only the winning segment
- 4–5 new message variations
- $3–4/day per ad set, 3–4 days
- Budget: $50–75 total

## Key Rules

- **One variable at a time.** Round 1 = segments + messages. Round 2 = offer/landing page.
- **Never raise budgets mid-test.**
- **All ads paused by default.** Only activate after user says "go live."
- **Destructive actions** (deleting campaigns, changing live budgets) require explicit confirmation.
- **Currency check:** Koostory's ad account may use EUR. Verify on first use.
- Read `docs/marketing-micro-test.md` for full strategic context if the user asks about positioning, segments, or the overall plan.
