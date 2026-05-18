# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit landing page for KooStory with internationalization support (English, Korean, and German). The project uses TypeScript, Tailwind CSS, and Supabase for backend services.

## Essential Commands

```bash
# Development
bun run dev          # Start dev server on http://localhost:5173

# Build & Preview
bun run build        # Build for production
bun run preview      # Preview production build

# Code Quality
bun run check        # Type check with svelte-check
bun run lint         # Run ESLint and Prettier checks
bun run format       # Auto-format code with Prettier
```

## Architecture Overview

### Route Structure

- `/src/routes/` - SvelteKit pages and API routes
  - `[[lang]]/` - Internationalized routes with optional language parameter
  - `api/` - Server-side API endpoints
  - `+layout.svelte` - Root layout with theme and i18n setup

### Key Components Location

- `/src/lib/components/` - Reusable Svelte components
  - `ui/` - Shadcn/ui based components
  - `sections/` - Page sections (hero, features, etc.)
  - `icons/` - SVG icon components

### Backend Integration

- **Supabase**: Authentication and database (`/src/lib/server/supabase.ts`)
- **Resend**: Email services integration
- **Tiptap**: Rich text editor for content management

### Internationalization

- Supports English and Korean
- Translation files in `/src/lib/i18n/`
- Language switching handled via route parameters

### Styling

- Tailwind CSS with custom configuration
- Theme variables in `/src/app.css`
- Dark mode support via CSS custom properties

## Important Configuration Files

- `svelte.config.js` - MDsveX for Markdown support
- `tailwind.config.ts` - Custom theme extensions
- `eslint.config.js` - Linting rules
- `.prettierrc` - Code formatting rules

## Development Notes

- No test framework is currently configured
- Git hooks via Husky run linting on pre-commit
- Deployed on Vercel (see `vercel.json`)
- Form validation uses Superforms with Zod schemas

# Design principles

- **Never use `text-muted-foreground` for body copy or readable content.** It is only for truly secondary metadata: timestamps, labels, badges, captions. Body text, descriptions, and section content must use `text-foreground` or at most `text-foreground/80`.
- **Minimum font size for body text is `text-base` (16px).** Section descriptions and prose should be `text-lg` or larger. Never use `text-sm` or smaller for content the user is meant to read.
- **High contrast is the default.** Do not gray-wash content to make it look subtle — use spacing and hierarchy instead.
- **`text-muted-foreground` allowed only for:** section eyebrow labels (e.g. "ABOUT"), form placeholders, timestamps, secondary metadata.

# programming language and framework rules

- use svelte 5 syntax all the time
- never use on:click this is old svelte way, use onclick instead
- IMPORTANT: Never use `$:` reactive statements - this is legacy Svelte syntax. Always use `$derived` for reactive values and `$effect` for reactive side effects in Svelte 5 runes mode
- In Svelte 5, we should use $derived instead of $:
- Cannot use `export let` in runes mode — use `$props()` instead
- use Drizzle for ORM
- use sveltekit best practice for navigation and asynchronous data handling

## git commit rules

- commit for every important changes, not every single change
