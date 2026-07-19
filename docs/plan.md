# Plan — Sania Ansari Portfolio

Last updated: 2026-07-20 (v2 design revamp)

> v1 build history is in `docs/handoff.md` / `docs/change.md`. The 2026-07-20 v2
> design revamp (full High/Medium/Nice audit implementation) lives on the **`dev`
> branch**; `main` still carries v1 until the user reviews and merges.

---

## v2 revamp — complete (on `dev`)

- [x] AA contrast: `--primary-text` token; bright pink restricted to fills
- [x] Neutralized borders/shadows; pink reserved for key accents
- [x] Hero: 2 CTAs (one primary), word-rotate replaces typewriter, count-up stat row, name stagger, fluid type, grain
- [x] Left-aligned section headings, gradient underline bar removed
- [x] Language star-bars → proficiency chips
- [x] Education trimmed to Diploma + Bachelor (user-approved)
- [x] Skills: real brand logos (Simple Icons CC0) + lucide in spotlight-hover grid
- [x] three/@react-three/fiber/@react-three/drei uninstalled; canvas components and `public/icons/` deleted
- [x] Scrollspy nav pill + scroll-progress hairline
- [x] Button press states; custom cursor deleted; drawer inerts page
- [x] Projects: single intentional "case studies in progress" card (user-approved)
- [x] Timeline: single left rail
- [x] OG image via next/og + openGraph/twitter metadata + metadataBase
- [x] CLAUDE.md + docs synced
- [x] `npm run build` clean after dep removal (158 kB first load)

## Verification — remaining

- [~] Final `npm run build` + visual pass (light/dark, 375px/desktop) before handing to user
- [ ] User review of `dev` in browser
- [ ] Reduced-motion emulation check (word-rotate static, stats show final values)

## Next up

- [ ] **User reviews `dev`**, then merge `dev` → `main`
- [ ] Deploy to Netlify per `docs/deploy-netlify.md` (unchanged: no env vars needed; `metadataBase` uses Netlify's injected `URL`)
- [ ] Post-deploy: OG image at `<site>/opengraph-image`, link-preview debuggers, resume download, dark mode, 375px overflow

## Pending — needs input from Sania

- [ ] Real LinkedIn / Instagram URLs (currently `#`)
- [ ] Real profile photo (currently `public/profile-placeholder.svg`)
- [ ] 2–3 case studies to replace the single projects card

---

## Settled — do not re-open

- `next/image` + placeholder SVG works as-is; no image config.
- Never run `npm run build` while a dev server is live (shared `.next` corrupts).
- Site metrics (100+ leads/mo etc.) intentionally exceed the resume PDF — keep.
- Served resume is `Sania_Ansari_Resume.pdf` (correct +91 number); never revert to `_Designed`.

---

## Future scope (out of scope for now — see docs/future-scope.md)

- Contact form delivery (Resend/EmailJS via API route)
- Syne font inside the OG image
- Next 15/16 coordinated upgrade for the unfixable 14.x advisories
