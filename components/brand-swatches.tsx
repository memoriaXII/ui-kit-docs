"use client"

import * as React from "react"

import { useBrand } from "@/components/brand-context"
import type { Swatch } from "@/lib/brands"

type Props = {
  swatchesByBrand: Record<string, Swatch[]>
}

export function BrandSwatches({ swatchesByBrand }: Props) {
  const { brand } = useBrand()
  const swatches = swatchesByBrand[brand] ?? []

  if (swatches.length === 0) {
    return null
  }

  return (
    <div className="not-prose bg-muted/40 flex flex-wrap items-center gap-3 rounded-md border border-dashed px-3 py-2 text-xs">
      <span className="text-muted-foreground font-medium">{brand} tokens</span>
      {swatches.map((s) => (
        <div key={s.token} className="flex items-center gap-1.5">
          <span
            className="ring-border inline-block size-4 rounded-sm ring-1"
            style={{ backgroundColor: s.value }}
            title={`--${s.token}: ${s.value}`}
          />
          <span className="text-muted-foreground font-mono">{s.token}</span>
        </div>
      ))}
    </div>
  )
}
