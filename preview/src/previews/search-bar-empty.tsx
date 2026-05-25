import { useState } from "react"

import { SearchBar } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function SearchBarEmptyPreview() {
  const [value, setValue] = useState("")
  return (
    <PreviewLayout>
      <SearchBar
        value={value}
        onChange={(v) => setValue(v)}
        placeholder="Search rewards, stores, brands…"
      />
    </PreviewLayout>
  )
}
