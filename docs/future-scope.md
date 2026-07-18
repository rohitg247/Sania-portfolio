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

### Actis Technologies company logo
Once Rohit has the company icon/logo, add it to `src/assets/company/` and reference it in the Actis experience entry in `src/constants/index.js`. The fallback badge ("A" initial) will be replaced automatically once `icon` is set.
