import { Card, Flex } from "@appboxo/ui-kit"

import { Pill } from "./_pill"
import { PreviewLayout } from "./_section"

export function FlexHorizontalPreview() {
  return (
    <PreviewLayout>
      <Card>
        <Flex gap={8} wrap="wrap">
          <Pill>One</Pill>
          <Pill>Two</Pill>
          <Pill>Three</Pill>
          <Pill>Four</Pill>
        </Flex>
      </Card>
    </PreviewLayout>
  )
}
