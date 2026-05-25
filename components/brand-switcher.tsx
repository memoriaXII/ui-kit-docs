"use client"

import * as React from "react"
import { Check, Palette } from "lucide-react"

import { BRAND_GROUPS, type Brand } from "@/lib/brands"
import { useBrand } from "@/components/brand-context"
import { Button } from "@/registry/ui/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/ui/ui/dropdown-menu"

export function BrandSwitcher() {
  const { brand, setBrand, brands } = useBrand()

  const current = brands.find((b) => b.slug === brand)?.label ?? brand

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-2 px-2">
          <Palette className="size-4" />
          <span className="hidden max-w-[140px] truncate text-xs font-medium sm:inline">
            {current}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="max-h-[70vh] w-64 overflow-y-auto"
      >
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Preview brand theme</span>
          <span className="text-muted-foreground text-[10px] font-normal">
            {brands.length} themes
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {BRAND_GROUPS.map((group, idx) => (
          <React.Fragment key={group.label}>
            {idx > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel className="text-muted-foreground text-[10px] font-medium uppercase tracking-wider">
              {group.label}
            </DropdownMenuLabel>
            {group.brands.map((b: Brand) => (
              <DropdownMenuItem
                key={b.slug}
                onSelect={() => setBrand(b.slug)}
                className="text-sm"
              >
                <span className="flex-1">{b.label}</span>
                {brand === b.slug ? <Check className="size-4" /> : null}
              </DropdownMenuItem>
            ))}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
