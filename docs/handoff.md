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

---

## 2026-07-19 — Full Revamp: Rohit's Portfolio → Sania Ansari's Portfolio

> **Project pivot.** Everything above this line refers to Rohit Gupta's portfolio (Vite + React 19). This repo now hosts **Sania Ansari's** portfolio and was rebuilt from scratch. Prior entries are retained as history only.

### What was accomplished

Complete rebuild, Vite → **Next.js 14 (App Router)**:

1. **Wiped** the old Vite app (`src/`, `dist/`, `public/`, `index.html`, `vite.config.js`, `eslint.config.js`, `package.json`, old `CLAUDE.md`/`README.md`, `.env.example`). Kept `.git/`, `docs/`, `MIT.md`.
2. **Scaffolded** Next.js 14 + React 18 + Tailwind v3 + Framer Motion + R3F v8/drei v9, hand-written configs (no `create-next-app`).
3. **Theme system** — HSL CSS-variable tokens, light default + dark via `next-themes` (`storageKey: sania-theme`), Plus Jakarta Sans + Syne via `next/font`.
4. **Content layer** — `src/lib/constants.js`, everything transcribed from `docs/Letters/Sania_Ansari_Resume_Designed.pdf`.
5. **All 9 sections built** — navbar (sticky + mobile drawer), hero (typewriter + gradient orbs), about (bio + language bars), skills (3D balls), experience (alternating timeline), projects (placeholder skeletons), education, contact, footer.
6. **3D skill balls** — 12 R3F canvases, icosahedron + Decal, OrbitControls, per-ball error boundary.
7. **Netlify** — `netlify.toml` + `@netlify/plugin-nextjs` + `.nvmrc` (Node 20).

### Decisions made and why

- **Next 14 forces React 18**, so R3F stepped *down* v9→v8 and Tailwind v4→v3 (the old repo ran React 19 / R3F v9 / Tailwind v4). Getting this wrong breaks the build.
- **Contact form is UI-only** (user's choice) — validates and shows an animated checkmark, sends nothing.
- **Skill icons are self-authored transparent SVGs**, not PNGs. Originally planned SVG→PNG via `sharp`; dropped after the user pushed back. SVG works fine as a WebGL texture given explicit `width`/`height`, avoids a second format and a build step, and the error boundary covers the residual risk.
- **Phone corrected to `+91 7045351403`** — the resume PDF's text layer contains a wrong US number.

### Bugs found and fixed during verification

- **Balls rendered as flat squares** — Canvas `fov: 26` was too narrow for a `scale 2.75` sphere, clipping it to a flat patch. Fixed to `fov: 75`, `position: [0,0,5]`.
- **Balls rendered muddy grey** — `directionalLight` at `[0,0,0.05]` sits inside the sphere, giving a degenerate light direction. Moved to `[3,4,6]`.
- **Mobile balls were flat** — the low-power path dropped the directional light entirely. Now only *shadows*/dpr/antialias/OrbitControls are gated; the light (cheap) stays.
- **Page invisible without JS** — Framer Motion serialises `initial` into SSR markup, so 40 elements shipped as `opacity:0`. Added a `<noscript>` override in `layout.jsx`.
- **Sub-44px touch targets** — navbar logo and desktop nav links. Now `min-h-11` everywhere; verified zero violations at all four breakpoints.

### State: complete and verified

`npm run build` passes clean. Browser-verified (headless Chrome + SwiftShader) at 375/768/1024/1440 px:
- No horizontal scroll at any width
- 12/12 canvases live at every breakpoint; skills grid reflows 2 → 3 → 4 columns
- Zero touch targets under 44px; zero JS console errors
- Dark mode toggles and persists to `localStorage`
- Icon-failure test: removing one icon left 11/11 remaining balls rendering

### Most important next step

**Push access.** `git push` to `rohitg247/Sania-portfolio.git` returns 403 — the authenticated account (`RohitGupta247`) lacks write permission, or the repo does not exist yet. Resolve that, then deploy to Netlify and confirm WebGL initialises on the deployed URL.

### Also outstanding

- Regenerate the resume PDF with the correct `+91` phone number — the downloadable file currently contradicts the site.
- Supply real LinkedIn/Instagram URLs and a real profile photo.

---

## 2026-07-19 (later) — Resume swap, tagline, and push diagnosis

### What was accomplished

- **Served resume replaced.** `public/Sania_Ansari_Resume.pdf` is now a copy of `docs/Letters/Sania_Ansari_Resume.pdf` (previously `Sania_Ansari_Resume_Designed.pdf`). The new file carries the correct **+91 7045351403**, which closes the phone-number contradiction between the download and the site's contact card. No PDF editing was needed — the correct number was already in that file.
- **Tagline** → "Digital Marketing & Graphic Designer", matching the new resume's header. Used only in the footer.
- **`PROFILE.role` deliberately left as "Digital Marketing Manager"** — it feeds the browser tab title and is her actual current job title, which is the stronger SEO term. The tagline covers the designer half.
- **Experience metrics deliberately kept** (100+ enquiries/month, ₹1.5 lakh/month, ~25% CPL reduction). The newer PDF words these more generally; the user chose to keep the figures on the site.
- **`jsconfig.json`** — removed deprecated `baseUrl` (TS 7.0 drops it). Verified with a clean rebuild that all `@/` aliases still resolve.

### State

Three commits sit on local `dev`, working tree clean, build passing:

| Commit | Contents |
|---|---|
| `e4fe655` | corrected resume PDF + tagline |
| `88ecb02` | jsconfig `baseUrl` fix |
| `673bd76` | full Next.js 14 rebuild |

### BLOCKED — push authentication

`git push origin dev:main` fails with 403 on every attempt:

```
Permission to rohitg247/Sania-portfolio.git denied to RohitGupta247
```

**Diagnosed root cause:** Windows Credential Manager holds an entry
`LegacyGeneric:target=git:https://github.com` for user **`RohitGupta247`**, but the
repo is owned by **`rohitg247`** — two different GitHub accounts. The repo itself
exists and is public (anonymous HTTP 200), so this is purely a write-permission
problem, not a missing repo. Cloning worked earlier only because public reads are
anonymous.

**This cannot be resolved from inside Claude Code** — new credentials must come from
the user. Options:

1. Delete the cached credential, then push from an interactive terminal so Git
   Credential Manager can prompt for the `rohitg247` sign-in:
   `cmdkey /delete:LegacyGeneric:target=git:https://github.com`
   Note: this affects *all* github.com git operations on the machine, so other
   repos will need re-authentication too.
2. Add `RohitGupta247` as a collaborator on `rohitg247/Sania-portfolio`.
3. Use a personal access token scoped to `rohitg247`:
   `git remote set-url origin https://<TOKEN>@github.com/rohitg247/Sania-portfolio.git`

### Most important next step

Resolve the credential mismatch and push the three commits. Netlify deployment
verification is queued behind that and cannot start until the code is on the remote.

### RESOLVED — push succeeded

Deleting the stale Windows credential (`cmdkey /delete:LegacyGeneric:target=git:https://github.com`)
fixed the 403 immediately; the next push went through with no further intervention.
All four commits are on `origin/main` at `62fef08`, and local `dev` now tracks it.

Side effect to expect: clearing that credential was machine-wide, so the first push
to any other GitHub repo (e.g. `Rohit-Portfolio`) will prompt for sign-in once.

**Next step is now the Netlify deploy** — connect the repo and verify the build picks
up `@netlify/plugin-nextjs`, fonts load, and WebGL initialises on the deployed URL.

---

## 2026-07-20 — Branch rename, Netlify guide, dev-cache incident

### What was accomplished

- **Local branch renamed `dev` → `main`**, now tracking `origin/main` directly. Plain `git push` works; the temporary `push.default = upstream` workaround was removed as no longer needed.
- **`docs/deploy-netlify.md` written** — full deploy walkthrough, post-deploy checklist, troubleshooting, custom domain notes.
- **Confirmed Netlify needs zero code changes.** `netlify.toml`, `.nvmrc` and the build script are already committed; no env vars are required because the contact form doesn't send.

### Investigated and dismissed — do not re-open

Suspected `next/image` would break on Netlify because the profile placeholder is an
SVG and Next refuses to optimise SVGs without `dangerouslyAllowSVG`. Requesting
`/_next/image?url=%2Fprofile-placeholder.svg` does indeed return **400**, which looked
damning.

It is a false alarm. Next.js never routes SVGs through the optimiser — the rendered
`<img>` points directly at `/profile-placeholder.svg`, loads at naturalWidth 640, and
the page records zero failed requests. **No image config is needed.** Verified in a
real browser, not inferred.

### Incident — corrupted `.next`, self-inflicted

The user's `npm run dev` started failing with `Cannot find module './948.js'`.

**Cause:** production `npm run build` runs were fired while the user's dev server was
live. Both write to the same `.next` directory, so the build overwrote chunks the dev
server was actively serving.

**Fix:** stop all servers, `rm -rf .next`, restart dev. Source code was never affected —
a clean build passed and `git status` showed no modified source files.

**Rule for future sessions: never run `npm run build` while a dev server is running.**
Check for listeners on ports 3000+ first, and stop any test servers when finished —
`TaskStop` alone did not reliably free the ports; `Stop-Process` on the PID from
`Get-NetTCPConnection` did.

### State

`origin/main` and local `main` are in sync at `a844c0e`. Working tree clean, build
passing, no servers left running.

### Most important next step

**Deploy to Netlify** by following `docs/deploy-netlify.md`. Then work the post-deploy
checklist — particularly that the 3D balls initialise (WebGL differs behind a CDN) and
that fonts resolve (`next/font` fetches from Google at build time).

---

## 2026-07-20 (later) — v2 design revamp on `dev` branch

### What happened

A full design audit (Apple/Stripe/Vercel/Linear bar) scored the site ~6.5/10: solid
engineering but template-looking. User approved implementing **all** High + Medium +
Nice-to-have findings. All work lives on the **`dev` branch**, pushed to `origin/dev`.
**`main` is untouched** — merge only after user review.

### Shipped (8 commits on dev)

1. **Tokens** — new `--primary-text` (AA on light bg; bright pink failed 2.7:1),
   neutralized borders/shadows, `.grain` utility, theme-var gradient stops.
2. **Hero** — 3 CTAs cut to 2 (one gradient primary), typewriter → masked word-rotate,
   count-up stat row (5+ yrs, 100+ leads/mo, ~25% CPL, ₹1.5L/mo), name word-stagger,
   fluid clamp type.
3. **Restraint** — left-aligned section headings (gradient bar deleted), language
   star-bars → proficiency chips, education trimmed to 2 entries (user-approved).
4. **Skills** — 12 WebGL balls replaced with flat spotlight-hover grid using real
   brand logos (Simple Icons CC0, inlined in `src/components/brand-icons.jsx`) +
   lucide for concept skills. `three`/`@react-three/fiber`/`@react-three/drei`
   uninstalled; `public/icons/` and `src/components/canvas/` deleted.
5. **Nav/motion** — scrollspy with animated pill, scroll-progress hairline,
   button press states, custom cursor deleted, drawer inerts the page behind it.
6. **Projects/timeline** — shimmer skeletons → single intentional "case studies in
   progress" card (user-approved); alternating timeline → single left rail.
7. **Meta** — OG image generated at build via `next/og`, openGraph/twitter metadata,
   `metadataBase` from Netlify's `URL` env.
8. **Docs** — CLAUDE.md pins/gotchas updated (R3F sections removed), this handoff.

### State

- `dev` builds clean; first-load JS 158 kB (three.js removal was the big win).
- `main` still has the v1 site; deploy-to-Netlify next step from the previous session
  still applies but should now target the merged result after review.
- Still blocked on Sania's assets: real photo, real social URLs, case studies.

### Most important next step

**User reviews the dev branch locally (`git checkout dev`, `npm run dev`), then merge
`dev` → `main` and deploy via `docs/deploy-netlify.md`.** Post-deploy: verify the OG
image renders at `<site>/opengraph-image` and link previews pick it up.
