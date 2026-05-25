import {
  Body1,
  Body2,
  Card,
  Flex,
  Footnote1,
  LargeTitle,
  PrimaryButton,
  SecondaryButton,
  Title3,
} from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

export function CardPreview() {
  return (
    <PreviewLayout>
      <Section
        title="Default"
        description="Just a div wrapper — compose freely with Flex + typography."
      >
        <Card>
          <Flex vertical gap={6}>
            <Body1 weight="semibold">Boxo Pass</Body1>
            <Body2 color="text-3">Loyalty points balance</Body2>
          </Flex>
        </Card>
      </Section>

      <Section
        title="Stat card"
        description="LargeTitle + Footnote1 for a balance / metric layout."
      >
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
      </Section>

      <Section
        title="Selectable"
        description="active={true} flips to the pressed / selected style."
      >
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
      </Section>

      <Section
        title="Form inside card"
        description="Cards group form sections without adding visual weight."
      >
        <Card>
          <Flex vertical gap={16}>
            <Title3>Contact details</Title3>
            <Body2 color="text-3">We'll only use this to confirm bookings.</Body2>
            <Flex gap={8}>
              <PrimaryButton text="Confirm" />
              <SecondaryButton text="Cancel" />
            </Flex>
          </Flex>
        </Card>
      </Section>
    </PreviewLayout>
  )
}
