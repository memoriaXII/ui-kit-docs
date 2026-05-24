// Auto-stub. Maps component name -> { component, files } for
// ComponentPreview / ComponentSource lookups. Each entry is rendered lazily
// inside MDX via <ComponentPreview name="..." />.

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
    import(`@/registry/freedom/examples/${name}`).then((m) => ({
      default: m.default,
    }))
  )
}

function example(name: string): RegistryEntry {
  return {
    name,
    type: "registry:example",
    files: [{ path: `registry/freedom/examples/${name}.tsx` }],
    component: lazyDemo(name),
  }
}

export const Index: Record<string, RegistryEntry> = {
  // Legacy alias used in /docs landing page.
  "freedom-button-demo": example("button-demo"),

  "button-demo": example("button-demo"),
  "card-demo": example("card-demo"),
  "checkbox-demo": example("checkbox-demo"),
  "date-picker-demo": example("date-picker-demo"),
  "dial-code-selector-demo": example("dial-code-selector-demo"),
  "drawer-demo": example("drawer-demo"),
  "input-demo": example("input-demo"),
  "radio-demo": example("radio-demo"),
  "search-bar-demo": example("search-bar-demo"),
  "tabs-demo": example("tabs-demo"),
  "textarea-demo": example("textarea-demo"),
  "time-picker-demo": example("time-picker-demo"),
  "tip-demo": example("tip-demo"),
  "toast-demo": example("toast-demo"),
}
