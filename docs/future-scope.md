# Future Scope

Items identified as worth doing eventually but explicitly deferred.

---

## Content

### Actis Technologies job entry
Add to `src/constants/index.js` `experiences` array once Rohit provides exact title, dates, and bullet points. The `ExperienceCard` icon fallback already handles the case where no company logo exists.

### Projects section refresh
Rohit said he'll update the Projects section later with real projects (replacing tutorial entries for "Carrent", "Jobit", "Tripguide"). Files: `src/constants/index.js` (`projects` array), `src/components/Projects.jsx`.

### My Resume.pdf update
Once Rohit updates the PDF with his Actis job, the download button automatically serves the new version — no code change needed.

### README.md
Currently empty. Should have: project overview, local dev setup (`npm install`, `npm run dev`), env var setup (point to `.env.example`), deploy notes (Netlify, what env vars to set in the dashboard).

---

## Technical Debt

### Stale committed `dist/` build folder
The bulk-commit (`bfcbaca`) included a pre-built `dist/` from a different tutorial-template portfolio referencing "Starbucks," "Tesla," "Carrent," "Tripguide." `dist/` is a build artifact and shouldn't be in git. Recommended: `git rm -r --cached dist/` and confirm it's in `.gitignore`. The current `.gitignore` already has `dist` — this just needs the git-tracked copies removed with `git rm --cached`.

### Non-idiomatic hover pattern
`Contact.jsx` and `Experience.jsx` swap hover icons via `document.querySelector(...).setAttribute(...)` (direct DOM manipulation) instead of React state (`useState`). Works but is dated style. Rewrite with `onMouseEnter`/`onMouseLeave` state if refactoring those components.

### `use` package in dependencies
`package.json` has `"use": "^3.1.1"` — likely a tutorial leftover. Not confirmed unused yet (needs grep). React 19 has its own built-in `use()` hook; the npm package is different. Confirm and remove if unused.

---

## Features

### Tests and CI
No test suite exists. Minimum viable: smoke test that the build succeeds. Nice to have: Playwright E2E for the golden path (form submit, resume download).

### EmailJS template HTML
The notification email from resume downloads will arrive with whatever copy is in the EmailJS "Contact Us" template — potentially awkward wording for a "someone downloaded your resume" notification. Draft a clean HTML email template and paste it into the EmailJS dashboard. Ask Claude for a draft when ready.

### Resume download rate limiting
Currently, a bot repeatedly clicking the download button could trigger unlimited notification emails and burn EmailJS's free-tier quota. Simple mitigation: `sessionStorage` flag to suppress duplicate notifications within the same browser session.

### Vite 8 / rolldown bundler stability
Vite 8 uses the new rolldown (Rust) bundler. Its platform-native binary is an npm optional dependency that npm bug npm/cli#4828 intermittently fails to install, breaking `npm run build` locally. If this becomes a recurring headache (esp. on Netlify), consider pinning Vite to 7.x (rollup-based, more mature) as a fallback — the rest of the stack (React 19, Tailwind 4) is independent of the Vite major.

### Actis Technologies company logo
Once Rohit has the company icon/logo, add it to `src/assets/company/` and reference it in the Actis experience entry in `src/constants/index.js`. The fallback badge ("A" initial) will be replaced automatically once `icon` is set.

---

# PROJECT PIVOT — 2026-07-19

**Everything above this line belongs to Rohit Gupta's portfolio and is obsolete.** This repo now hosts Sania Ansari's portfolio (Next.js 14). Prior entries are retained as history per the handoff protocol, not as live work items.

---

## Sania Ansari portfolio — deferred items

### Contact form delivery
The form validates and shows an animated success state but sends nothing (user's explicit choice for this build). Options when ready: a Next.js API route + Resend (server-side, keys hidden), or EmailJS client-side. The Netlify Next.js Runtime is already in place, so an API route needs no deploy changes.

### Real project case studies
`src/components/sections/projects.jsx` renders 4 shimmer placeholders under "My Work — Coming Soon". Replace with real work once Sania has publishable case studies.

### Real social URLs and profile photo
`SOCIALS` in `src/lib/constants.js` are `#` placeholders. `public/profile-placeholder.svg` is a generated gradient avatar.

### Resume PDF phone number
`docs/Letters/Sania_Ansari_Resume_Designed.pdf` (and the copy served at `public/Sania_Ansari_Resume.pdf`) lists a US phone number. The correct number, `+91 7045351403`, is already live on the site. Regenerate the PDF so the download stops contradicting the contact card.

### Next.js security advisories
`npm audit` reports advisories with no fix inside the 14.x line — they require Next 16. We are on the newest patched 14.2.x. Moving off 14 also means React 19, which means R3F v9 and Tailwind v4; treat as a coordinated upgrade, not a bump.

### Skill ball icons
Currently self-authored lettermark SVGs (Ads, Meta, Ai, Ps, …) to avoid third-party brand assets. Swap for real product logos only if licensing is cleared.

### Contact form delivery — revisit when ready
Already noted above; adding only that the Netlify Next.js Runtime is now confirmed in place, so an API route can be added with no deploy reconfiguration. Static export would have forced a re-plumb — that was the reason for keeping the runtime.

### Netlify build hardening
Not needed today, but if builds ever get slow or flaky: Netlify caches `node_modules` between builds automatically; `next/font` fetching from Google at build time is the most likely transient failure point (falls back to serif). Self-hosting the two fonts locally would remove that dependency entirely.
