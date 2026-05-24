import { source } from "@/lib/source"
import { ComponentsListClient } from "@/components/components-list-client"

export function ComponentsList() {
  const components = source.pageTree.children.find(
    (page) => page.$id === "components"
  )

  if (components?.type !== "folder") {
    return null
  }

  const list = components.children
    .filter(
      (c) =>
        c.type === "page" &&
        // The folder's own index page (Components) renders this list,
        // so skip it to avoid a recursive-looking card.
        c.url !== "/docs/components"
    )
    .map((c) => ({
      id: c.$id,
      name: typeof c.name === "string" ? c.name : String(c.name),
      url: c.url,
    }))

  return <ComponentsListClient list={list} />
}
