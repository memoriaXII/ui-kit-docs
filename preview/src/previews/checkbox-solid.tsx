import { useState } from "react"

import { Checkbox, Flex } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function CheckboxSolidPreview() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)
  return (
    <PreviewLayout>
      <Flex vertical gap={10}>
        <Checkbox iconType="circle-dot" checked={a} onChange={(v) => setA(v)}>
          Accept terms and conditions
        </Checkbox>
        <Checkbox iconType="circle-dot" checked={b} onChange={(v) => setB(v)}>
          Subscribe to newsletter
        </Checkbox>
      </Flex>
    </PreviewLayout>
  )
}
