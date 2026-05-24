# Deploy to Vercel — team preview

The repo is two apps that deploy as two separate Vercel projects:

| Project | Root | Framework | URL pattern |
|---|---|---|---|
| `ui-kit-docs` | `./` | Next.js | `https://ui-kit-docs.vercel.app` |
| `ui-kit-docs-preview` | `./preview` | Vite | `https://ui-kit-docs-preview.vercel.app` |

The docs site iframes the preview app, so they need each other's URL. Deploy **preview first**, then plug its URL into docs.

## 1. Deploy preview (Vite)

1. https://vercel.com/new → Import Git Repository → pick `memoriaXII/ui-kit-docs`
2. **Project Name**: `ui-kit-docs-preview`
3. **Root Directory**: click "Edit" → set to `preview`
4. Framework Preset: **Vite** (auto-detected from `preview/vercel.json`)
5. Install Command, Build Command, Output Directory: leave as the JSON values (they're already in `preview/vercel.json`)
6. Deploy

Note the deployed URL, e.g. `https://ui-kit-docs-preview.vercel.app`.

## 2. Deploy docs (Next.js)

1. https://vercel.com/new → Import the **same** repo again
2. **Project Name**: `ui-kit-docs`
3. **Root Directory**: leave as `./`
4. Framework Preset: **Next.js** (auto-detected)
5. **Environment Variables**:
   - `NEXT_PUBLIC_PREVIEW_ORIGIN` = `https://ui-kit-docs-preview.vercel.app` (the URL from step 1)
   - `NEXT_PUBLIC_APP_URL` = `https://ui-kit-docs.vercel.app` (your final URL — set it to a placeholder first, then update after first deploy)
6. Deploy

After the docs deploy, edit `NEXT_PUBLIC_APP_URL` in Vercel's project settings to the real `ui-kit-docs.vercel.app` URL and redeploy (or attach a custom domain).

## 3. Verify

- Open `https://ui-kit-docs.vercel.app/docs/components/button`
- Open browser devtools → Network → confirm the iframe loads from `ui-kit-docs-preview.vercel.app/button?brand=freedom&dark=false`
- Switch the brand dropdown in the docs header — the iframe should reflect the brand change without reloading

## Notes

- The docs project's `vercel.json` includes an `ignoreCommand` that skips builds for changes scoped only to `preview/`. The preview project triggers on every push (no ignore). Adjust if you want stricter triggering.
- Both projects share one GitHub repo so pushes to `master` deploy both (except when the ignore command fires for docs).
- If you want a single URL, add a Vercel rewrite in `vercel.json` (root) mapping `/preview/*` to the preview project. Skipped for now to keep the deploy straightforward.

## Custom domain (later)

Once a domain is wired:

1. Add it to the `ui-kit-docs` project under Settings → Domains
2. Update `NEXT_PUBLIC_APP_URL` env var to match
3. Trigger a redeploy
