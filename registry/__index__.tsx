// Auto-stub. Replace with build-registry output later.
// Maps component name -> { component, files } for ComponentPreview / ComponentSource lookups.

import * as React from "react"

type RegistryEntry = {
  name: string
  component: React.ComponentType
  files: Array<{ path: string; type?: string; target?: string }>
  type?: string
  registryDependencies?: string[]
  dependencies?: string[]
}

export const Index: Record<string, RegistryEntry> = {
  "freedom-button-demo": {
    name: "freedom-button-demo",
    type: "registry:example",
    files: [{ path: "registry/freedom/examples/freedom-button-demo.tsx" }],
    component: React.lazy(() =>
      import("@/registry/freedom/examples/freedom-button-demo").then((m) => ({
        default: m.default,
      }))
    ),
  },
}
