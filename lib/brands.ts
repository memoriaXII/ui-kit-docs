/**
 * Every partner brand the kit ships, exposed in the docs theme switcher.
 * Slugs match folders under `themes/` (synced from `../freedom-ui-kit/themes`
 * by scripts/sync-themes.mjs). Grouped to keep the 37-item dropdown
 * scannable; see kit's `themes/README.md` for the source of these groupings.
 *
 * Import-safe in BOTH client and server bundles. Anything that needs
 * node:fs lives in `lib/brands.server.ts`.
 */

export type Brand = { slug: string; label: string }

export const BRAND_GROUPS: { label: string; brands: Brand[] }[] = [
  {
    label: "Core",
    brands: [
      { slug: "freedom", label: "Freedom (default)" },
      { slug: "default", label: "Neutral default" },
      { slug: "generic", label: "Generic" },
    ],
  },
  {
    label: "Pass family",
    brands: [
      { slug: "pass-finom", label: "Pass Finom" },
      { slug: "pass-telegram", label: "Pass Telegram" },
    ],
  },
  {
    label: "Lounge family",
    brands: [
      { slug: "lounge-adib", label: "Lounge ADIB" },
      { slug: "lounge-telegram", label: "Lounge Telegram" },
    ],
  },
  {
    label: "Voucher family",
    brands: [
      { slug: "voucher-riyad", label: "Voucher Riyad" },
      { slug: "voucher-snoo", label: "Voucher Snoo" },
    ],
  },
  {
    label: "Hotel",
    brands: [{ slug: "hotel-telegram", label: "Hotel Telegram" }],
  },
  {
    label: "Bank / fintech",
    brands: [
      { slug: "adib", label: "ADIB" },
      { slug: "aya", label: "Aya" },
      { slug: "dana", label: "Dana" },
      { slug: "dolphin", label: "Dolphin" },
      { slug: "extsy", label: "Extsy" },
      { slug: "finom", label: "Finom" },
      { slug: "forma", label: "Forma" },
      { slug: "hyra", label: "Hyra" },
      { slug: "kem", label: "KEM" },
      { slug: "maya", label: "Maya" },
      { slug: "mbank", label: "MBank" },
      { slug: "mcash", label: "MCash" },
      { slug: "minipay", label: "MiniPay" },
      { slug: "moni", label: "Moni" },
      { slug: "nectarfi", label: "NectarFi" },
      { slug: "ogold", label: "OGold" },
      { slug: "reab", label: "Reab" },
      { slug: "remittance", label: "Remittance" },
      { slug: "riyad", label: "Riyad" },
      { slug: "saib", label: "SAIB" },
      { slug: "sajda", label: "Sajda" },
      { slug: "sindibad", label: "Sindibad" },
      { slug: "snoonu", label: "Snoonu" },
      { slug: "telegram", label: "Telegram" },
      { slug: "tfh", label: "TFH" },
      { slug: "uab", label: "UAB" },
    ],
  },
]

export const BRANDS: Brand[] = BRAND_GROUPS.flatMap((g) => g.brands)

export type BrandSlug = (typeof BRANDS)[number]["slug"]

export const DEFAULT_BRAND: BrandSlug = "freedom"
