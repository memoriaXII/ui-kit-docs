"use client"

import { Check, Palette } from "lucide-react"

import { useBrand } from "@/components/brand-context"
import { Button } from "@/registry/elevenlabs-ui/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/elevenlabs-ui/ui/dropdown-menu"

export function BrandSwitcher() {
  const { brand, setBrand, brands } = useBrand()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-2 px-2">
          <Palette className="size-4" />
          <span className="hidden text-xs font-medium sm:inline">
            {brands.find((b) => b.slug === brand)?.label ?? brand}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Preview brand theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {brands.map((b) => (
          <DropdownMenuItem key={b.slug} onSelect={() => setBrand(b.slug)}>
            <span className="flex-1 text-sm">{b.label}</span>
            {brand === b.slug ? <Check className="size-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
