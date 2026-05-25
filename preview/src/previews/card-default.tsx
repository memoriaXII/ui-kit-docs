import { Body1, Body2, Card, Flex } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function CardDefaultPreview() {
  return (
    <PreviewLayout>
      <Card>
        <Flex vertical gap={6}>
          <Body1 weight="semibold">Boxo Pass</Body1>
          <Body2 color="text-3">Loyalty points balance</Body2>
        </Flex>
      </Card>
    </PreviewLayout>
  )
}
