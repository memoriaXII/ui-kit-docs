import { useState } from "react"

import { Body1, Flex, Input } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function InputFilledPreview() {
  const [value, setValue] = useState("alex.morgan@example.com")
  return (
    <PreviewLayout>
      <Flex vertical gap={6}>
        <Body1 weight="semibold">Email</Body1>
        <Input
          value={value}
          onChange={(_e, v) => setValue(v)}
          placeholder="you@example.com"
        />
      </Flex>
    </PreviewLayout>
  )
}
