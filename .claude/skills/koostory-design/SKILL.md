---
name: koostory-design
description: Use this skill to generate well-branded interfaces and assets for KooStory (Berlin-based AI-adoption consultancy by Kooslab), either for production or throwaway prototypes/mocks/etc. Built to a Superhumon-spec design language. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# KooStory design skill

Read the `README.md` file within this skill, and explore the other available files:

- `colors_and_type.css` — drop-in CSS variables and semantic element styles
- `assets/` — wordmark, mark, illustrations
- `preview/` — small HTML demos of each token group
- `ui_kits/website/` — full marketing-site recreation with reusable JSX components
- `slides/` — 1920×1080 workshop / proposal deck template (8 slide types)

## When working

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and create static HTML files for the user to view. Always link `colors_and_type.css` so the design system tokens are available.

If working on production code, copy assets and read the rules in `README.md` to become an expert in designing with this brand.

If the user invokes this skill without other guidance, ask what they want to build, ask some clarifying questions, then act as an expert designer who outputs HTML artifacts _or_ production code.

## Core brand reminders (read README.md for the rest)

- **Voice:** Direct, honest, no hype. No "We believe…" intros. No emoji. No exclamation marks.
- **Tagline:** *Scale or Fade.* — the closing chord, always in the teal CTA band.
- **Three-canvas system:** Indigo navy hero (`#1B1938`) → white body (`#FFFFFF`, alternating with `#FAFAF8`) → deep-teal closing band (`#0E3030`). Don't add a fourth canvas.
- **Hero:** Half-bleed portrait subject + violet-sky atmospheric backdrop + pale-violet pill CTA (`#C9B4FA`). The pill shape is **hero only.**
- **Body buttons:** Rounded rectangle at 8px radius. Filled `--primary` indigo on white surfaces.
- **Type:** Inter Variable at sub-default weights — 460 / 540 / 600. Display sizes have tight 0.96 line-height and negative tracking.
- **Ink:** warm dark grey `#292827`. **Never pure black.**
- **Icons:** Lucide, 1.5px stroke, `currentColor`. Never emoji.
