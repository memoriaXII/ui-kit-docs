# pass-freedom (example)

A reference real-world consumer of `@appboxo/ui-kit`. Forked from the
production `pass-freedom` mini-app and adapted to run standalone:

- All `@boxo/api` calls are replaced with local fixtures in `src/mocks/api/`
- All `@boxo/esim-util` helpers (`addHapticFeedback`, `pay`, `getLocation`, …)
  resolve to no-ops in `src/mocks/esim-util/`
- `@sentry/nextjs` and `@boxo/sentry-config` are stubbed
- `@boxo/esim-ui` imports have been rewritten to `@appboxo/ui-kit`

The Webpack / TS path aliases that perform the redirection live in
[`next.config.js`](./next.config.js) and [`tsconfig.json`](./tsconfig.json).

## Run

From the kit root:

```bash
pnpm install
pnpm build                # build @appboxo/ui-kit so dist/ exists

cd examples/pass-freedom
pnpm install
pnpm dev                  # http://localhost:3001
                          # (port 3001 keeps the docs site free on :3000)
```

## Verified pages

Every screen in the production `pass-freedom` app boots end-to-end against
the mock layer:

| Route                 | Status |
| --------------------- | ------ |
| `/`                   | 307 → `/passes` |
| `/passes`             | 200    |
| `/passes/detail`      | 200    |
| `/airports/search`    | 200    |
| `/booking-details`    | 200    |
| `/additional-details` | 200    |
| `/travelers`          | 200    |
| `/checkout`           | 200    |
| `/purchase-complete`  | 200    |
| `/help`               | 200    |

`/` is a thin client-side redirect to `/passes` — it mirrors the real boot
behaviour of the production app, where the Boxo iframe `useInitialRedirectIframe`
hook hands the user off to `defaultPath: "/passes"` after the auth handshake.

The legacy `/introduction` full-page route was removed in line with production
(upstream `apps/pass-freedom/src/pages/index.tsx` marks it as legacy and the
real app no longer renders it). Onboarding now lives entirely in the
`OnboardingDrawer` bottom sheet that auto-pops on `/passes` for first-time
visitors (gated by `localStorage.is_introduction_screen_displayed`). To see it
again after dismissing once, clear localStorage or use a private window.

## What this shows

- Real production page layouts (passes list, pass detail, booking flow,
  checkout, help, airports, ...) running on the kit
- Theming via the Freedom brand tokens
- Form patterns: `Input`, `DatePicker`, `TimePicker`, `SearchBar`,
  `DialCodeSelector`
- List patterns: `TouchCell`, `Card`, `Placeholder`
- Surfaces: `Drawer`, `PopupSwiper`, `Toast`, `Tip`
- Typography in real layouts

## What it doesn't show

- Real network calls — every API hook returns static fixtures
- Real authentication — `hasToken()` always returns true
- Real haptics / native bridges — all no-ops
- Real Sentry / tracking — replaced with `console.log`

For the small "hello world" version, see [`../basic-app`](../basic-app).
