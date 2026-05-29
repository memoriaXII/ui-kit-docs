import { useState } from "react"

import { Body1, Flex, Input } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function InputDefaultPreview() {
  const [value, setValue] = useState("")
  return (
    <PreviewLayout>
      <Flex vertical gap={6}>
        <Body1 weight="semibold">Your name</Body1>
        <Input
          value={value}
          onChange={(_e, v) => setValue(v)}
          placeholder="e.g. Alex Morgan"
        />
      </Flex>
    </PreviewLayout>
  )
}
