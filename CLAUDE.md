# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit landing page for KoosLab with internationalization support (English and Korean). The project uses TypeScript, Tailwind CSS, and Supabase for backend services.

## Essential Commands

```bash
# Development
npm run dev          # Start dev server on http://localhost:5173

# Build & Preview
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run check        # Type check with svelte-check
npm run lint         # Run ESLint and Prettier checks
npm run format       # Auto-format code with Prettier
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
