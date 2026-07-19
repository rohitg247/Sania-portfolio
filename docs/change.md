# Changelog

---

## 2026-07-13

### Created
- `src/utils/email.js` — shared EmailJS send helper (`sendPortfolioEmail`)
- `.env` — gitignored, seeded with placeholder EmailJS credentials
- `.env.example` — committed placeholder for env var documentation
- `src/assets/unused/` — relocation folder for retired assets (gitignored)
- `docs/handoff.md` — session handoff log (this file's companion)
- `docs/change.md` — this file
- `docs/plan.md` — live plan tracking
- `docs/future-scope.md` — out-of-scope items for future sessions
- `CLAUDE.md` — project rules and session handoff protocol

### Modified
- `src/components/Navbar.jsx` — wordmark-only logo; removed RG monogram `<img>` and `logo` import
- `src/assets/index.js` — removed `logo` import/export; added `myResume` import/export from `My Resume.pdf`; removed stale commented import lines
- `src/constants/index.js` — replaced tutorial experiences with real entries (Kosqu Technolab + Nancens Enterprises); removed unused `coverhunt`/`dcc`/`kelhel`/`microverse` imports
- `src/components/Experience.jsx` — icon fallback badge for entries without a logo; resume button now downloads file + fires notification email
- `src/components/Contact.jsx` — switched to `sendPortfolioEmail` helper; env-var creds; corrected recipient to `rohitg247@gmail.com`; added GitHub + LinkedIn social links below form
- `src/components/Hero.jsx` — updated tagline: "fresh Web Developer" → "Full Stack Developer...scalable web apps...actionable insights"
- `src/components/About.jsx` — rewritten bio: Full Stack Dev + Data Analyst identity, mentions Python/Node.js/React/Power BI
- `.gitignore` — added `dist`, `.env`, `.env.local`, `src/assets/unused`
- `public/logo.png` — replaced blank white image with RG monogram from `src/assets/logo/logo-black.png`

### Moved (to src/assets/unused/)
- `src/assets/logo/logo-text-black.png` — old "shaq" template wordmark, superseded by `Rohit-logo.png`
- `src/assets/logo/logo-black1.png` — unused backup monogram
- `src/assets/logo/logo-black_New.png` — untracked swoosh mark
- `src/assets/personal/rohitresume.pdf` — old resume, superseded by `My Resume.pdf`

### Dependency changes (completed)
- React 18.2 → 19.2.7, react-dom 18.2 → 19.2.7
- @react-three/fiber 8 → 9.6.1, @react-three/drei 9 → 10.7.7, three 0.152 → 0.185.1
- Vite 4 → 8.1.5 (rolldown bundler), @vitejs/plugin-react 4 → 6.0.3
- Tailwind CSS 3 → 4.3.2 (CSS-native `@theme` in `src/index.css`, `@tailwindcss/vite` plugin)
- ESLint 8 → 10.7.0 (flat config), framer-motion 10 → 12.42.2
- react-router-dom 6 → 7.18.1, react-vertical-timeline-component 3 → 4.0.0, @emailjs/browser 3 → 4.4.1
- Removed: `react-tilt` (unused, last published 2023), `maath` (unused)
- Deleted: `tailwind.config.cjs`, `postcss.config.js`, `.eslintrc.cjs`, `autoprefixer`, `postcss`
- Created: `eslint.config.js` (flat config)

---

## 2026-07-19

### Fixed
- `src/index.css` — **critical Tailwind v4 layout fix.** Wrapped the universal reset `* { margin: 0; padding: 0 }` in `@layer base`. In v4 all utilities live in `@layer utilities`, and unlayered CSS beats any layer regardless of specificity — so the bare `*` reset was overriding EVERY margin/padding utility site-wide (Hero content not centered/padded, hero image stuck on the left instead of right, etc.). Moving it into `@layer base` lets utilities win again. Verified via headless-browser computed-style inspection: Hero container `mx-auto`/`sm:px-16` and image `ml-[50vw]` now apply correctly.
- `src/components/About.jsx` — escaped apostrophes/dash as HTML entities (`&apos;`, `&mdash;`) to clear `react/no-unescaped-entities` lint errors.

### Deployment caveat discovered
- Vite 8 uses the `rolldown` bundler, whose platform-specific native binary (`@rolldown/binding-win32-x64-msvc` on Windows) is an npm optional dependency. npm's long-standing optional-dep bug (npm/cli#4828) drops it whenever `node_modules` is mutated (install/uninstall), causing `npm run build` to fail with "Cannot find native binding." Fix: `npm install @rolldown/binding-<platform> --no-save`, or clear `node_modules` + `package-lock.json` and reinstall. Flag for Netlify: a clean CI install usually pulls the correct Linux binary, but if the build fails there, this is why.

---

## 2026-07-19 — Full revamp to Sania Ansari's portfolio (Vite → Next.js 14)

> Everything below replaces Rohit Gupta's portfolio. Entries above are historical.

### Deleted
- `src/` (entire old Vite React app), `dist/`, `public/` (old assets)
- `index.html`, `vite.config.js`, `eslint.config.js` — Vite toolchain
- `package.json`, `package-lock.json` — replaced with Next.js dependency set
- `.env.example` — obsolete EmailJS placeholders
- Old `CLAUDE.md`, `README.md`

### Created — config
- `package.json` — Next 14.2.35, React 18, Tailwind v3, R3F v8, drei v9, framer-motion, next-themes
- `next.config.mjs` — strict mode, `transpilePackages: ['three']`
- `tailwind.config.js` — class dark mode, HSL token colours, float/shimmer/blink keyframes
- `postcss.config.js`, `jsconfig.json` (`@/*` alias), `.eslintrc.json`
- `netlify.toml` — `@netlify/plugin-nextjs` runtime; `.nvmrc` — Node 20
- `.gitignore` — rewritten for Next.js

### Created — app shell
- `src/app/layout.jsx` — fonts, metadata, viewport theme-colour, ThemeProvider, `<noscript>` opacity override
- `src/app/page.jsx` — section composition
- `src/app/globals.css` — light/dark tokens, `.gradient-primary`, `.text-gradient`, `.glass-card`, `.glow-hover`, `.mesh-gradient`, reduced-motion rules
- `src/app/icon.svg` — favicon (was 404)

### Created — content & infrastructure
- `src/lib/constants.js` — all site content, transcribed from the resume PDF
- `src/lib/utils.js` — `cn()`
- `src/hooks/use-media-query.js` — SSR-safe matchMedia + desktop/pointer/reduced-motion helpers
- `src/components/theme-provider.jsx`, `theme-toggle.jsx`, `custom-cursor.jsx`, `section-wrapper.jsx`, `navbar.jsx`, `footer.jsx`
- `src/components/ui/` — `button.jsx`, `card.jsx`, `input.jsx`, `textarea.jsx`, `label.jsx`

### Created — sections
- `src/components/sections/` — `hero.jsx`, `about.jsx`, `skills.jsx`, `experience.jsx`, `projects.jsx`, `education.jsx`, `contact.jsx`

### Created — 3D
- `src/components/canvas/ball-canvas.jsx` — R3F Canvas, icosahedron + Decal, Float, OrbitControls
- `src/components/canvas/skill-ball.jsx` — dynamic `ssr:false` wrapper, glow ring, fallback tile
- `src/components/canvas/ball-boundary.jsx` — per-ball error boundary

### Created — assets
- `public/icons/*.svg` — 12 self-authored transparent lettermark skill icons
- `public/profile-placeholder.svg` — gradient avatar stand-in
- `public/Sania_Ansari_Resume.pdf` — copied from `docs/Letters/Sania_Ansari_Resume_Designed.pdf`

### Rewritten
- `CLAUDE.md` — Sania's project context, version pins, 3D gotchas; Session Handoff Protocol preserved verbatim
- `README.md` — setup, structure, deployment
