import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import {
  EXAMPLES,
  exampleRunCommand,
  exampleSourceUrl,
  type ExampleSlug,
} from "@/lib/examples"
import {
  exampleExists,
  getExampleFile,
  getExampleTree,
  type ExampleFileNode,
} from "@/lib/examples.server"
import { highlightCode } from "@/lib/highlight-code"
import { Badge } from "@/registry/ui/ui/badge"
import { Button } from "@/registry/ui/ui/button"
import { ExampleViewer } from "@/components/example-viewer"

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return EXAMPLES.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const example = EXAMPLES.find((e) => e.slug === slug)
  if (!example) return {}
  return {
    title: example.name,
    description: example.description,
  }
}

function flatten(nodes: ExampleFileNode[]): string[] {
  const out: string[] = []
  for (const node of nodes) {
    if (node.type === "file") out.push(node.path)
    else out.push(...flatten(node.children))
  }
  return out
}

/**
 * Best file to show by default. Prefer the entry point (App.tsx / main.tsx /
 * pages/_app.tsx) so the partner sees the wiring first.
 */
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

export default async function ExampleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!exampleExists(slug)) notFound()
  const example = EXAMPLES.find((e) => e.slug === slug)!
  const typedSlug = slug as ExampleSlug

  const tree = await getExampleTree(typedSlug)
  const allFiles = flatten(tree)
  const defaultFile = pickDefaultFile(allFiles)

  // Pre-highlight every file so the client can switch instantly without
  // a round-trip. At ~3-20 files per example the bundle hit is small.
  const files: Record<string, { language: string; highlightedCode: string }> =
    {}
  for (const filePath of allFiles) {
    const file = await getExampleFile(typedSlug, filePath)
    if (!file) continue
    files[filePath] = {
      language: file.language,
      highlightedCode: await highlightCode(file.content, file.language),
    }
  }

  return (
    <div className="container-wrapper section-soft flex flex-1 flex-col gap-6 pb-12">
      <div className="container">
        <div className="mb-6 flex flex-col gap-3">
          <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
            <Link href="/examples">
              <ChevronLeft className="size-4" />
              All examples
            </Link>
          </Button>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              {example.name}
            </h1>
            <div className="flex flex-wrap gap-1.5">
              {example.tags.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            {example.description}
          </p>
        </div>

        <ExampleViewer
          slug={typedSlug}
          tree={tree}
          iframe={example.iframe}
          defaultFile={defaultFile}
          files={files}
          sourceUrl={exampleSourceUrl(typedSlug)}
          runCommand={exampleRunCommand(typedSlug)}
        />
      </div>
    </div>
  )
}
