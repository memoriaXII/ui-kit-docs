import { useState } from "react"

import { Body1, Flex, Input } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function InputFilledPreview() {
  const [value, setValue] = useState("nurs@boxo.com")
  return (
    <PreviewLayout>
      <Flex vertical gap={6}>
        <Body1 weight="semibold">Email</Body1>
        <Input
          value={value}
          onChange={(_e, v) => setValue(v)}
          placeholder="you@boxo.com"
        />
      </Flex>
    </PreviewLayout>
  )
}
