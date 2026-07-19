# Session Handoff Log

---

## 2026-07-13 — Portfolio Refresh Session 1 & 2

### What was accomplished

All content/branding changes are complete:

1. **Navbar** — switched to wordmark-only logo (`Rohit-logo.png`), removed RG monogram icon
2. **Favicon** — replaced blank white `public/logo.png` with the RG monogram (`logo-black.png`)
3. **Work Experience** — synced from `My Resume.pdf`: Kosqu Technolab (Feb 2024–Apr 2025) + Nancens Enterprises intern (Jul 2022–Jan 2023); icon fallback badge shows first letter when no company logo exists
4. **Resume button** — now triggers real file download of `My Resume.pdf`; fires background EmailJS notification to `rohitg247@gmail.com`
5. **Email helper** — `src/utils/email.js` shared helper used by both Contact and Experience
6. **Contact form** — EmailJS creds moved to env vars; recipient corrected to `rohitg247@gmail.com`; GitHub + LinkedIn social links added below the form
7. **Hero tagline** — updated from "fresh Web Developer" to "Full Stack Developer...scalable web apps...actionable insights"
8. **About bio** — rewritten to reflect Full Stack Dev + Data Analyst identity
9. **Asset cleanup** — `src/assets/unused/` folder created (gitignored), unused logo/resume files relocated there
10. **`.env` / `.env.example`** — created; `.gitignore` updated

### Dependency upgrade status

**Complete** — all packages upgraded, build passes, dev server running.

Completed prior to this handoff:
- All content changes above
- `npm run build` passed cleanly (46.34s)
- `npm run lint` showed 61 pre-existing errors (none introduced by our changes)

### Decisions made

- EmailJS retained as email mechanism (NOT Actis SMTP relay — employer infrastructure)
- `public/logo.png` replaced with RG monogram (better at favicon size vs. thin wordmark)
- `react-tilt` and `maath` removed (confirmed zero usage in src/)
- React pinned at `19.2.7` (not `^19`) due to `@react-three/fiber@9` constraint `react >=19 <19.3`

### Session 2 accomplishments (2026-07-18)

- CLAUDE.md created with session handoff protocol
- docs/ folder created (handoff.md, change.md, plan.md, future-scope.md)
- Full dependency upgrade completed:
  - React 18.2 → 19.2.7, r3f 8 → 9.6.1, drei 9 → 10.7.7, three 0.152 → 0.185.1
  - Vite 4 → 8.1.5 (now uses rolldown bundler — 1.99s vs 46s build)
  - Tailwind v3 → v4 (CSS-native @theme config, @tailwindcss/vite plugin)
  - ESLint 8 → 10, flat config (eslint.config.js replaces .eslintrc.cjs)
  - framer-motion 10 → 12.42.2, react-router-dom 6 → 7.18.1, @emailjs/browser 3 → 4.4.1
  - Removed react-tilt and maath (confirmed unused)
- Build: ✅ passes (1.99s)
- Lint: 44 errors, 9 warnings — all pre-existing except 3 apostrophe escapes fixed in About.jsx

### Session 3 accomplishments (2026-07-19)

- **Diagnosed & fixed a critical Tailwind v4 layout regression.** After the upgrade the Hero (and all sections) had broken margins/padding — content flush-left, hero image on the wrong side. Root cause: the universal reset `* { margin: 0; padding: 0 }` in `src/index.css` was unlayered, and in Tailwind v4 unlayered CSS beats `@layer utilities` regardless of specificity, so it nuked every margin/padding utility. Fix: wrapped the reset in `@layer base`. Confirmed via headless-browser computed-style inspection + screenshots; user confirmed visually.
- Escaped apostrophes in About.jsx (lint cleanup).
- Rebuilt clean, verified Hero + Tech + Experience render correctly.

### Known deployment risk (Netlify)

Vite 8's `rolldown` bundler needs a platform-native binary installed as an npm optional dependency. npm bug npm/cli#4828 keeps dropping it on `node_modules` mutations locally (fixed each time with `npm install @rolldown/binding-win32-x64-msvc --no-save`). On Netlify's clean Linux install it should pull the right binary automatically, but if the deploy build fails with "Cannot find native binding," that's the cause — see docs/change.md 2026-07-19 entry.

### Next session starting point

1. Watch the first Netlify deploy for the rolldown binding issue above.
2. Complete EmailJS setup (user action — see plan.md) and replace `.env` values.
3. Optional: full manual visual sweep of Experience/Contact by scrolling (whileInView sections).

### Blocked on (user action needed)

Rohit must set up his own EmailJS account at `dashboard.emailjs.com` and replace `.env` values. Current values are likely dead tutorial boilerplate. Steps in `docs/plan.md`.
