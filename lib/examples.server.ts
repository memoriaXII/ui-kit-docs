import "server-only"

import fs from "node:fs/promises"
import path from "node:path"

import { EXAMPLES, type ExampleSlug } from "@/lib/examples"

const EXAMPLES_DIR = path.resolve(process.cwd(), "examples")

export type ExampleFileNode =
  | { type: "file"; name: string; path: string }
  | { type: "dir"; name: string; path: string; children: ExampleFileNode[] }

const SKIP_FILES = new Set([
  "node_modules",
  ".next",
  "dist",
  ".vite",
  ".turbo",
  ".cache",
  "tsconfig.tsbuildinfo",
  "pnpm-lock.yaml",
  "package-lock.json",
])

/**
 * Directories we hide from the docs file tree entirely. These are runtime
 * assets (locale bundles, lottie animations, images) that the consumer
 * doesn't need to read source for. The kit's pass-freedom example ships
 * a 28MB confetti animation JSON — pre-highlighting it ballooned the
 * static page payload past Vercel's 19MB ISR limit.
 */
const SKIP_DIR_NAMES = new Set([
  "animations",
  "locales",
  "fonts",
])

/** Hard cap per file — anything bigger is shown in the tree but its
 * contents are skipped so the page payload stays bounded. */
const MAX_FILE_BYTES = 64 * 1024 // 64 KB

async function walk(
  absDir: string,
  relDir: string,
  insidePublic = false
): Promise<ExampleFileNode[]> {
  const entries = await fs.readdir(absDir, { withFileTypes: true })
  const out: ExampleFileNode[] = []
  for (const entry of entries) {
    if (SKIP_FILES.has(entry.name) || entry.name.startsWith(".")) continue
    // Hide asset-heavy directories. `public/` itself is allowed (so e.g.
    // `public/favicon.ico` shows up), but any nested SKIP_DIR_NAMES is
    // dropped — that's where the multi-MB JSON lottie files live.
    if (SKIP_DIR_NAMES.has(entry.name)) continue
    const relPath = path.join(relDir, entry.name)
    const absPath = path.join(absDir, entry.name)
    if (entry.isDirectory()) {
      const isPublic = insidePublic || entry.name === "public"
      const children = await walk(absPath, relPath, isPublic)
      if (children.length > 0) {
        out.push({ type: "dir", name: entry.name, path: relPath, children })
      }
    } else {
      out.push({ type: "file", name: entry.name, path: relPath })
    }
  }
  // Folders first, then alphabetical
  out.sort((a, b) => {
    if (a.type !== b.type) return a.type === "dir" ? -1 : 1
    return a.name.localeCompare(b.name)
  })
  return out
}

export async function getExampleTree(
  slug: ExampleSlug
): Promise<ExampleFileNode[]> {
  const root = path.join(EXAMPLES_DIR, slug)
  try {
    return await walk(root, "")
  } catch {
    return []
  }
}

const TEXT_EXT = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".mdx",
  ".css",
  ".less",
  ".scss",
  ".html",
  ".yaml",
  ".yml",
  ".env",
])

export async function getExampleFile(
  slug: ExampleSlug,
  relPath: string
): Promise<{ content: string; language: string } | null> {
  const abs = path.join(EXAMPLES_DIR, slug, relPath)
  // Path traversal guard.
  if (!abs.startsWith(path.join(EXAMPLES_DIR, slug) + path.sep)) return null
  const ext = path.extname(relPath).toLowerCase()
  if (!TEXT_EXT.has(ext) && path.basename(relPath) !== "package.json") {
    return null
  }
  // Size cap so a single multi-MB JSON can't blow past Vercel's static
  // page size limit. The tree still lists the file; the viewer just
  // shows a stub asking the reader to open it on GitHub.
  try {
    const stat = await fs.stat(abs)
    if (stat.size > MAX_FILE_BYTES) {
      return {
        content: `// File is ${(stat.size / 1024).toFixed(0)} KB — too large to inline.\n// View the full source on GitHub.\n`,
        language: "ts",
      }
    }
  } catch {
    return null
  }
  try {
    const content = await fs.readFile(abs, "utf-8")
    const language =
      ext === ".tsx" || ext === ".ts"
        ? "tsx"
        : ext === ".json"
          ? "json"
          : ext === ".less"
            ? "less"
            : ext === ".css"
              ? "css"
              : ext === ".md" || ext === ".mdx"
                ? "md"
                : "ts"
    return { content, language }
  } catch {
    return null
  }
}

export function exampleExists(slug: string): slug is ExampleSlug {
  return EXAMPLES.some((e) => e.slug === slug)
}
