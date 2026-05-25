import { Body1, Flex, Footnote2, TextArea } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function TextareaErrorPreview() {
  return (
    <PreviewLayout>
      <Flex vertical gap={6}>
        <Body1 weight="semibold">Notes</Body1>
        <TextArea value="too short" hasError rows={3} onChange={() => {}} />
        <Footnote2 color="text-3">Minimum 20 characters.</Footnote2>
      </Flex>
    </PreviewLayout>
  )
}
