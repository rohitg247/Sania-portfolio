# Sania Ansari — Portfolio

Personal portfolio for **Sania Ansari**, Digital Marketing Manager & Graphic Designer based in Mumbai.

Built with Next.js 14 (App Router), Tailwind CSS, Framer Motion, and React Three Fiber for the 3D skill balls. Light and dark themes, fully responsive.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm start        # serve the production build
npm run lint
```

Node 20 is expected (see `.nvmrc`).

## Structure

```
src/
  app/                 layout, page, global styles, favicon
  components/
    sections/          hero, about, skills, experience, projects, education, contact
    canvas/            3D skill balls (React Three Fiber) + per-ball error boundary
    ui/                button, card, input, textarea, label
  hooks/               media-query helpers
  lib/                 constants (all site content) + utils
public/
  icons/               12 skill-ball textures (SVG)
  Sania_Ansari_Resume.pdf
```

All site copy lives in [`src/lib/constants.js`](src/lib/constants.js) — edit content there, not in components.

## Deployment

Netlify, using `netlify.toml` and the official `@netlify/plugin-nextjs` runtime. Connect the repo and Netlify picks up the config automatically. No environment variables are required.

## Notes

- The contact form validates and shows a success state, but does not deliver mail yet.
- Social links and the profile image are placeholders.
- See [`CLAUDE.md`](CLAUDE.md) for version pins and implementation gotchas.
