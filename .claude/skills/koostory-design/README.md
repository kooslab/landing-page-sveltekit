# KooStory Design System

> Editorial dark register. Indigo hero, white body, teal closer. Quiet warmth in the typography.

---

## Who this is for

**KooStory by Kooslab** is a Berlin-based consultancy helping European B2B companies actually adopt AI — through hands-on training workshops and custom software development. The audience is SME CEOs and operators who need their teams *using* AI, not just having access to it.

- **Tagline:** Scale or Fade.
- **Voice:** Direct, honest, no hype. Professional but human.
- **Surface area:** Marketing site, proposal/workshop decks, case studies, training material.

---

## Index — what's in this folder

| File / folder | What it is |
|---|---|
| `README.md` | You're here. Brand context, content + visual fundamentals, iconography. |
| `SKILL.md` | Agent-Skill manifest. Download this folder as a Claude Code skill. |
| `colors_and_type.css` | All CSS variables: color tokens, typography tokens, semantic element styles. Drop into any page. |
| `assets/` | Logos, marks, illustrations, sample imagery. |
| `preview/` | Tiny HTML cards demonstrating each token group. These are what populate the Design System tab. |
| `ui_kits/website/` | Marketing-website UI kit — components + an interactive `index.html`. |
| `slides/` | 1920×1080 workshop / proposal deck template — 8 slide types. |

---

## Sources

This system was built against the brief and a `DESIGN.md` spec the user supplied (Superhumon design language). The user also pointed at:

- **Shopify/polaris-react** — https://github.com/Shopify/polaris-react — used only as a *structural* reference for how to organize tokens, not for visual styling.

---

## CONTENT FUNDAMENTALS

### Voice in one line
> A senior consultant who's seen the inside of fifty AI rollouts and won't waste your time.

### Tone rules

- **Direct.** Lead with the claim. No "We believe…" intros. Bad: *We believe AI is transforming business.* Good: *Most AI rollouts stall in week three. Here's why.*
- **Honest.** Name the trade-off, the limitation, the awkward truth.
- **Specific over impressive.** Numbers, names, time-frames, verbs. Bad: *enterprise-grade.* Good: *Used by 40-person ops teams.*
- **Professional but human.** Contractions OK. Light dry humor OK. Exclamation marks not OK. Emoji not OK.
- **No hype words.** Banned: *revolutionize, unleash, supercharge, game-changer, cutting-edge, leverage* (verb), *empower, seamless, transform, journey, solutions* (name the actual thing).

### Casing

- **Headlines:** Sentence case. *The hard part isn't the model. It's the meeting after.*
- **Buttons / nav:** Sentence case. *Book a workshop.*
- **Section labels / eyebrows:** UPPERCASE, +0.08em tracking, used sparingly.
- **Proper nouns:** As written — *KooStory*, *Kooslab*.

### Pronouns
- Address the reader as **you**. Speak as **we** (KooStory the team, not the industry).

### Punctuation
- Em-dashes welcome — like this. Oxford comma. Smart quotes.
- Sentence fragments are fine. Short beats long.

### Tagline mechanics
**Scale or Fade.** is a closer, not a hero. Sits below the fold or in the teal CTA band at the end. Display weight, in `--on-primary` over the teal. Never with "today." Never with an exclamation.

---

## VISUAL FOUNDATIONS

### The vibe
Editorial dark register × considered, slow-tempo typography × a single chromatic resolution at the bottom of every page. Indigo, white, and teal — three canvases, no fourth.

### The three-canvas system

KooStory marketing pages always cycle through **three surfaces** in this order:

1. **Indigo navy hero** (`--primary` `#1B1938`) — top of every page. Headline in white. Pale-violet pill CTA. Atmospheric violet-sky backdrop with a half-bleed portrait subject (a person looking off-frame, photographed at twilight).
2. **White body** (`--canvas` `#FFFFFF`) — everything between hero and closer. Feature rows alternate between white and barely-warm `--canvas-soft` (`#FAFAF8`). Pricing, case studies, principles live here.
3. **Deep-teal closing band** (`--surface-teal-deep` `#0E3030`) — every page ends here. One headline, one white-pill CTA, lots of vertical air (96–128px).

> **Don't break the rhythm.** Adding a fourth canvas color breaks the system.

### Color

- **Primary / Indigo Navy** `#1B1938` — hero canvas, primary CTA, featured pricing tier
- **Primary Deep** `#0E0C1F` — pressed state and gradient deeper stops
- **Surface Violet Soft** `#C9B4FA` — hero pill button fill, atmospheric accents
- **Surface Teal Deep** `#0E3030` — signature closing-CTA band
- **Surface Teal Mid** `#155555` — nested chrome inside the teal band
- **Canvas** `#FFFFFF` — default body background
- **Canvas Soft** `#FAFAF8` — alternating feature rows
- **Hairline** `#E8E4DD` — 1px borders on light surfaces
- **Hairline Dark** `#3F3A52` — 1px borders on dark surfaces
- **Ink** `#292827` — warm dark grey body text. **Never pure black.** This is the brand's quiet warmth.
- **Ink Mute** `#73706D` — secondary text, captions
- **Ink Faint** `#9A9794` — tertiary, disabled
- **On Primary** `#FFFFFF` — text on dark navy / teal
- **On Dark Mute** `rgba(255,255,255,.72)` — secondary on dark
- **On Dark Faint** `rgba(255,255,255,.50)` — tertiary on dark

### Typography

**Inter Variable** stands in for the proprietary **Super Sans VF**. The brand's typographic signature is picking **sub-default weights** — 460, 540, 600 — accessed through Inter's variable-weight axis. This is the warmth.

| Token | Size | Weight | Line-height | Tracking | Use |
|---|---|---|---|---|---|
| display-xxl | 64px | 540 | 0.96 | 0 | Hero headline |
| display-xl | 48px | 460 | 0.96 | -1.32px | Section opener on light |
| display-lg | 28px | 540 | 1.14 | -0.63px | Feature title |
| display-md | 22px | 460 | 1.10 | -0.315px | Card title |
| heading-lg | 20px | 460 | 1.20 | -0.40px | Compact card title |
| body-lg | 18px | 540 | 1.50 | -0.135px | Marketing lead |
| body-md | 16px | 460 | 1.50 | 0 | Default UI body |
| body-strong | 18.72px | 700 | 1.50 | 0 | Emphasized body |
| button-md | 16px | 700 | 1.0 | 0 | Rounded-rectangle CTA label |
| button-cap | 14px | 600 | 1.0 | 0 | Compact button label |
| caption | 14px | 460 | 1.40 | 0 | Helper, footnote |
| micro | 12px | 540 | 1.40 | 0 | Pill label, fine print |

**Principles:**
- **Sub-default weights** (460 / 540 / 600) — never the default 400 / 500 / 700 ladder. The in-between weights are the brand.
- **Tight display leading.** 0.96 at 48–64px — vertical compression *is* the brand.
- **Negative tracking** on display sizes — letters knit together at scale.
- **Ink is warm grey `#292827`, never pure black.**

### Spacing

8px base with 2/4/12 fine subtokens. `xxs 2 · xs 4 · sm 8 · md 12 · lg 16 · xl 24 · xxl 32 · huge 64 · mega 96 · giga 128`. Section gaps 64–96px; the teal closing band gets 96–128px of vertical air.

### Border radii

- `xs 4px` — hairline tags
- `sm 6px` — form inputs
- `md 8px` — buttons (the signature rectangle, **not a pill**)
- `lg 12px` — pricing cards, feature cards
- `xl 16px` — modals, large feature cards
- `full 9999px` — pills (hero CTA only; **never on body**)

### Elevation

- **0 — Flat** — default surface
- **1 — `0 1px 3px rgba(0,0,0,.08)`** — subtle card lift
- **2 — `0 8px 24px rgba(0,0,0,.12)`** — floating panels, modals
- **3 — atmospheric backdrop** — the hero's violet-sky radial wash is the page's deepest depth medium. Below the hero, depth stays minimal.

### Backgrounds

- **Hero only:** indigo navy with a violet-sky atmospheric backdrop and a half-bleed portrait subject (right half).
- **Body:** flat white. Alternating rows in `--canvas-soft`.
- **Closing band:** flat deep teal. No gradient.
- **No gradients in body. No mesh gradients. No blurred orbs.**

### Hover & press

- **Primary CTA (rounded rectangle):** background shifts to `--primary-deep` on press.
- **Hero pill CTA:** background darkens slightly. No lift.
- **Text link:** color shifts from `--ink` to `--primary`.
- **Press:** `transform: translateY(1px)`.
- **Focus:** 2px outline in `--primary` at `outline-offset: 3px`.

### Animation

- **Default easing:** `cubic-bezier(0.2, 0, 0, 1)`.
- **Durations:** 120ms state, 240ms layout, 400ms entrance.
- **No bounce.** Fades and slight upward translates (4–8px).
- Reduce-motion respected.

### Imagery

Photography is the brand's recurring visual: **half-bleed portrait subjects** — a person photographed at twilight, looking off-frame, occupying the right half of the indigo hero. Other photography is rare; product UI mockups handle illustrative needs elsewhere.

Until real portraits are commissioned, use a portrait-style image slot in the hero with a violet-sky placeholder backdrop. Don't replace the portrait with vector illustration — the brand specifically uses photo.

---

## ICONOGRAPHY

KooStory uses **Lucide** (https://lucide.dev) for all UI icons.

- **Stroke:** 1.5. Never adjust.
- **Color:** `currentColor`.
- **Size:** 16px dense UI, 18–20px paired with body, 24px+ for features.
- **Pairing:** 8px before text, vertically centered to cap height.
- **Never** emoji in product surfaces.
- `·` (middle dot) is the divider of choice. `→` ASCII arrows in editorial copy only; use Lucide for buttons.

CDN:
```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="arrow-right"></i>
<script>lucide.createIcons();</script>
```

### Logos & marks

- `assets/koostory-wordmark.svg` — full wordmark, default
- `assets/koostory-wordmark-inverse.svg` — for dark / indigo surfaces
- `assets/koostory-mark.svg` — square mark, for favicons and avatars
- `assets/illustration-*.svg` — placeholder line illustrations (not the brand's primary visual; portraits are)
