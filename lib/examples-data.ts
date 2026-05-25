import "server-only"

import {
  EXAMPLES,
  exampleRunCommand,
  exampleSourceUrl,
  type ExampleSlug,
} from "@/lib/examples"
import {
  getExampleFile,
  getExampleTree,
  type ExampleFileNode,
} from "@/lib/examples.server"
import { highlightCode } from "@/lib/highlight-code"

/**
 * Shape consumed by both the inline gallery on /examples and the deep-link
 * detail page at /examples/[slug]. Centralised so both paths show the same
 * tree, default file pick and pre-highlighted source.
 */
export type ExampleData = {
  tree: ExampleFileNode[]
  defaultFile: string
  files: Record<string, { language: string; highlightedCode: string }>
  sourceUrl: string
  runCommand: string
}

function flatten(nodes: ExampleFileNode[]): string[] {
  const out: string[] = []
  for (const node of nodes) {
    if (node.type === "file") out.push(node.path)
    else out.push(...flatten(node.children))
  }
  return out
}

/** Best file to show by default — entry point first. */
function pickDefaultFile(files: string[]): string {
  const priority = [
    "src/App.tsx",
    "src/main.tsx",
    "src/pages/_app.tsx",
    "src/pages/index.tsx",
    "package.json",
  ]
  for (const p of priority) {
    if (files.includes(p)) return p
  }
  return files[0] ?? "package.json"
}

export async function loadExampleData(slug: ExampleSlug): Promise<ExampleData> {
  const tree = await getExampleTree(slug)
  const allFiles = flatten(tree)
  const defaultFile = pickDefaultFile(allFiles)
  const files: Record<string, { language: string; highlightedCode: string }> =
    {}
  for (const filePath of allFiles) {
    const file = await getExampleFile(slug, filePath)
    if (!file) continue
    files[filePath] = {
      language: file.language,
      highlightedCode: await highlightCode(file.content, file.language),
    }
  }
  return {
    tree,
    defaultFile,
    files,
    sourceUrl: exampleSourceUrl(slug),
    runCommand: exampleRunCommand(slug),
  }
}

export async function loadAllExamples() {
  const entries = []
  for (const example of EXAMPLES) {
    const data = await loadExampleData(example.slug)
    entries.push({ example, ...data })
  }
  return entries
}
