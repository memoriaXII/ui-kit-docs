import { useState } from "react"

import { Body1, Flex, Input } from "@appboxo/ui-kit"

export function InputPreview() {
  const [value, setValue] = useState("")
  return (
    <Flex vertical gap={8} style={{ padding: 16 }}>
      <Body1 weight="semibold">Your name</Body1>
      <Input
        value={value}
        onChange={(_e, next) => setValue(next)}
        placeholder="e.g. Nurs"
      />
    </Flex>
  )
}
