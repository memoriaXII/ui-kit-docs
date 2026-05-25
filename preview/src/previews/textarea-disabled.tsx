import { Body1, Flex, TextArea } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function TextareaDisabledPreview() {
  return (
    <PreviewLayout>
      <Flex vertical gap={6}>
        <Body1 weight="semibold">Read-only summary</Body1>
        <TextArea
          value="System-generated transcript. Locked for audit."
          disabled
          rows={3}
        />
      </Flex>
    </PreviewLayout>
  )
}
