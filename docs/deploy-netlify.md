# Deploying to Netlify

Step-by-step guide for putting this site live.

**Repo:** `https://github.com/rohitg247/Sania-portfolio` (branch `main`)

---

## Code changes required: none

Everything Netlify needs is already committed and verified. You do **not** need to touch the code to deploy.

| File | Purpose | Status |
|---|---|---|
| `netlify.toml` | Build command, publish dir, Next.js runtime plugin | committed |
| `.nvmrc` | Pins Node 20 (Next 14 requires ≥18.17) | committed |
| `package.json` | `build` script Netlify calls | committed |

Current `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

You don't need to install `@netlify/plugin-nextjs` locally — Netlify fetches it during the build. It isn't in `package.json` on purpose.

**No environment variables are needed.** The contact form is UI-only and sends nothing, so there are no API keys, and nothing will fail for a missing secret.

---

## Steps

### 1. Sign in
Go to <https://app.netlify.com> and sign in **with GitHub**. Use the `rohitg247` account — the same one that owns the repo.

### 2. Create the site
- **Add new site** → **Import an existing project**
- Choose **GitHub**, authorise Netlify if prompted
- Pick **`rohitg247/Sania-portfolio`**

> If the repo isn't listed, Netlify's GitHub App lacks access to it. Click **Configure the Netlify app on GitHub** at the bottom of the repo list and grant access to that repository.

### 3. Confirm build settings
Netlify reads `netlify.toml`, so these should already be filled in. Verify they read:

| Field | Value |
|---|---|
| Branch to deploy | `main` |
| Build command | `npm run build` |
| Publish directory | `.next` |

Leave "Base directory" empty. **Do not override the publish directory** — with the Next.js runtime it must stay `.next`, not `out` or `dist`.

### 4. Deploy
Click **Deploy site**. First build takes roughly 2–4 minutes (installing ~460 packages, then compiling).

You'll get a URL like `random-name-123.netlify.app`. Rename it under **Site configuration → Site details → Change site name**.

---

## Verify after deploy

Open the live URL and check each of these. They're the things most likely to behave differently in production than on localhost:

- [ ] **Page loads**, hero shows "Sania Ansari" with the typewriter cycling
- [ ] **3D skill balls render and spin.** Most important check — WebGL behaves differently behind a CDN than locally. All 12 should appear as pale spheres with rose lettering. If some show as flat pink circles instead, their texture failed (the error boundary is doing its job, but the icon needs looking at).
- [ ] **Fonts** — headings in Syne (geometric), body in Plus Jakarta Sans. If everything looks like Times New Roman, the font fetch failed at build time.
- [ ] **Dark mode toggle** works and survives a page refresh
- [ ] **Resume downloads** — click "Download Resume", confirm the PDF opens and shows `+91 7045351403`
- [ ] **Mobile** — open on a phone, or DevTools at 375px. No horizontal scrolling; hamburger menu opens the drawer
- [ ] **Contact form** — submitting shows the animated checkmark (it does not send an email; that's expected)

---

## Auto-deploy

Once connected, every push to `main` triggers a rebuild automatically:

```bash
git add -A
git commit -m "your message"
git push
```

Pull requests get their own preview URL before merging.

---

## Troubleshooting

**Build fails: "Node version"**
Netlify should read `.nvmrc`. If not, set an environment variable `NODE_VERSION` = `20` under Site configuration → Environment variables.

**Build fails on `npm install`**
Ensure `package-lock.json` is committed (it is). If Netlify complains about peer dependencies, set `NPM_FLAGS` = `--legacy-peer-deps`. This shouldn't be needed — the React 18 / R3F v8 pins are deliberately consistent.

**Site deploys but pages 404**
Publish directory was overridden. It must be `.next`.

**Skill balls don't appear at all**
Check the browser console. If you see WebGL context errors, the visitor's device or browser has WebGL disabled — nothing to fix on our side. If instead you see 404s for `/icons/*.svg`, the icons didn't get committed; verify `public/icons/` has 12 files.

**Fonts fall back to serif**
The build machine couldn't reach Google Fonts. Retry the deploy — it's usually transient.

---

## Custom domain (optional)

**Site configuration → Domain management → Add a domain.** Netlify walks you through DNS and provisions an HTTPS certificate automatically (free, via Let's Encrypt). Allow up to 24 hours for DNS to propagate.

---

## A note on the deploy mode

Every route in this site currently builds as static:

```
Route (app)
┌ ○ /              61.6 kB    149 kB
├ ○ /_not-found
└ ○ /icon.svg
○  (Static)  prerendered as static content
```

So it could ship as a pure static export (`output: 'export'` + `publish = "out"`), which is marginally cheaper and skips serverless functions entirely.

We deliberately kept the Netlify Next.js Runtime instead, because switching to static export would have to be undone the moment you wire the contact form to a real email service via an API route. The runtime costs nothing while the site is fully static and keeps that door open.
