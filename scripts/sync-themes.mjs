#!/usr/bin/env node
// Copy themes/* from the sibling @appboxo/ui-kit repo into this project's
// themes/ folder. We can't symlink because Turbopack refuses to traverse
// "leaves the filesystem root" symlinks during PostCSS processing.
//
// Runs as predev/prebuild so the docs site always picks up the latest
// brand CSS the kit publishes. Falls back gracefully if the kit repo is
// not adjacent (CI / standalone clone), leaving an existing themes/ in
// place.

import { existsSync, statSync } from "node:fs"
import { cp, mkdir, rm } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, "..")
const themesDest = resolve(projectRoot, "themes")
const kitThemes = resolve(projectRoot, "..", "freedom-ui-kit", "themes")

if (!existsSync(kitThemes) || !statSync(kitThemes).isDirectory()) {
  if (!existsSync(themesDest)) {
    console.warn(
      `[sync-themes] kit themes not found at ${kitThemes} and no local copy exists; brand switcher will be empty.`
    )
  } else {
    console.log(
      `[sync-themes] kit themes not found at ${kitThemes}; keeping existing local copy.`
    )
  }
  process.exit(0)
}

await rm(themesDest, { recursive: true, force: true })
await mkdir(themesDest, { recursive: true })
await cp(kitThemes, themesDest, { recursive: true, dereference: true })

console.log(`[sync-themes] copied themes from ${kitThemes}`)
