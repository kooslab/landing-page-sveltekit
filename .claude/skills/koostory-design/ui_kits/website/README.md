# KooStory Marketing Website — UI Kit

Full single-page marketing site rebuilt to the Superhumon-spec design language.

## Structure (top to bottom)

| Section | Surface | Notes |
|---|---|---|
| Nav | dark, absolute over hero | wordmark left, links center, pill CTA right |
| **Hero** | **indigo navy + violet-sky backdrop** | Display headline with violet italic accent on a single word; pale-violet pill CTA; half-bleed portrait placeholder on the right |
| What we do | canvas-soft | Two feature cards (Workshops / Build) |
| Workshops | white | Row-list with click-to-select reservation |
| Case studies | canvas-soft | Three cards |
| Quote | white | Single editorial pull-quote |
| How we work | white | Four principles in a 2×2 grid on `--canvas-soft` chips |
| **Closing** | **deep teal `#0E3030`** | Page-resolving headline + on-teal CTA. Non-negotiable. |
| Footer | white | Three link columns + tag |

## Files

| File | What it is |
|---|---|
| `index.html` | Wires all components together. Open this. |
| `site.css` | All site-specific styles. Reads tokens from `../../colors_and_type.css`. |
| `Nav.jsx`, `Hero.jsx`, `WhatWeDo.jsx`, `Workshops.jsx`, `CaseStudies.jsx`, `Quote.jsx`, `Manifesto.jsx`, `ClosingCTA.jsx`, `Footer.jsx`, `BookingModal.jsx` | Components |

## Rules carried from the design system

- One CTA per band — never two.
- Hero is the only place pill-shaped buttons appear. Body uses 8px rounded rectangles.
- Every page closes with the teal band.
- Inter at sub-default weights (460 / 540 / 600). Display sizes have tight 0.96 line-height.
- Ink is warm grey `#292827`, never pure black.

## Placeholders worth flagging

- **Hero portrait** is a gradient block. Replace with a real half-bleed portrait photo — a person looking off-frame at twilight is the brand's recurring visual.
- **Client quote attribution** and **case-study titles** are illustrative.
