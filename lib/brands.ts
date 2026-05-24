/**
 * Curated list of partner brands to expose in the docs theme switcher.
 * The slug must match a folder under `themes/`. Order = dropdown order.
 *
 * This module is import-safe in BOTH client and server bundles. Anything
 * that needs node:fs must live in `lib/brands.server.ts`.
 */

export const BRANDS = [
  { slug: "freedom", label: "Freedom (default)" },
  { slug: "pass-telegram", label: "Pass Telegram" },
  { slug: "pass-finom", label: "Pass Finom" },
  { slug: "telegram", label: "Telegram" },
  { slug: "snoonu", label: "Snoonu" },
  { slug: "generic", label: "Generic" },
  { slug: "mbank", label: "MBank" },
  { slug: "saib", label: "SAIB" },
] as const

export type BrandSlug = (typeof BRANDS)[number]["slug"]

export const DEFAULT_BRAND: BrandSlug = "freedom"

export type Swatch = { token: string; value: string }
