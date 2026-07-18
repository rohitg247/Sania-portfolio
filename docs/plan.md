# Project Plan — Portfolio Refresh

Last updated: 2026-07-13

---

## Content & Branding

- [x] Navbar — wordmark-only logo (`Rohit-logo.png`), remove RG monogram
- [x] Favicon — replace blank `public/logo.png` with RG monogram
- [x] Work Experience — sync from `My Resume.pdf` (Kosqu Technolab + Nancens Enterprises intern)
- [x] Experience icon fallback — show first letter when no company logo exists
- [x] Resume button — real file download of `My Resume.pdf`
- [x] Resume download notification — EmailJS fire-and-forget to `rohitg247@gmail.com`
- [x] `src/utils/email.js` — shared helper for Contact + Experience
- [x] Contact form — env vars, corrected recipient, better error logging
- [x] GitHub + LinkedIn links — added below Contact form
- [x] Hero tagline — "fresh Web Developer" → Full Stack Developer copy
- [x] About bio — rewritten to match resume identity
- [x] Unused assets — moved to `src/assets/unused/` (gitignored)
- [x] `.env` / `.env.example` / `.gitignore` — created/updated

---

## Dependency Upgrade

- [x] Remove `react-tilt` and `maath` (unused)
- [~] Tailwind CSS 3 → 4 (`npx @tailwindcss/upgrade` codemod, `@tailwindcss/vite` plugin)
- [ ] React 18.2 → 19.2.7 (pinned, not `^19`, due to r3f `<19.3` constraint)
- [ ] `react-dom` 18.2 → 19.2.7
- [ ] `@react-three/fiber` 8 → 9.6.1
- [ ] `@react-three/drei` 9 → 10.7.7
- [ ] `three` 0.152 → 0.184
- [ ] Vite 4 → 8.0.16
- [ ] `@vitejs/plugin-react` 4 → 6.0.2
- [ ] ESLint 8 → 10 (flat config: `.eslintrc.cjs` → `eslint.config.js`)
- [ ] `eslint-plugin-react` 7.32 → 7.37.5
- [ ] `eslint-plugin-react-hooks` 4.6 → 7.1.1
- [ ] `eslint-plugin-react-refresh` 0.3 → 0.5.3
- [ ] Add `@eslint/js` + `globals` (new ESLint 10 companion packages)
- [ ] `framer-motion` 10 → 12
- [ ] `react-router-dom` 6 → 7
- [ ] `react-vertical-timeline-component` 3 → 4
- [ ] `@emailjs/browser` 3 → 4
- [ ] Remove `autoprefixer` + `postcss` (not needed with `@tailwindcss/vite`)
- [ ] `npm run build` clean + full visual sweep
- [ ] Verify 3D Tech section (Ball.jsx canvas) renders correctly after r3f upgrade

---

## User Action Required (blocking email feature)

Rohit must set up EmailJS before the contact form and resume-download notification deliver real email:

1. Sign in at `dashboard.emailjs.com` (use `rohitg247@gmail.com` Google login)
2. **Email Services** → Add New Service → Gmail → authorize → copy **Service ID**
3. **Email Templates** → Create from "Contact Us" starter:
   - "To Email": hardcode `rohitg247@gmail.com` (not a variable)
   - "From Name": `{{from_name}}`
   - "Reply-To": `{{from_email}}`
   - Body: include `{{message}}`
   - Copy **Template ID**
4. **Account** page → copy **Public Key**
5. Update `.env` with real values (or send me the three IDs and I'll do it)

---

## Explicitly Out of Scope

- Projects section — user will update later
- Actis Technologies job entry — user will provide title/dates/bullets later
- `My Resume.pdf` content — user will update the file themselves
- Any Actis employer infrastructure (SMTP relay, Docker API)
