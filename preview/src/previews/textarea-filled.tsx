import { useState } from "react"

import { Body1, Flex, TextArea } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function TextareaFilledPreview() {
  const [value, setValue] = useState(
    "App froze on the checkout screen after I tapped Confirm. Lost my session twice."
  )
  return (
    <PreviewLayout>
      <Flex vertical gap={6}>
        <Body1 weight="semibold">Bug report</Body1>
        <TextArea
          value={value}
          onChange={(_e, v) => setValue(v)}
          autoSize={{ minRows: 3, maxRows: 8 }}
        />
      </Flex>
    </PreviewLayout>
  )
}
