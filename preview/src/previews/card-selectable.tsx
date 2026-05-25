import { Body1, Card, Flex, Footnote1 } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function CardSelectablePreview() {
  return (
    <PreviewLayout>
      <Flex vertical gap={10}>
        <Card>
          <Body1>Standard tier</Body1>
        </Card>
        <Card active>
          <Flex justify="space-between" align="center">
            <Body1 weight="semibold">Premium tier</Body1>
            <Footnote1 color="text-3">Selected</Footnote1>
          </Flex>
        </Card>
      </Flex>
    </PreviewLayout>
  )
}
