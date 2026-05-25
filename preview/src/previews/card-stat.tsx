import {
  Card,
  Flex,
  Footnote1,
  LargeTitle,
  PrimaryButton,
} from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function CardStatPreview() {
  return (
    <PreviewLayout>
      <Card>
        <Flex vertical gap={12}>
          <Footnote1 color="text-3" style={{ textTransform: "uppercase" }}>
            Available points
          </Footnote1>
          <LargeTitle>12,480 pts</LargeTitle>
          <Footnote1 color="text-3">~ $124.80 USD</Footnote1>
          <PrimaryButton text="Redeem" />
        </Flex>
      </Card>
    </PreviewLayout>
  )
}
