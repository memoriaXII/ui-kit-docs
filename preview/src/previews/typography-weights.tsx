import { Body1, Card, Flex } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function TypographyWeightsPreview() {
  return (
    <PreviewLayout>
      <Card>
        <Flex vertical gap={6}>
          <Body1 weight="regular">Regular weight body</Body1>
          <Body1 weight="medium">Medium weight body</Body1>
          <Body1 weight="semibold">Semibold weight body</Body1>
          <Body1 weight="bold">Bold weight body</Body1>
        </Flex>
      </Card>
    </PreviewLayout>
  )
}
