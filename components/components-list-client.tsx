"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { useBrand } from "@/components/brand-context"
import { Index } from "@/registry/__index__"

type Item = { id: string; name: string; url: string }

export function ComponentsListClient({ list }: { list: Item[] }) {
  const { brand } = useBrand()

  return (
    <div
      data-freedom-brand={brand}
      className="not-prose grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {list.map((component) => {
        const slug = component.url.split("/").pop() ?? ""
        const Demo = Index[`${slug}-demo`]?.component

        return (
          <Link
            key={component.id}
            href={component.url}
            className="group bg-card text-card-foreground hover:border-foreground/30 relative flex flex-col overflow-hidden rounded-lg border transition-colors"
          >
            <div className="bg-muted/40 group-hover:bg-muted/60 relative flex h-40 items-center justify-center overflow-hidden px-4 transition-colors">
              <div className="pointer-events-none flex h-full w-full items-center justify-center [&>*]:max-h-full [&>*]:max-w-full [&>*]:origin-center [&>*]:[transform:scale(0.78)] [&>*]:[transition:none]">
                {Demo ? (
                  <React.Suspense fallback={null}>
                    <Demo />
                  </React.Suspense>
                ) : (
                  <span className="text-muted-foreground text-xs">
                    No preview
                  </span>
                )}
              </div>
              <ArrowUpRight className="text-muted-foreground absolute top-3 right-3 size-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="flex flex-col gap-1 border-t px-4 py-3">
              <div className="text-sm font-medium">{component.name}</div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
