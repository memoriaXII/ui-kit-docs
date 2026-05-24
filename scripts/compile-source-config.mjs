// Workaround: fumadocs-mdx 11.6.3's bin only generates `.source/index.ts`
// (types), it does NOT also compile `source.config.ts` to
// `.source/source.config.mjs`, which the runtime needs at request time.
// We compile it ourselves with esbuild so dev/build are deterministic.

import { build } from "esbuild"

await build({
  entryPoints: [{ in: "source.config.ts", out: "source.config" }],
  bundle: true,
  outdir: ".source",
  target: "node18",
  write: true,
  platform: "node",
  format: "esm",
  packages: "external",
  outExtension: { ".js": ".mjs" },
  allowOverwrite: true,
})

console.log("[fumadocs] compiled .source/source.config.mjs")
