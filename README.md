# AlchiepoY Real Estate

AlchiepoY is a modern real estate website for showcasing properties, helping users search listings, browse categories, and contact the team.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm or [bun](https://bun.sh/)

### Installation

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Project Structure

```
src/
├── assets/              # Images, logo, and static assets
│   ├── logo.png         # Official brand logo
│   └── hero-bg.jpg      # Hero section background
├── components/
│   ├── home/            # Home page sections
│   │   ├── Hero.tsx         # Hero banner + search bar
│   │   ├── Preloader.tsx    # Splash screen on initial load
│   │   ├── FindProperties.tsx  # Property category cards
│   │   ├── DedicatedSection.tsx # About/mission section
│   │   └── GetInTouch.tsx   # Contact form + info
│   ├── layout/          # Shared layout components
│   │   ├── Navbar.tsx       # Sticky navigation bar
│   │   └── Footer.tsx       # Site footer
│   └── ui/              # Reusable UI primitives (shadcn)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions (cn, helpers)
├── pages/               # Route-level page components
│   ├── Index.tsx            # Home page
│   └── NotFound.tsx         # 404 page
├── index.css            # Global styles + design tokens (CSS variables)
└── main.tsx             # App entry point

tailwind.config.ts       # Tailwind theme + custom colors
```

### Quick Reference

| Task | Location |
|------|----------|
| Change hero image | Replace `src/assets/hero-bg.jpg` |
| Edit navbar links | `src/components/layout/Navbar.tsx` → `navLinks` array |
| Edit buttons/inputs | `src/components/ui/` |
| Change brand colors | `src/index.css` → `:root` CSS variables |
| Add a new page | Create in `src/pages/`, add route in `src/App.tsx` |

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (bundler)
- **Tailwind CSS** + **shadcn/ui**
- **React Router** (routing)

## Contribution Guidelines

- **Components**: Keep them small and single-responsibility. Place page-specific sections in `components/home/` (or `components/<page>/`), shared layout in `components/layout/`.
- **Colors**: Never hardcode colors in components. Use semantic tokens from `index.css` (e.g., `text-foreground`, `bg-primary`, `text-muted-foreground`).
- **Naming**: Use PascalCase for components, camelCase for utilities/hooks.
- **New pages**: Create the page in `src/pages/`, add a `<Route>` in `src/App.tsx` above the catch-all `*` route.
- **Styling**: Use Tailwind utility classes. For new design tokens, add CSS variables in `index.css` and register them in `tailwind.config.ts`.

## License

© Alchiepoy Real Estate. All rights reserved.
