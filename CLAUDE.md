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

**What this is:** Sania Ansari's personal portfolio — Digital Marketing Manager & Graphic Designer, Mumbai. Next.js 14 (App Router) + Tailwind v3 + Framer Motion + React Three Fiber. Static, no backend.

**Deploy target:** Netlify, via `netlify.toml` + `@netlify/plugin-nextjs` (Netlify's Next.js Runtime). `.nvmrc` pins Node 20. Not a static export — the runtime is kept so a real contact API route can be added later without re-plumbing the deploy.

**Source of truth for all content:** `docs/Letters/Sania_Ansari_Resume_Designed.pdf`, transcribed into `src/lib/constants.js`. Every section reads from that file — never hardcode copy into components. Do not invent facts, metrics, or employers.

**Contact form does not send.** It validates and shows an animated success state only. No email service is wired up. Do not add credentials or claim it delivers.

---

## Version pins that must not drift

- **Next 14 → React 18.** Do not upgrade React to 19 without also moving to Next 15.
- **@react-three/fiber v8, @react-three/drei v9.** R3F v9 requires React 19 and will break the build here.
- **Tailwind v3**, not v4 — the token setup and shadcn-style primitives assume v3.

## Known constraints

- `npm audit` reports Next.js advisories with no fix inside the 14.x line (they require Next 16). We are on the newest patched 14.2.x. Revisit if/when moving to Next 15+.
- The resume PDF's text layer lists a **US phone number**, which is wrong. The correct number is `+91 7045351403` and lives in `src/lib/constants.js`. Regenerating the PDF is still outstanding — until then the downloadable resume contradicts the site's contact card.

---

## Gotchas learned the hard way

- **3D ball camera:** the sphere is `scale={2.75}` (5.5 units across). The Canvas camera must stay wide (`fov: 75`, `position: [0,0,5]`). A narrow fov clips the sphere into a flat square patch.
- **Directional light position** must sit well outside the sphere (`[3,4,6]`). A position near the origin gives a degenerate light direction and shades every facet flat grey.
- **Skill icons are transparent-background SVGs** in `public/icons/`. An opaque background reads as a square patch stuck to the ball. They are committed assets — nothing generates them at build time. To regenerate: author 256×256 SVGs with explicit `width`/`height` (TextureLoader needs intrinsic dimensions) containing only a gradient-filled `<text>` glyph.
- **Framer Motion serialises `initial` into SSR markup**, so every scroll-reveal element ships as `opacity:0`. Without JS the page below the hero would be invisible — hence the `<noscript>` override in `src/app/layout.jsx`. Keep it.
- Each ball is wrapped in `BallBoundary` so a missing/corrupt icon degrades that one sphere instead of killing the whole Canvas. Verified: removing one icon leaves the other 11 rendering.

---

## Code Style

- No unnecessary comments — code is self-documenting
- No new features beyond what's asked
- TypeScript is NOT used in this project — keep it JS/JSX
- Tailwind for styling; theme tokens are HSL CSS variables in `src/app/globals.css`
- Framer Motion for animations, via the shared `SectionWrapper` / `FadeIn` components

---

## Explicitly Out of Scope (do not touch unless user asks)

- Projects section (`src/components/sections/projects.jsx`) — deliberately placeholder skeletons; Sania has no case studies published yet
- Real social URLs — `SOCIALS` in constants are `#` placeholders until real handles are supplied
- The profile photo — `public/profile-placeholder.svg` stands in until a real image is provided
- Wiring the contact form to an email service
