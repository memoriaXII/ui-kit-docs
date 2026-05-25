import { useState } from "react"

import { SearchBar } from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

export function SearchBarPreview() {
  const [empty, setEmpty] = useState("")
  const [filled, setFilled] = useState("starbucks")

  return (
    <PreviewLayout>
      <Section
        title="Default"
        description="Empty state with placeholder."
      >
        <SearchBar
          value={empty}
          onChange={(v) => setEmpty(v)}
          placeholder="Search rewards, stores, brands…"
        />
      </Section>

      <Section
        title="With value"
        description="Once the user types, a clear button appears."
      >
        <SearchBar
          value={filled}
          onChange={(v) => setFilled(v)}
          placeholder="Search…"
        />
      </Section>
    </PreviewLayout>
  )
}
