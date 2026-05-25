import { Flex, Footnote2, Radio } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function RadioStandalonePreview() {
  return (
    <PreviewLayout>
      <Flex vertical={false} gap={20} align="center">
        <Flex vertical gap={6} align="center">
          <Radio active />
          <Footnote2 color="text-3">active</Footnote2>
        </Flex>
        <Flex vertical gap={6} align="center">
          <Radio active={false} />
          <Footnote2 color="text-3">inactive</Footnote2>
        </Flex>
      </Flex>
    </PreviewLayout>
  )
}
