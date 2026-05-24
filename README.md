# Freedom UI Kit — Docs Site (experimental)

Sandbox / spike for evaluating whether to replace Storybook as the public docs surface for `@freedom/ui-kit`.

## What this is

A heavily stripped-down fork of [`elevenlabs/ui`](https://github.com/elevenlabs/ui) `apps/www` — kept only the docs site shell (Fumadocs + shadcn primitives + Tailwind 4 + Next 16) and replaced ElevenLabs-specific content with Freedom UI Kit placeholders.

Removed from the upstream:

- All audio / agent component sources (`orb`, `waveform`, `conversation`, etc.)
- 3D deps (`three`, `@react-three/*`), `recharts`, `swiper`, `embla-carousel`, `hls.js`
- ElevenLabs SDK packages, `@upstash/redis`, `ai`, `streamdown`
- Branded `Waldenburg` fonts and ElevenLabs-only public assets
- `apps/www/scripts/build-registry.mts` and the shadcn registry pipeline
- `app/(app)/llm`, `app/(app)/blocks`, `app/(app)/radio`, `app/(view)/view`

Kept:

- Docs shell: sidebar, MDX renderer, code blocks, tabs, command menu, ToC, search index
- Shadcn UI primitives (under `registry/elevenlabs-ui/ui/*`) — used by the docs site chrome itself
- `<ComponentPreview>` mechanism (component lookup via `registry/__index__.tsx`)
- `app/og` route (text-only Geist OG card)

## Run it

```bash
pnpm install
pnpm dev
# http://localhost:4000
```

## How preview registration works

Each MDX page can embed:

```mdx
<ComponentPreview name="freedom-button-demo" />
```

`name` is looked up in `registry/__index__.tsx` which maps a string to a React component file under `registry/freedom/examples/*.tsx`.

To add a new component preview:

1. Add a demo file under `registry/freedom/examples/<name>.tsx`.
2. Register it in `registry/__index__.tsx`.
3. Reference it from an MDX page in `content/docs/components/`.

## Wiring real `@freedom/ui-kit` components

Two open questions before wiring:

1. The kit ships less + emotion + arco-design-mobile peer deps. Either:
   - Install it as a workspace dep and live with Tailwind 4 ↔ arco-mobile CSS coexistence, or
   - Render each preview inside an `<iframe>` (sibling app on a different port) so theme/css are fully isolated.
2. Pick how the theme switcher integrates with `@freedom/ui-kit/themes/*`.

## Attribution

This site borrows large portions of `apps/www` from [`elevenlabs/ui`](https://github.com/elevenlabs/ui) (MIT licensed). See `LICENSE.upstream.md`.
