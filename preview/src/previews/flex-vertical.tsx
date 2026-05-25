import { Card, Flex } from "@appboxo/ui-kit"

import { Pill } from "./_pill"
import { PreviewLayout } from "./_section"

export function FlexVerticalPreview() {
  return (
    <PreviewLayout>
      <Card>
        <Flex vertical gap={12}>
          <Pill>One</Pill>
          <Pill>Two</Pill>
          <Pill>Three</Pill>
        </Flex>
      </Card>
    </PreviewLayout>
  )
}
