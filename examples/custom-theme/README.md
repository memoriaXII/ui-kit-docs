# `examples/custom-theme`

The "I am a new partner team — bring your own brand" reference app.

This example pairs with [`examples/freedom-theme`](../freedom-theme).
The two apps render the **same `App.tsx`**; the only difference is
which stylesheets `src/main.tsx` imports. Diffing the two folders is
the fastest way to see exactly what bringing your own brand involves:

```bash
diff -r examples/freedom-theme examples/custom-theme
```

In short: **two `import` lines change, and you add one CSS file**.

## What this side does

```ts
// src/main.tsx
import "@arco-design/mobile-react/esm/style";
import "@appboxo/ui-kit/themes/default/theme.css"; // 1) neutral baseline
import "./styles/my-brand.css";                     // 2) your overrides
```

The "Citrus" brand in [`./src/styles/my-brand.css`](./src/styles/my-brand.css)
is a fictional orange brand. It's ~30 lines of CSS, ~80% of which is
re-declaring the `--primary-*` palette in light + dark mode. That is
the typical shape of a partner-team override: the kit's `default/`
already declares every required token with safe values, so your
brand file only needs to ship the **deltas**.

## Three steps to make it your own

1. Pick a value for `--primary-6` (your brand's main color).
2. Generate the rest of the palette around it (1 → very light, 7 → darkest).
   Tools like [Tints.dev](https://www.tints.dev/) or
   [Material Theme Builder](https://m3.material.io/theme-builder) work well.
3. (Optional) override any `--boxo-*` token your designer cares about
   -- border radii, shadows, status colors, etc. Full token contract
   in [`themes/README.md`](../../themes/README.md#token-contract).

## Run

From the kit root, build the kit once so the local `file:../..`
dependency resolves:

```bash
pnpm build
cd examples/custom-theme
pnpm install
pnpm dev          # http://localhost:5173
```

## What you should see

The same screen as [`examples/freedom-theme`](../freedom-theme), but
**orange instead of green**. Card / Tip / buttons / focus ring /
toast accent — everything re-paints from one CSS file. No component
code, no kit code, no provider config changed.

## No `<UIKitProvider>` wrap?

Correct — the kit ships a default no-op host (plain `<a>` for `Link`,
identity `t(key) => key` for translations, inert router). A vanilla
Vite app like this one doesn't need to wrap anything; the kit just
works. If you migrate this code into a Next.js host, swap the root
for [`<NextUIKitProvider>`](../../src/next/index.tsx) from
`@appboxo/ui-kit/next` and the same components will start using
Next's real router, `next/link`, and `next-i18next`.
