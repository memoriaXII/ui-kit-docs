import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import { EXAMPLES, type ExampleSlug } from "@/lib/examples"
import { loadExampleData } from "@/lib/examples-data"
import { exampleExists } from "@/lib/examples.server"
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

export default async function ExampleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!exampleExists(slug)) notFound()
  const example = EXAMPLES.find((e) => e.slug === slug)!
  const typedSlug = slug as ExampleSlug
  const data = await loadExampleData(typedSlug)

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
          tree={data.tree}
          iframe={example.iframe}
          previewUrl={"previewUrl" in example ? example.previewUrl : undefined}
          defaultFile={data.defaultFile}
          files={data.files}
          sourceUrl={data.sourceUrl}
          runCommand={data.runCommand}
        />
      </div>
    </div>
  )
}
