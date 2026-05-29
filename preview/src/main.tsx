// Arco Mobile's component CSS must load before the kit theme so the
// kit's --* tokens win the cascade.
import "@arco-design/mobile-react/esm/style"
// The kit's own component-local stylesheets (Input border, Card padding,
// Tip icon, Toast layout, etc.). Without this most kit components render
// half-styled — Input shows no border, Card has no padding, etc.
import "@appboxo/ui-kit/styles.css"
// Inject every brand stylesheet as a raw string at build time. We
// flip between them at runtime by mutating a single <style> tag,
// matching the Storybook brand toolbar mechanism used by the kit.
// (See ~/freedom-ui-kit/.storybook/preview.tsx for the original.)

import React from "react"
import ReactDOM from "react-dom/client"
import { ContextProvider } from "@arco-design/mobile-react"
import { UIKitProvider } from "@appboxo/ui-kit"
// Arco Mobile defaults its locale to zh-CN, so built-in strings (SearchBar
// "取消", DatePicker "确定/取消", etc.) render in Chinese. Force English.
// @ts-expect-error - the en-US locale file ships without type declarations
import enUS from "@arco-design/mobile-utils/esm/locale/en-US"

import { App } from "./App"
import "./kit-overrides.css"

// Build-time inline: every brand's compiled theme.css as a string.
const BRAND_CSS_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(
    import.meta.glob("../../themes/*/theme.css", {
      eager: true,
      import: "default",
      query: "?raw",
    }) as Record<string, string>
  )
    .map(([path, css]) => {
      const m = path.match(/themes\/([^/]+)\/theme\.css/)
      return m ? ([m[1], css] as const) : null
    })
    .filter((e): e is readonly [string, string] => e !== null)
)

/**
 * Brand themes ship `body { background-color: var(--fill-white); }` (and a
 * dark-mode override) — fine inside a standalone app, ugly inside a docs
 * iframe where the surrounding chrome is already white. This override is
 * appended after every brand CSS swap so the body always stays
 * transparent regardless of which brand is active.
 */
const BG_OVERRIDE = `
html, body, #root {
  background: transparent !important;
}
`

const ACTIVE_BRAND_STYLE_ID = "__active-brand-theme"

function applyBrand(brand: string) {
  let el = document.getElementById(
    ACTIVE_BRAND_STYLE_ID
  ) as HTMLStyleElement | null
  if (!el) {
    el = document.createElement("style")
    el.id = ACTIVE_BRAND_STYLE_ID
    document.head.appendChild(el)
  }
  el.textContent =
    (BRAND_CSS_MAP[brand] ?? BRAND_CSS_MAP.freedom ?? "") + BG_OVERRIDE
}

// Required setup. See troubleshooting.mdx — without these the kit
// renders at 3x scale and themes don't apply.
document.body.id = "root"
document.documentElement.style.fontSize = "50px"

// Resolve initial brand / dark from URL.
function parseQuery() {
  const params = new URLSearchParams(window.location.search)
  return {
    brand: params.get("brand") ?? "freedom",
    dark: params.get("dark") === "true",
  }
}

const initial = parseQuery()
applyBrand(initial.brand)

function mount(brand: string, dark: boolean) {
  applyBrand(brand)
  document.documentElement.classList.toggle("arco-theme-dark", dark)
  root.render(
    <React.StrictMode>
      <ContextProvider
        system="ios"
        locale={enUS}
        useRtl={false}
        useDarkMode={dark}
      >
        <UIKitProvider>
          <App />
        </UIKitProvider>
      </ContextProvider>
    </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root")!)
mount(initial.brand, initial.dark)

// Allow the docs site to drive brand / dark mode from outside the
// iframe via postMessage.
window.addEventListener("message", (event) => {
  const data = event.data
  if (!data || data.type !== "freedom-preview:update") return
  const brand: string = data.brand ?? initial.brand
  const dark: boolean = data.dark ?? initial.dark
  mount(brand, dark)
})
