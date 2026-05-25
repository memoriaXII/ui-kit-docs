import { Body1, Card, Flex } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function TypographyColorsPreview() {
  return (
    <PreviewLayout>
      <Card>
        <Flex vertical gap={6}>
          <Body1 color="text-5">text-5 — primary foreground</Body1>
          <Body1 color="text-4">text-4 — slightly muted</Body1>
          <Body1 color="text-3">text-3 — captions and helpers</Body1>
          <Body1 color="text-2">text-2 — disabled-looking</Body1>
        </Flex>
      </Card>
    </PreviewLayout>
  )
}
