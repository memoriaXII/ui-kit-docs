import { Card, Flex } from "@appboxo/ui-kit"

import { Pill } from "./_pill"
import { PreviewLayout } from "./_section"

export function FlexHorizontalPreview() {
  return (
    <PreviewLayout>
      <Card>
        {/* kit's Flex defaults to `vertical={true}` — pass vertical={false}
            explicitly for horizontal rows. */}
        <Flex vertical={false} gap={8} wrap="wrap">
          <Pill>One</Pill>
          <Pill>Two</Pill>
          <Pill>Three</Pill>
          <Pill>Four</Pill>
        </Flex>
      </Card>
    </PreviewLayout>
  )
}
