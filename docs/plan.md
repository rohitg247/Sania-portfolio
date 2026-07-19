# Plan — Sania Ansari Portfolio

Last updated: 2026-07-19

> This repo was fully revamped from Rohit Gupta's portfolio (Vite + React 19) to **Sania Ansari's** portfolio (Next.js 14). The previous plan is superseded; see `docs/handoff.md` and `docs/change.md` for the history.

---

## Build — complete

- [x] Wipe the old Vite app; keep `.git/`, `docs/`, `MIT.md`
- [x] Scaffold Next.js 14 App Router (JavaScript, `src/`, `@/*` alias)
- [x] Pin React 18 / R3F v8 / drei v9 / Tailwind v3 (Next 14 constraint)
- [x] Theme tokens — HSL CSS variables, light default + dark via `next-themes`
- [x] Fonts — Plus Jakarta Sans (body) + Syne (display) via `next/font`
- [x] Content layer — `src/lib/constants.js`, transcribed from the resume PDF
- [x] Shared infra — `cn()`, media-query hooks, `SectionWrapper`/`FadeIn`, custom cursor, theme toggle
- [x] UI primitives — button, card, input, textarea, label
- [x] Assets — 12 skill icons, profile placeholder, resume PDF, favicon

### Sections
- [x] Navbar — sticky, blurred, mobile slide-in drawer
- [x] Hero — typewriter, gradient orbs, 3 CTAs
- [x] About — bio + animated language bars
- [x] Skills — 12 3D balls, 2/3/4-column responsive grid
- [x] Experience — alternating animated timeline
- [x] Projects — "Coming Soon" shimmer placeholders
- [x] Education — 4 cards
- [x] Contact — info card + validated form with animated success state
- [x] Footer

### 3D skill balls
- [x] R3F Canvas, icosahedron + Decal, Float, OrbitControls
- [x] `next/dynamic` with `ssr: false`
- [x] Mobile degradation — dpr 1, no shadows, no antialias, controls disabled
- [x] Per-ball error boundary with static fallback tile

### Deployment
- [x] `netlify.toml` + `@netlify/plugin-nextjs`
- [x] `.nvmrc` — Node 20

---

## Verification — complete

- [x] `npm run build` passes clean
- [x] No horizontal scroll at 375 / 768 / 1024 / 1440 px
- [x] 12/12 canvases live at every breakpoint; grid reflows 2 → 3 → 4
- [x] Zero touch targets under 44px
- [x] Zero JS console errors
- [x] Dark mode toggles and persists to `localStorage`
- [x] Icon-failure test — one missing icon leaves the other 11 balls rendering
- [x] `<noscript>` fallback so content is visible without JS

---

## Next up

- [x] ~~Push to `rohitg247/Sania-portfolio.git`~~ — done 2026-07-19. The 403 was a stale Windows credential cached for `RohitGupta247`; deleting `LegacyGeneric:target=git:https://github.com` resolved it. Local `dev` now tracks `origin/main`.
- [ ] **Netlify deploy** — connect the repo. Confirm the build picks up `@netlify/plugin-nextjs`, fonts load, and WebGL initialises on the deployed URL (WebGL behaves differently behind a CDN than on localhost).

## Pending — needs input from Sania

- [ ] Real LinkedIn / Instagram URLs (currently `#` placeholders)
- [ ] Real profile photo (currently `public/profile-placeholder.svg`)
- [x] ~~Regenerate the resume PDF with the correct phone number~~ — resolved 2026-07-19 by switching the served file to `docs/Letters/Sania_Ansari_Resume.pdf`, which already carries `+91 7045351403`

---

## Future scope (out of scope for now)

- Wire the contact form to a real email service (Resend via an API route, or EmailJS)
- Replace the Projects placeholders with real case studies once available
- Revisit Next.js advisories that have no fix inside the 14.x line (would require Next 15/16)
- Consider real brand icons for the skill balls if licensing is cleared
