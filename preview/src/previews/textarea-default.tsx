import { useState } from "react"

import { Body1, Flex, TextArea } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function TextareaDefaultPreview() {
  const [value, setValue] = useState("")
  return (
    <PreviewLayout>
      <Flex vertical gap={6}>
        <Body1 weight="semibold">Tell us about yourself</Body1>
        <TextArea
          value={value}
          onChange={(_e, v) => setValue(v)}
          placeholder="A few words…"
          autoSize={{ minRows: 3, maxRows: 8 }}
        />
      </Flex>
    </PreviewLayout>
  )
}
