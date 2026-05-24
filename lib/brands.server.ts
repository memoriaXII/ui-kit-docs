import "server-only"

import fs from "node:fs"
import path from "node:path"

import { BRANDS } from "@/lib/brands"

const THEMES_DIR = path.resolve(process.cwd(), "themes")

/**
 * Load a brand's compiled `theme.css` and rescope its `#root` selector
 * (and a few other globals) to a `[data-freedom-brand="<slug>"]` selector so
 * all brand themes can be present in the document at once and only apply
 * inside opt-in subtrees.
 */
function loadBrandCss(slug: string): string {
  const file = path.join(THEMES_DIR, slug, "theme.css")
  if (!fs.existsSync(file)) return ""
  const raw = fs.readFileSync(file, "utf-8")

  const scope = `[data-freedom-brand="${slug}"]`

  return raw
    .replaceAll(/#root\b/g, scope)
    .replaceAll(/(^|\})\s*body\s*\{/g, `$1 ${scope} {`)
    .replaceAll(/(^|\})\s*html,\s*body\s*\{/g, `$1 ${scope} {`)
    .replaceAll(
      /(^|\})\s*\.(largeTitle|title1|title2|title3|callout|headline|body1|body2|footnote1|footnote2|regular|medium|semibold|bold)\b/g,
      `$1 ${scope} .$2`
    )
}

export function getAllBrandCss(): string {
  return BRANDS.map((b) => `/* ${b.slug} */\n${loadBrandCss(b.slug)}`).join(
    "\n\n"
  )
}

