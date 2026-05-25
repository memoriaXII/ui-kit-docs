#!/usr/bin/env node
// Copy examples/* from the sibling @appboxo/ui-kit repo into this project's
// examples/ folder. Each example's `src/`, `package.json` and `README.md`
// are copied — that's what the docs ExampleViewer reads. Other build
// artefacts (`node_modules`, `.next`, `dist`) are skipped.
//
// Runs as predev/prebuild so the docs site always sees the latest example
// source. Falls back gracefully if the kit repo isn't adjacent (CI /
// standalone clone) — the committed snapshot in `examples/` is used as-is.

import { existsSync, statSync } from "node:fs"
import { cp, mkdir, readdir, rm } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, "..")
const dest = resolve(projectRoot, "examples")
const kitExamples = resolve(projectRoot, "..", "freedom-ui-kit", "examples")

const KEEP_FILES = ["package.json", "README.md", "tsconfig.json"]
const KEEP_DIRS = ["src", "public"]

if (!existsSync(kitExamples) || !statSync(kitExamples).isDirectory()) {
  console.log(
    `[sync-examples] kit not found at ${kitExamples}; keeping local snapshot.`
  )
  process.exit(0)
}

await rm(dest, { recursive: true, force: true })
await mkdir(dest, { recursive: true })

const slugs = (await readdir(kitExamples, { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

for (const slug of slugs) {
  const src = join(kitExamples, slug)
  const out = join(dest, slug)
  await mkdir(out, { recursive: true })

  for (const file of KEEP_FILES) {
    const fp = join(src, file)
    if (existsSync(fp)) {
      await cp(fp, join(out, file), { dereference: true })
    }
  }
  for (const dir of KEEP_DIRS) {
    const dp = join(src, dir)
    if (existsSync(dp) && statSync(dp).isDirectory()) {
      await cp(dp, join(out, dir), { recursive: true, dereference: true })
    }
  }
}

console.log(
  `[sync-examples] copied ${slugs.length} examples from ${kitExamples}`
)
