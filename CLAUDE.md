# CLAUDE.md — Portfolio Project Rules

## Session Handoff Protocol

At the end of every conversation (or whenever significant progress is made), update these three files in `docs/` with the current date and time. If the files don't exist, create them.

### docs/handoff.md
Append a new dated section describing:
- What was accomplished this session
- The exact state things were left in (completed vs. in-progress vs. blocked)
- Any decisions made and why
- The single most important next step for the next session

### docs/change.md
Append a dated changelog entry listing every file that was modified, created, or deleted, with a one-line description of what changed.

### docs/plan.md
Overwrite (not append) with the current state of the plan:
- Mark completed items as [x]
- Mark in-progress items as [~]
- Mark pending items as [ ]
- Add any newly discovered tasks
- Keep future-scope items at the bottom, clearly marked as out of scope for now

### docs/future-scope.md
Append any newly identified items that are out of scope for the current session but worth tracking for later. Never remove existing entries.

---

## Project Context

**What this is:** Sania Ansari's personal portfolio — Digital Marketing Manager & Graphic Designer, Mumbai. Next.js 14 (App Router) + Tailwind v3 + Framer Motion. Static, no backend. (React Three Fiber was removed in the 2026-07-20 v2 revamp — the 3D skill balls are gone.)

**Deploy target:** Netlify, via `netlify.toml` + `@netlify/plugin-nextjs` (Netlify's Next.js Runtime). `.nvmrc` pins Node 20. Not a static export — the runtime is kept so a real contact API route can be added later without re-plumbing the deploy.

**Source of truth for all content:** `docs/Letters/Sania_Ansari_Resume_Designed.pdf`, transcribed into `src/lib/constants.js`. Every section reads from that file — never hardcode copy into components. Do not invent facts, metrics, or employers.

**Contact form does not send.** It validates and shows an animated success state only. No email service is wired up. Do not add credentials or claim it delivers.

---

## Version pins that must not drift

- **Next 14 → React 18.** Do not upgrade React to 19 without also moving to Next 15.
- **Tailwind v3**, not v4 — the token setup and shadcn-style primitives assume v3.
- (three/@react-three/fiber/@react-three/drei were uninstalled in the v2 revamp — do not re-add without asking.)

## Known constraints

- `npm audit` reports Next.js advisories with no fix inside the 14.x line (they require Next 16). We are on the newest patched 14.2.x. Revisit if/when moving to Next 15+.
- The served resume is `docs/Letters/Sania_Ansari_Resume.pdf`, copied to `public/Sania_Ansari_Resume.pdf`. It carries the correct `+91 7045351403`. Do **not** revert to `Sania_Ansari_Resume_Designed.pdf` — that older file lists a wrong US number.
- The site's Experience bullets keep metrics (100+ enquiries/month, ₹1.5 lakh/month budget, ~25% CPL reduction) that the current resume PDF does not state. This is intentional per the user; leave them.

---

## Gotchas learned the hard way

- **Framer Motion serialises `initial` into SSR markup**, so every scroll-reveal element ships as `opacity:0`. Without JS the page below the hero would be invisible — hence the `<noscript>` override in `src/app/layout.jsx`. Keep it.
- **Skill icons are inline brand glyphs** in `src/components/brand-icons.jsx` — official Simple Icons paths (CC0), `fill="currentColor"` so hover tinting works. Concept skills (SEO, CRM, etc.) use lucide-react. `public/icons/` no longer exists.
- **Two pink tokens on purpose:** `--primary` (bright #FF6B9D) is for fills/gradients only; `--primary-text` is the AA-compliant darker variant for small text on light surfaces. Don't put `text-primary` on small copy.
- **Spotlight card hover** in skills sets `--mx`/`--my` CSS vars per card via `onMouseMove`; the overlay reads them in a `radial-gradient`. CorelDRAW's official brand hex is black, so its `color` is `null` → falls back to `hsl(var(--foreground))`.
- **`metadataBase` reads `process.env.URL`** — Netlify injects it at build; locally it falls back to localhost. No env setup needed.

---

## Code Style

- No unnecessary comments — code is self-documenting
- No new features beyond what's asked
- TypeScript is NOT used in this project — keep it JS/JSX
- Tailwind for styling; theme tokens are HSL CSS variables in `src/app/globals.css`
- Framer Motion for animations, via the shared `SectionWrapper` / `FadeIn` components

---

## Explicitly Out of Scope (do not touch unless user asks)

- Projects section (`src/components/sections/projects.jsx`) — a single intentional "case studies in progress" card (replaced the shimmer skeletons in the v2 revamp); real case studies still pending from Sania
- Real social URLs — `SOCIALS` in constants are `#` placeholders until real handles are supplied
- The profile photo — `public/profile-placeholder.svg` stands in until a real image is provided
- Wiring the contact form to an email service
