import { Body1, Card, Flex } from "@appboxo/ui-kit"

import { Pill } from "./_pill"
import { PreviewLayout } from "./_section"

export function FlexBetweenPreview() {
  return (
    <PreviewLayout>
      <Card>
        <Flex vertical={false} justify="space-between" align="center">
          <Body1 weight="semibold">Notifications</Body1>
          <Pill>On</Pill>
        </Flex>
      </Card>
    </PreviewLayout>
  )
}
