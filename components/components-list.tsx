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
    .filter((c) => c.type === "page" && c.$id !== "components/index")
    .map((c) => ({
      id: c.$id,
      name: typeof c.name === "string" ? c.name : String(c.name),
      url: c.url,
    }))

  return <ComponentsListClient list={list} />
}
