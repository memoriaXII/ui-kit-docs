"use client"

import * as React from "react"

import { BRANDS, DEFAULT_BRAND, type BrandSlug } from "@/lib/brands"

type BrandContextValue = {
  brand: BrandSlug
  setBrand: (brand: BrandSlug) => void
  brands: typeof BRANDS
}

const STORAGE_KEY = "freedom-docs-brand"

const BrandContext = React.createContext<BrandContextValue | null>(null)

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brand, setBrandState] = React.useState<BrandSlug>(DEFAULT_BRAND)

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored && BRANDS.some((b) => b.slug === stored)) {
        setBrandState(stored as BrandSlug)
      }
    } catch {
      // ignore
    }
  }, [])

  const setBrand = React.useCallback((next: BrandSlug) => {
    setBrandState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  const value = React.useMemo(
    () => ({ brand, setBrand, brands: BRANDS }),
    [brand, setBrand]
  )

  return (
    <BrandContext.Provider value={value}>{children}</BrandContext.Provider>
  )
}

export function useBrand() {
  const ctx = React.useContext(BrandContext)
  if (!ctx) {
    return {
      brand: DEFAULT_BRAND,
      setBrand: () => {},
      brands: BRANDS,
    } satisfies BrandContextValue
  }
  return ctx
}
