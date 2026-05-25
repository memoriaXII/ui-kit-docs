import { useState } from "react"

import { Body1, Flex, Footnote2, Input } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function InputErrorPreview() {
  const [value, setValue] = useState("+886 invalid")
  return (
    <PreviewLayout>
      <Flex vertical gap={6}>
        <Body1 weight="semibold">Phone</Body1>
        <Input
          value={value}
          hasError
          onChange={(_e, v) => setValue(v)}
          placeholder="+886 9xx xxx xxx"
        />
        <Footnote2 color="text-3">
          Please enter a valid phone number.
        </Footnote2>
      </Flex>
    </PreviewLayout>
  )
}
