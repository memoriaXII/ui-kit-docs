import { useState } from "react"

import { Body1, Flex, TextArea } from "@appboxo/ui-kit"

export function TextareaPreview() {
  const [value, setValue] = useState("")
  return (
    <Flex vertical gap={8} style={{ padding: 16 }}>
      <Body1 weight="semibold">Tell us what happened</Body1>
      <TextArea
        value={value}
        onChange={(_e, next) => setValue(next)}
        placeholder="Describe the issue…"
        autoSize={{ minRows: 4, maxRows: 8 }}
      />
    </Flex>
  )
}
