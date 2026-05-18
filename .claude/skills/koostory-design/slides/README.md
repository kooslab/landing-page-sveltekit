# KooStory Slide Deck — UI Kit

Workshop / proposal deck template, 1920×1080, built on the design system tokens.

## Slide types

| # | Slide | Surface | Use |
|---|---|---|---|
| 01 | `kd-title` | indigo + violet-sky | Cover slide. Big italic-accent word in the headline. |
| 02 | `kd-content` | white | Opening or transition slide. Big headline + lede. |
| 03 | `kd-agenda` | white | Numbered list of sections with times. |
| 04 | `kd-twocol` | white | Side-by-side comparison; featured side inverts to indigo. |
| 05 | `kd-metrics` | canvas-soft | Three giant numbers with labels. Use `<em>` to highlight digits. |
| 06 | `kd-quote` | white | Editorial pull-quote with attribution. |
| 07 | `kd-principles-slide` | white | 2×2 grid of principles on soft chips. |
| 08 | `kd-closing` | **deep teal** | Page-resolving "Scale or Fade." + contact line. |

## Conventions

- **Chrome** (wordmark top-left + eyebrow top-right + footer URL/page-no.) is on every slide. Add `is-on-dark` class on `.kd-brand`, `.kd-eyebrow`, `.kd-foot` for indigo / teal slides.
- **Use `<em>` for the violet accent word** in headlines. It italicizes and recolors automatically.
- All static HTML — direct-editable. Click any headline in the user's view to retype it.
- Built on `deck-stage.js` — keyboard nav, scaling, print-to-PDF all work.

## Adding a slide

Copy the matching `<section class="kd-{type}">…</section>` from `index.html`, drop it into the new position, and update its `data-screen-label`. The page-no. in `.kd-foot` is manual — edit it when you reorder.

## Files

- `index.html` — the deck. Open this.
- `deck.css` — slide-specific styles.
- `deck-stage.js` — slide shell (scaling, navigation).
