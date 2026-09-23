# Content Integration Guide

A brief reference for adding and updating content on this portfolio site, especially when working with an AI coding assistant.

## Project Overview

- **Stack:** React 18, TypeScript, Vite, Tailwind CSS, React Router, Framer Motion, PixiJS (for mini-games)
- **Routing:** Client-side routing via `react-router-dom` in `src/components/App.tsx`
- **Theme:** Manual light/dark mode toggle. Default is dark. Tailwind `dark:` classes are used throughout.

## Where Content Lives

| Content Type | Location | Notes |
|--------------|----------|-------|
| Site pages | `src/pages/*.tsx` | Home, Projects, Tutorials, MiniGames |
| Layout shell | `src/layouts/MainLayout.tsx` | Navbar, footer, page background gradient |
| Reusable UI | `src/components/*.tsx` | Theme toggle, future cards, badges, etc. |
| Game content | `src/games/*.tsx` | PixiJS-based interactive games |
| Static data | Inline or `src/data/*.ts` | Recommended for project lists, tutorial metadata, game configs |
| Theme logic | `src/hooks/useTheme.ts` | Dark/light mode state and persistence |
| Global styles | `src/index.css`, `tailwind.config.mjs` | Tailwind config, custom base styles |

## Adding a New Page

1. Create a new file in `src/pages/`, e.g. `src/pages/About.tsx`.
2. Use the existing pages as a template for layout, spacing, and Tailwind classes.
3. Add the route in `src/components/App.tsx`:

   ```tsx
   import About from 'pages/About'
   // ...
   <Route path="about" element={<About />} />
   ```

4. Add a nav link in `src/layouts/MainLayout.tsx` if it should appear in the header.

## Adding Content to Existing Pages

- **Projects:** Replace the placeholder map in `src/pages/Projects.tsx` with real project data. Consider extracting it to `src/data/projects.ts`.
- **Tutorials:** Replace the hardcoded tutorial cards in `src/pages/Tutorials.tsx` with mapped data.
- **Home hero:** Update the heading, subtitle, and featured cards in `src/pages/Home.tsx`.
- **Mini-games:** Add new games as components in `src/games/` and register a selector tab in `src/pages/MiniGames.tsx`.

## Working with Data Files

For any list-based content (projects, tutorials, posts, skills), create a typed data file:

```ts
// src/data/projects.ts
export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  link?: string
}

export const projects: Project[] = [
  {
    id: 'my-project',
    title: 'My Project',
    description: '...',
    tags: ['React', 'TypeScript'],
    link: 'https://example.com'
  }
]
```

Then import and map over it in the page component. This keeps content separate from presentation and makes future edits easier.

## Styling and Theme Notes

- The background gradient is generated in `src/utils/gradients.ts` and automatically inverts for light mode.
- Use Tailwind `dark:` variants for any color that should change between modes (see existing components for examples).
- Avoid hardcoding dark colors in game components unless intentional — games currently use fixed PixiJS colors.
- The theme toggle is in the top-right of the navbar via `src/components/ThemeToggle.tsx`.

## AI Assistance Tips

When asking an AI to add or update content, provide:

1. **The exact file or page** you want changed (e.g., "Update `src/pages/Projects.tsx`").
2. **The content to integrate**, preferably in final form.
3. **Where it should go** (e.g., "Replace the placeholder project cards").
4. **Any styling preferences** (e.g., "Keep the existing card style" or "Use a list layout").
5. **Whether it should be responsive** or support dark mode.

Example prompt:

> Update `src/pages/Projects.tsx` to display my projects. Extract the data into `src/data/projects.ts`. Use the existing card style and keep dark-mode support. Here is the project list: [paste data].

## Verification Checklist

After content changes, run:

```bash
npm run lint
npm run typecheck
npm run build
npm test -- --run
```

Fix any errors before committing. The build must pass and all tests should be green.

## Quick Reference Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Run tests | `npm test -- --run` |
| Type check | `npm run typecheck` |
| Lint | `npm run lint` |
| Auto-fix lint issues | `npm run lint -- --fix` |
