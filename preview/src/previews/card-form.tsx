import {
  Body2,
  Card,
  Flex,
  PrimaryButton,
  SecondaryButton,
  Title3,
} from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function CardFormPreview() {
  return (
    <PreviewLayout>
      <Card>
        <Flex vertical gap={16}>
          <Title3>Contact details</Title3>
          <Body2 color="text-3">
            We&apos;ll only use this to confirm bookings.
          </Body2>
          <Flex vertical={false} gap={8}>
            <PrimaryButton text="Confirm" />
            <SecondaryButton text="Cancel" />
          </Flex>
        </Flex>
      </Card>
    </PreviewLayout>
  )
}
