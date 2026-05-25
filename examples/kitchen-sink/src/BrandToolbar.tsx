/// <reference types="vite/client" />
import { useLayoutEffect, useMemo } from "react";

// Re-uses the same trick the Storybook preview uses: pull every
// compiled brand stylesheet in as a raw string at build time, then
// swap the active brand by rewriting a single <style> tag's
// textContent. Faster than round-tripping through a <link href>
// load, and avoids fighting Vite's CSS plugin over how `?url`
// resolves built assets in dev vs. preview.
const BRAND_CSS_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(
    import.meta.glob("../../../themes/*/theme.css", {
      eager: true,
      import: "default",
      query: "?raw",
    }) as Record<string, string>,
  )
    .map(([path, css]) => {
      const match = path.match(/themes\/([^/]+)\/theme\.css/);
      return match ? ([match[1], css] as const) : null;
    })
    .filter((entry): entry is readonly [string, string] => entry !== null),
);

const BRAND_OPTIONS = Object.keys(BRAND_CSS_MAP)
  // `default` is permanently loaded as the baseline by main.tsx, so
  // exposing it in the toolbar would just be a "do nothing" choice.
  .filter((b) => b !== "default")
  .sort();

const ACTIVE_BRAND_STYLE_ID = "__kitchen-sink-active-brand-theme";

export function applyBrand(brand: string): void {
  let el = document.getElementById(
    ACTIVE_BRAND_STYLE_ID,
  ) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = ACTIVE_BRAND_STYLE_ID;
    document.head.appendChild(el);
  }
  el.textContent = BRAND_CSS_MAP[brand] ?? "";
}

export interface BrandToolbarProps {
  brand: string;
  onBrandChange: (brand: string) => void;
  dark: boolean;
  onDarkChange: (dark: boolean) => void;
}

export function BrandToolbar({
  brand,
  onBrandChange,
  dark,
  onDarkChange,
}: BrandToolbarProps) {
  // Group brands so the dropdown isn't an undifferentiated 35-row
  // wall of names. Buckets mirror the catalog in `themes/README.md`.
  const groupedBrands = useMemo(() => {
    const groups: Array<[string, string[]]> = [
      ["Core / generic", ["freedom", "generic", "base", "storybook"]],
      [
        "Pass / Lounge / Voucher / Hotel",
        [
          "pass-finom",
          "pass-telegram",
          "lounge-adib",
          "lounge-telegram",
          "voucher-riyad",
          "voucher-snoo",
          "hotel-telegram",
        ],
      ],
    ];
    const used = new Set(groups.flatMap(([, b]) => b));
    const rest = BRAND_OPTIONS.filter((b) => !used.has(b));
    groups.push(["Banks & fintechs", rest]);
    return groups;
  }, []);

  // useLayoutEffect rather than useEffect: components downstream
  // (e.g. ColorTokensSection's swatch labels) read CSS custom
  // properties via getComputedStyle inside their own
  // useLayoutEffect. We have to mutate the brand stylesheet *before*
  // those run so they observe the new tokens, otherwise the swatch
  // labels stay one brand behind.
  useLayoutEffect(() => {
    applyBrand(brand);
  }, [brand]);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "var(--fill-white)",
        borderBottom: "1px solid var(--line-1)",
        padding: "12px 16px",
        display: "flex",
        gap: 16,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <strong style={{ color: "var(--text-5)", fontSize: 16 }}>
        @appboxo/ui-kit · kitchen sink
      </strong>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "var(--text-4)",
          fontSize: 13,
        }}
      >
        Brand
        <select
          value={brand}
          onChange={(e) => onBrandChange(e.target.value)}
          style={{
            background: "var(--fill-1)",
            color: "var(--text-5)",
            border: "1px solid var(--line-1)",
            borderRadius: 6,
            padding: "6px 10px",
            fontSize: 14,
            minWidth: 180,
          }}
        >
          {groupedBrands.map(([groupLabel, brands]) => (
            <optgroup key={groupLabel} label={groupLabel}>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "var(--text-4)",
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={dark}
          onChange={(e) => onDarkChange(e.target.checked)}
        />
        Dark mode
      </label>

      <span
        style={{
          color: "var(--text-3)",
          fontSize: 12,
          marginLeft: "auto",
        }}
      >
        {BRAND_OPTIONS.length + 1} themes available · stored in localStorage
      </span>
    </div>
  );
}

export const DEFAULT_BRAND = "freedom";
