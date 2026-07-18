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

### Dependency changes (in progress as of this log entry)
- Tailwind CSS v4 migration running via `npx @tailwindcss/upgrade`
- Remaining: React 18→19, Vite 4→8, ESLint 8→10 (flat config), r3f 8→9, drei 9→10, three 0.152→0.184, framer-motion 10→12, react-router-dom 6→7, react-vertical-timeline-component 3→4, @emailjs/browser 3→4
- Removed: `react-tilt` (unused, last published 2023), `maath` (unused)
