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

async function walk(absDir: string, relDir: string): Promise<ExampleFileNode[]> {
  const entries = await fs.readdir(absDir, { withFileTypes: true })
  const out: ExampleFileNode[] = []
  for (const entry of entries) {
    if (SKIP_FILES.has(entry.name) || entry.name.startsWith(".")) continue
    const relPath = path.join(relDir, entry.name)
    const absPath = path.join(absDir, entry.name)
    if (entry.isDirectory()) {
      const children = await walk(absPath, relPath)
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
