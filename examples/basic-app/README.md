# basic-app

The smallest sensible `@appboxo/ui-kit` consumer. One file of UI, one
file of wiring -- read it in 30 seconds, copy-paste it into a new
project, you're done. Anything fancier (theme switching, dark mode,
per-component showcases, routing) lives in the sibling examples.

## Files

```
src/
├── App.tsx       # one screen: title, card+input, tip, two buttons
├── main.tsx      # boilerplate: theme import, ContextProvider, i18n
└── i18n.ts       # 4 keys the kit looks up via react-i18next
```

## Run

From the repo root:

```bash
pnpm install
pnpm build               # build the kit so dist/ exists
cd examples/basic-app
pnpm install
pnpm dev                 # http://localhost:5173
```

> Editing the kit? Re-run `pnpm build` at the repo root so basic-app
> picks the new `dist/` up. (basic-app deliberately consumes the kit
> through `file:../..` → `dist/`, not through a `src/` alias --
> that's what an external consumer's setup looks like. For
> hot-reloading off kit sources, use `examples/kitchen-sink`.)

## What it shows

- Loading the Freedom brand via the pre-compiled
  `themes/freedom/theme.css` (no LESS pipeline required).
- The two host-side incantations every consumer needs:
  - `<ContextProvider system="ios" />` from Arco mobile
  - `document.documentElement.style.fontSize = "50px"` so the kit's
    `pxtorem`-compiled sizes render 1:1 instead of at ~3x scale.
- A representative slice of components: `LargeTitle`, `Body1/2`,
  `Footnote1`, `Card`, `Flex`, `Input`, `Tip`, `Primary/Secondary
  Button`, `Toast`.
- A minimal `react-i18next` setup -- the kit looks up `Done`,
  `Close`, `Select`, `Copied` through `useTranslation()`, and these
  four keys are declared in `i18n.ts`.
- Wiring up a host-side haptic handler via `setHapticHandler(...)`.

## What it deliberately omits

- **Routing** -- no Next/React Router. Add your own.
- **`<QueryProvider>`** -- listed in deps because the kit instantiates
  a default `QueryClient` at module load (one of its exports needs
  it), but this example doesn't render any data so the provider
  isn't wired up. See `examples/pass-freedom`.
- **Dark mode** -- pass `useDarkMode={true}` to `ContextProvider` and
  add `arco-theme-dark` to `#root` to flip it. See
  `examples/kitchen-sink/src/App.tsx`.
- **Picker / date / time components** -- they need a few more
  translation keys and a stable scroll container. See `examples/pass-freedom`.
- **Brand switching** -- swap `themes/freedom/theme.css` for any
  `themes/*/theme.css`, or apply the BYO overlay pattern shown in
  `examples/custom-theme`.
- **Mobile device frame / Storybook chrome** -- this example shows
  the kit at its real design scale (Arco's 750px artboard, root
  font-size 50px). For a multi-brand visual review use
  `examples/kitchen-sink`; for a polished single-brand showcase use
  `examples/freedom-theme`.
