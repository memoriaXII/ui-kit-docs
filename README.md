# @appboxo/ui-kit — Docs Site (experimental)

Sandbox / spike for evaluating whether to replace Storybook as the public docs surface for `@appboxo/ui-kit` (formerly `@freedom/ui-kit`; current npm publish is the interim `@rex-taiwan/ui-kit`).

## Repo layout

```
.
├── app/                           Next 16 docs site (App Router, Fumadocs MDX)
├── components/                    Docs chrome (sidebar, search, brand switcher, ...)
├── content/docs/                  MDX content (Components, Examples, Setup, ...)
├── lib/                           Brand loader (rescopes #root -> [data-freedom-brand])
├── registry/                      Placeholder demos for /docs/components grid
├── themes/                        ← synced from ../freedom-ui-kit/themes (gitignored)
└── preview/                       Sibling Vite app on :4001 — REAL @appboxo/ui-kit components
    └── src/previews/<name>.tsx    One file per component, renders the real kit
```

## Run

```bash
pnpm install
pnpm dev           # starts both: docs on :4000, preview on :4001
```

`pnpm dev` runs `concurrently` against both servers. You can also start them independently:

```bash
pnpm dev:docs      # docs only, http://localhost:4000
pnpm dev:preview   # preview only, http://127.0.0.1:4001
```

## Architecture

### Docs site (`:4000`)

- Next 16 + Turbopack + Tailwind 4 + Fumadocs 15
- Forked from [`elevenlabs/ui`](https://github.com/elevenlabs/ui)'s `apps/www`. See `LICENSE.upstream.md`
- Component MDX pages embed `<ComponentPreview name="button-demo" />`
- `<ComponentPreview>` decides between two modes:
  - **iframe mode** — when the slug is in `lib/iframe-previews.ts`, mounts `<iframe src="http://127.0.0.1:4001/<slug>?brand=<>&dark=<>">`
  - **placeholder mode** — falls back to a shadcn-based demo from `registry/__index__.tsx` (used in the grid on `/docs/components` so we don't spin up 30 iframes)

### Preview app (`:4001`)

- Vite + React 18 + Arco Design Mobile + `@appboxo/ui-kit` (via `file:../../freedom-ui-kit`)
- Each component has a route, e.g. `/button` → renders `<ButtonPreview />` mounting `<PrimaryButton text="Primary" />` etc.
- On boot, applies the brand CSS scoped under `#root`, sets `body.id = "root"` and `html { font-size: 50px }` per the kit's [setup contract](../freedom-ui-kit/themes/README.md)
- Listens for `postMessage({ type: "freedom-preview:update", brand, dark })` so the docs site theme/brand switcher drive the iframe without reloading

### Brand switcher

- `lib/brands.ts` — pure data (8 curated brand slugs, safe in client bundle)
- `lib/brands.server.ts` — reads `themes/<slug>/theme.css` at build time, rewrites `#root` → `[data-freedom-brand="<slug>"]`, injects all of them at once into `<head>`
- `BrandProvider` stores the active brand in `localStorage`
- `BrandSwitcher` (header dropdown) calls `setBrand(slug)`
- `IframePreview` `postMessage`'s the new brand to the preview iframe

### Theme sync

The docs site needs the kit's `themes/<brand>/theme.css` files at build time to display swatches and inject the brand stylesheets. Because Turbopack refuses to traverse `..`-symlinks during PostCSS, `scripts/sync-themes.mjs` does a hard copy from `../freedom-ui-kit/themes` into the local `themes/` folder (gitignored). Runs on `predev` and `prebuild`.

## What's a placeholder vs. real?

| Surface | Render |
|---|---|
| `/docs/components/<slug>` (detail) | **iframe** to the preview app — real `@appboxo/ui-kit` |
| `/docs/components` (grid) | Placeholder (shadcn primitives) — cheaper than 30 iframes |
| Brand color swatches | Real — extracted from `themes/<brand>/theme.css` |
| Code snippets in MDX | Real `@appboxo/ui-kit` import statements |

## Notes

- Package alias: docs currently reference `@appboxo/ui-kit` everywhere. Real npm install today is `pnpm add @appboxo/ui-kit@npm:@rex-taiwan/ui-kit` (see `Setup` page).
- Fumadocs MDX 11.6.3 doesn't compile `source.config.ts` → `.source/source.config.mjs` from its CLI. We compile it manually in `scripts/compile-source-config.mjs` and wire as `predev` / `prebuild`.
- `pnpm-workspace.yaml` is required so `pnpm --filter freedom-ui-kit-docs-preview dev` resolves. Without it, Turbopack also panics because the workspace root inference breaks. We pin `turbopack.root` in `next.config.mjs` to compensate.

## Attribution

Forked from [`elevenlabs/ui`](https://github.com/elevenlabs/ui) (MIT). See `LICENSE.upstream.md`.
