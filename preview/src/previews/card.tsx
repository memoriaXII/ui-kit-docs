import {
  Body1,
  Body2,
  Card,
  Flex,
  Footnote1,
  LargeTitle,
  PrimaryButton,
} from "@appboxo/ui-kit"

export function CardPreview() {
  return (
    <div style={{ padding: 16 }}>
      <Card>
        <Flex vertical gap={12}>
          <Body1 weight="semibold">Boxo Pass</Body1>
          <Body2 color="text-4">Loyalty points balance</Body2>
          <LargeTitle>12,480 pts</LargeTitle>
          <Footnote1 color="text-3">~ $124.80 USD</Footnote1>
          <PrimaryButton text="Redeem" />
        </Flex>
      </Card>
    </div>
  )
}
