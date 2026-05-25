# `examples/freedom-theme`

The "I am Freedom — just give me the bundled brand" reference app.

This example pairs with [`examples/custom-theme`](../custom-theme).
The two apps render the **same `App.tsx`**; the only difference is
which stylesheets `src/main.tsx` imports. Diffing the two folders is
the fastest way to see exactly what bringing your own brand involves:

```bash
diff -r examples/freedom-theme examples/custom-theme
```

## What this side does

```ts
// src/main.tsx
import "@arco-design/mobile-react/esm/style";
import "@appboxo/ui-kit/themes/freedom/theme.css";
```

That is the entire theming setup. No Less loader, no overlay
stylesheet, no JS configuration — the kit ships pre-compiled CSS for
every brand it knows about.

## Run

From the kit root, build the kit once so the local `file:../..`
dependency resolves:

```bash
pnpm build
cd examples/freedom-theme
pnpm install
pnpm dev          # http://localhost:5173
```

## What's in the App

- `LargeTitle`, `Title3`, `Body1`, `Body2`, `Footnote1` — typography
- `Card` + `Input` — surface + form control reading `--primary-*`
- `Tip` — uses `--info-*` tokens
- All four button variants
- A `Light / Dark` toggle that adds `arco-theme-dark` to `#root`

Every visual change you see when you flip dark mode is driven entirely
by `themes/freedom/theme.css`'s `#root.arco-theme-dark { ... }` block.
The app code never references a color directly.

## No `<UIKitProvider>` wrap?

Correct — the kit ships a default no-op host (plain `<a>` for `Link`,
identity `t(key) => key` for translations, inert router). A vanilla
Vite app like this one doesn't need to wrap anything; the kit just
works. If you migrate this code into a Next.js host, swap the root
for [`<NextUIKitProvider>`](../../src/next/index.tsx) from
`@appboxo/ui-kit/next` and the same components will start using
Next's real router, `next/link`, and `next-i18next`.
