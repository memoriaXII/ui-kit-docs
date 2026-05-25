import { useState } from "react"

import { Checkbox, Flex } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function CheckboxOutlinePreview() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)
  return (
    <PreviewLayout>
      <Flex vertical gap={10}>
        <Checkbox
          iconType="circle-outline-dot"
          checked={a}
          onChange={(v) => setA(v)}
        >
          Enable analytics
        </Checkbox>
        <Checkbox
          iconType="circle-outline-dot"
          checked={b}
          onChange={(v) => setB(v)}
        >
          Personalised recommendations
        </Checkbox>
      </Flex>
    </PreviewLayout>
  )
}
