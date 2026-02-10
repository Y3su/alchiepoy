# Alchiepoy Real Estate

Alchiepoy is a modern real estate website for showcasing properties, helping users search listings, browse categories, and contact the team.

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
├── public/                  # Static public assets (favicon, robots.txt)
├── src/
│   ├── assets/              # Images and static assets (imported as ES6 modules)
│   │   ├── logo.png         # Official brand logo
│   │   ├── hero-bg.jpg      # Hero section background
│   │   ├── about-1.jpg      # About/mission section images
│   │   ├── about-2.jpg
│   │   ├── about-3.jpg
│   │   ├── house-lot.jpg    # Property category card images
│   │   ├── condominium.jpg
│   │   └── farm-lot.jpg
│   ├── components/
│   │   ├── home/            # Home page sections (rendered in order)
│   │   │   ├── Preloader.tsx     # Animated splash screen on initial load
│   │   │   ├── Hero.tsx          # Hero banner with search bar
│   │   │   ├── FindProperties.tsx # Property category cards
│   │   │   ├── DedicatedSection.tsx # About/mission section
│   │   │   └── GetInTouch.tsx    # Contact form + info
│   │   ├── layout/          # Shared layout components
│   │   │   ├── Navbar.tsx        # Sticky blurred navigation bar
│   │   │   └── Footer.tsx        # Site footer with links & socials
│   │   └── ui/              # Reusable UI primitives (shadcn/ui)
│   ├── hooks/               # Custom React hooks (e.g., use-mobile)
│   ├── lib/                 # Utility functions (cn helper, etc.)
│   ├── pages/               # Route-level page components
│   │   ├── Index.tsx             # Home page (assembles all home sections)
│   │   └── NotFound.tsx          # 404 page
│   ├── test/                # Test setup and test files
│   ├── index.css            # Global styles + design tokens (CSS variables)
│   ├── App.tsx              # Router setup and app shell
│   └── main.tsx             # App entry point
├── tailwind.config.ts       # Tailwind theme, custom colors, and animations
├── vite.config.ts           # Vite bundler configuration
└── vitest.config.ts         # Test runner configuration
```

### Quick Reference

| Task | Where to look |
|------|---------------|
| Change hero image | Replace `src/assets/hero-bg.jpg` |
| Edit navbar links | `src/components/layout/Navbar.tsx` → `navLinks` array |
| Edit property categories | `src/components/home/FindProperties.tsx` |
| Change preloader timing | `src/components/home/Preloader.tsx` → timing constants at top |
| Edit buttons/inputs | `src/components/ui/` (shadcn components) |
| Change brand colors | `src/index.css` → `:root` CSS variables |
| Change fonts / typography | `src/index.css` + `index.html` (Google Fonts link) |
| Add a new page | Create in `src/pages/`, add route in `src/App.tsx` |
| Add a new home section | Create in `src/components/home/`, import in `src/pages/Index.tsx` |

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
