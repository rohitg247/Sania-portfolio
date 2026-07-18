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

**What this is:** Rohit Gupta's personal portfolio — React 18/19 + Vite + Three.js, deployed on Netlify at `rohitgupta-portfolio.netlify.app`. Static site, no backend.

**EmailJS:** All email (contact form + resume download notification) goes through EmailJS client-side. The `.env` file (gitignored) holds credentials. Rohit must set up his own EmailJS account — current credentials in `.env` are likely dead tutorial boilerplate.

**Do NOT use Actis employer infrastructure:** `smtp-relay.gmail.com`, `noreply@actis.co.in`, Docker API key `12jd73kdosdjwiwkfwl4rw4wefwe`, API URL `https://ui-service.actis.co.in`. These are unreachable from Netlify.

**Rohit's email:** `rohitg247@gmail.com`

---

## Code Style

- No unnecessary comments — code is self-documenting
- No new features beyond what's asked
- TypeScript is NOT used in this project — keep it JS/JSX
- Tailwind for styling (currently migrating v3 → v4)
- Framer Motion for animations

---

## Explicitly Out of Scope (do not touch unless user asks)

- Projects section (`src/components/Projects.jsx`, `projects` array in constants)
- Actis Technologies job entry in Experience — user will provide title/dates/bullets later
- `My Resume.pdf` content — user will update the file themselves
- Any Actis employer infrastructure or credentials
