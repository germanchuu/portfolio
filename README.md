## Portfolio – Germán Daniel Sánchez Lanza

Personal portfolio focused on **Fullstack** and **Game Development**, built with a sci‑fi / terminal aesthetic, subtle animations, and a strong emphasis on typography and micro‑interactions.

### Tech stack

- **Astro 5**: hybrid rendering (islands) for maximum performance.
- **Tailwind CSS v4**: design system defined via tokens in `theme.css`.
- **React**: interactive islands such as the projects inventory.
- **Lucide Icons**: lightweight, consistent icon set.

### Project architecture

- **Global layout**  
  - `layouts/Layout.astro`: defines `<html>`, `<body>`, navbar, and `<main>`.
  - `sections/NavBar.astro`: fixed header with primary navigation.

- **Hero**  
  - `sections/hero/Hero.astro`: main hero section with:
    - Animated background (`hero-grid-pattern`, `hero-scanlines`, `hero-scanline-traveler`).
    - Title with typing effect and blinking caret using client-side JS.
    - GitHub and LinkedIn call‑to‑action buttons.

- **Projects**  
  - `sections/projects/Projects.astro`: projects section featuring:
    - Author showcase card.
    - **Game-like inventory grid** implemented as a React island.
  - `sections/projects/components/Inventory/InventoryGrid.tsx`: configurable `cols × rows` grid with slots and overlays for items.

- **Styling and theme**  
  - `styles/theme.css`: design tokens (`--color-*`, `--space-*`, `--radius-*`, etc.).
  - `styles/global.css`: Tailwind import, local fonts, and base layout (`body`, `.container`).
  - `tailwind.config.ts`: maps CSS variables to Tailwind utilities (`bg-background`, `text-primary`, `max-w-container`, etc.).

### Development scripts

All commands are run from the project root:

- **Install dependencies**
  - `npm install`
- **Development**
  - `npm run dev` — dev server at `http://localhost:4321`
- **Production build**
  - `npm run build`
- **Production preview**
  - `npm run preview`

### Conventions & design

- **Tokens first**: any new color/spacing/typography should start in `theme.css` and be exposed through Tailwind when needed.
- **Section‑based components**: each major page block lives in `src/sections/...` and delegates to smaller `components` when appropriate.
- **Targeted interactivity**: React is only used where it adds real value (inventory, future widgets), keeping the rest in Astro for minimal bundle size and faster loads.

### Next steps (ideas)

- Add real project cards into the inventory (with metadata and states).
- Integrate additional motion via `tailwindcss-motion`.
- Light internationalization (EN/ES) for main content.

