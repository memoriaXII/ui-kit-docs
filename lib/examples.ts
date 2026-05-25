/**
 * Curated metadata for the examples shown on /examples. Each `slug` must
 * match a folder under `examples/` (synced from `../freedom-ui-kit/examples/`
 * by scripts/sync-examples.mjs).
 *
 * `iframe: true` means the preview app at :4001 has a corresponding route
 * `/example/<slug>` that mounts the example inside Arco + UIKitProvider.
 * Examples flagged false render as docs-only (file tree + code + run
 * snippet, no live preview).
 */

export const EXAMPLES = [
  {
    slug: "basic-app",
    name: "Basic App",
    description:
      "70-line hello world. The minimum @appboxo/ui-kit consumer that still looks like a real screen.",
    tags: ["Vite", "Starter"],
    iframe: true,
  },
  {
    slug: "kitchen-sink",
    name: "Kitchen Sink",
    description:
      "Single-page kit gallery: every component on one page with a brand toolbar (37 themes) and light/dark toggle.",
    tags: ["Vite", "All components", "Brand toolbar"],
    iframe: true,
  },
  {
    slug: "freedom-theme",
    name: "Freedom Theme",
    description:
      "Paired example A. Same App.tsx as custom-theme but rendered with the bundled themes/freedom/theme.css.",
    tags: ["Vite", "Theming"],
    iframe: true,
  },
  {
    slug: "custom-theme",
    name: "Custom Theme",
    description:
      "Paired example B. Same App.tsx but using themes/default + a 30-line my-brand.css overlay (fictional Citrus brand). `diff -r` against freedom-theme shows exactly what BYO theming costs. Run locally to see the orange Citrus palette in action.",
    tags: ["Vite", "Theming", "BYO brand"],
    iframe: false,
  },
  {
    slug: "pass-freedom",
    name: "Pass Freedom",
    description:
      "Full 11-page mini-app forked from production pass-freedom. All backend / host calls stubbed. Best soak test for the kit.",
    tags: ["Next.js", "Full app", "Mocked backend"],
    iframe: false,
  },
  {
    slug: "with-npm-quickstart",
    name: "npm Quickstart",
    description:
      "Smallest possible consumer that installs @appboxo/ui-kit from npm and renders one button. Use as a sanity check.",
    tags: ["Vite", "npm"],
    iframe: false,
  },
] as const

export type ExampleSlug = (typeof EXAMPLES)[number]["slug"]

export type Example = (typeof EXAMPLES)[number]

export const KIT_REPO = "https://github.com/Appboxo/ui-kit"

export function exampleSourceUrl(slug: string) {
  return `${KIT_REPO}/tree/main/examples/${slug}`
}

export function exampleRunCommand(slug: string) {
  return `git clone ${KIT_REPO} && cd ui-kit/examples/${slug} && pnpm install && pnpm dev`
}
