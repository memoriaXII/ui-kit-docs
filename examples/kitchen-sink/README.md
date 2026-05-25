# `examples/kitchen-sink` — kit-wide preview page

A single Vite page that lays every `@appboxo/ui-kit` export out in
context, so designers and PMs can scan a brand's full visual
treatment without clicking through Storybook stories one by one.

The "kitchen sink" naming follows the convention used by Material
UI, Ant Design, React Native and friends: one route, every
component, every state — handy for design review and brand QA.

## What it covers

- **Typography** — every named scale (largeTitle → caption2) and
  weight, so font-size / line-height / letter-spacing tokens are
  immediately visible.
- **Color tokens** — swatches for the full token contract (primary,
  success, danger, warning, info, text, fill). Useful for spotting
  brand mistakes (e.g. a primary that doesn't have enough contrast
  with `--text-1`).
- **Buttons** — all four variants (Primary / Secondary / Tertiary /
  Quaternary) in default, disabled and small-with-loading states.
- **Form inputs** — `Input`, `TextArea`, `Checkbox`, `Radio`,
  `SearchBar`, `PickerInput`, `DialCodeSelector`, `DatePicker`,
  `TimePicker`.
- **Display** — `Card`, `TouchCell`, `SummaryTable`, `Tip`,
  `Placeholder`, `Copyable`.
- **Layout primitives** — `Flex`, `ResponsiveLayout`, `Footer`,
  `LayoutLoading`, `NavBar`.
- **Interactive overlays** — `Toast` (info / error / success),
  `Drawer`, `PopupSwiper`.
- **Icons** — every kit-shipped SVG icon at three sizes.

## How brand switching works

The header dropdown lists all 37 themes (default + freedom + 35
partner brands). Switching a brand swaps the active stylesheet
without reloading the page; light/dark toggles `useDarkMode` on
Arco's `ContextProvider` and adds `arco-theme-dark` to `#root`.

The brand and dark-mode choice persist to `localStorage` so reloads
keep the same look.

## Running

```bash
pnpm install
pnpm --filter appboxo-ui-kit-kitchen-sink dev
```

Or from this directory:

```bash
pnpm dev   # vite dev server
pnpm build # type-check + production build
```
