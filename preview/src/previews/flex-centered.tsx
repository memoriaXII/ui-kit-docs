import { Card, Flex } from "@appboxo/ui-kit"

import { Pill } from "./_pill"
import { PreviewLayout } from "./_section"

export function FlexCenteredPreview() {
  return (
    <PreviewLayout>
      <Card style={{ minHeight: 120 }}>
        <Flex align="center" justify="center" style={{ height: "100%" }}>
          <Pill>Empty state</Pill>
        </Flex>
      </Card>
    </PreviewLayout>
  )
}
