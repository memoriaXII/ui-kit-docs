"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import {
  EXAMPLE_CATEGORIES,
  type Example,
  type ExampleCategorySlug,
} from "@/lib/examples"
import type { ExampleFileNode } from "@/lib/examples.server"
import { cn } from "@/lib/utils"
import { ExampleViewer } from "@/components/example-viewer"

export type GalleryEntry = {
  example: Example
  tree: ExampleFileNode[]
  defaultFile: string
  files: Record<string, { language: string; highlightedCode: string }>
  sourceUrl: string
  runCommand: string
}

export function ExamplesGallery({ entries }: { entries: GalleryEntry[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialCategory = (searchParams.get("category") ??
    "featured") as ExampleCategorySlug

  const [active, setActive] = React.useState<ExampleCategorySlug>(
    EXAMPLE_CATEGORIES.some((c) => c.slug === initialCategory)
      ? initialCategory
      : "featured"
  )

  const setCategory = (slug: ExampleCategorySlug) => {
    setActive(slug)
    const params = new URLSearchParams(searchParams.toString())
    if (slug === "featured") params.delete("category")
    else params.set("category", slug)
    router.replace(`/examples${params.toString() ? `?${params}` : ""}`, {
      scroll: false,
    })
  }

  const visible = entries.filter((e) => e.example.categories.includes(active))

  // Count per category for the tab labels.
  const counts = React.useMemo(() => {
    const out: Record<string, number> = {}
    for (const c of EXAMPLE_CATEGORIES) {
      out[c.slug] = entries.filter((e) =>
        e.example.categories.includes(c.slug)
      ).length
    }
    return out
  }, [entries])

  // Auto-scroll to the targeted example on initial mount when a hash is set.
  React.useEffect(() => {
    if (typeof window === "undefined") return
    const id = window.location.hash.replace("#", "")
    if (!id) return
    // Wait one tick so the filtered list has rendered.
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    })
  }, [active])

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b">
        <div
          role="tablist"
          aria-label="Filter examples by category"
          className="flex flex-wrap items-center gap-6"
        >
          {EXAMPLE_CATEGORIES.map((cat) => {
            const isActive = cat.slug === active
            const count = counts[cat.slug] ?? 0
            return (
              <button
                key={cat.slug}
                role="tab"
                aria-selected={isActive}
                onClick={() => setCategory(cat.slug)}
                className={cn(
                  "relative flex items-center gap-2 pb-3 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground after:bg-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:content-['']"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {cat.label}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
                    isActive
                      ? "bg-foreground/10 text-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-12">
        {visible.length === 0 ? (
          <div className="text-muted-foreground py-12 text-center text-sm">
            No examples in this category yet.
          </div>
        ) : (
          visible.map((entry) => (
            <section
              key={entry.example.slug}
              id={entry.example.slug}
              className="scroll-mt-24"
            >
              <div className="mb-4 flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {entry.example.name}
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.example.tags.map((t) => (
                      <span
                        key={t}
                        className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground max-w-3xl text-sm">
                  {entry.example.description}
                </p>
              </div>

              <ExampleViewer
                slug={entry.example.slug}
                tree={entry.tree}
                iframe={entry.example.iframe}
                previewUrl={
                  "previewUrl" in entry.example
                    ? entry.example.previewUrl
                    : undefined
                }
                previewHeight={
                  "previewHeight" in entry.example
                    ? entry.example.previewHeight
                    : undefined
                }
                defaultFile={entry.defaultFile}
                files={entry.files}
                sourceUrl={entry.sourceUrl}
                runCommand={entry.runCommand}
              />
            </section>
          ))
        )}
      </div>
    </div>
  )
}
