// Auto-stub. Maps component name -> { component, files } for
// ComponentPreview / ComponentSource lookups. Each entry is rendered lazily
// inside MDX via <ComponentPreview name="..." />.
//
// The demos currently use shadcn primitives as visual placeholders. The real
// @appboxo/ui-kit components are rendered in the iframe preview app at
// preview:4001 — wired via the "iframe" mode of ComponentPreview.

import * as React from "react"

type RegistryEntry = {
  name: string
  component: React.ComponentType
  files: Array<{ path: string; type?: string; target?: string }>
  type?: string
  registryDependencies?: string[]
  dependencies?: string[]
}

function lazyDemo(name: string) {
  return React.lazy(() =>
    import(`@/registry/examples/${name}`).then((m) => ({
      default: m.default,
    }))
  )
}

function example(name: string): RegistryEntry {
  return {
    name,
    type: "registry:example",
    files: [{ path: `registry/examples/${name}.tsx` }],
    component: lazyDemo(name),
  }
}

export const Index: Record<string, RegistryEntry> = {
  // Legacy alias still referenced by the root index.mdx.
  "freedom-button-demo": example("button-demo"),

  "button-demo": example("button-demo"),
  "card-demo": example("card-demo"),
  "checkbox-demo": example("checkbox-demo"),
  "copyable-demo": example("copyable-demo"),
  "date-picker-demo": example("date-picker-demo"),
  "dial-code-selector-demo": example("dial-code-selector-demo"),
  "drawer-demo": example("drawer-demo"),
  "flex-demo": example("flex-demo"),
  "footer-demo": example("footer-demo"),
  "hooks-demo": example("hooks-demo"),
  "input-demo": example("input-demo"),
  "layout-demo": example("layout-demo"),
  "layout-loading-demo": example("layout-loading-demo"),
  "markdown-demo": example("markdown-demo"),
  "picker-input-demo": example("picker-input-demo"),
  "placeholder-demo": example("placeholder-demo"),
  "popup-swiper-demo": example("popup-swiper-demo"),
  "providers-demo": example("providers-demo"),
  "radio-demo": example("radio-demo"),
  "responsive-layout-demo": example("responsive-layout-demo"),
  "search-bar-demo": example("search-bar-demo"),
  "summary-table-demo": example("summary-table-demo"),
  "tabs-demo": example("tabs-demo"),
  "textarea-demo": example("textarea-demo"),
  "time-picker-demo": example("time-picker-demo"),
  "tip-demo": example("tip-demo"),
  "toast-demo": example("toast-demo"),
  "touch-cell-demo": example("touch-cell-demo"),
  "typography-demo": example("typography-demo"),
}
