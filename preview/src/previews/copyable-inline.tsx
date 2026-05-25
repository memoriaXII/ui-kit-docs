import { Body1, Body2, Card, Copyable, Flex } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function CopyableInlinePreview() {
  return (
    <PreviewLayout>
      <Card>
        <Flex vertical gap={12}>
          <Flex vertical={false} gap={12} align="center">
            <Body2 color="text-3">Booking ID</Body2>
            <Copyable text="BKG-7F3A-92EE-114B">
              <Body1 style={{ fontFamily: "ui-monospace, monospace" }}>
                BKG-7F3A-92EE-114B
              </Body1>
            </Copyable>
          </Flex>
          <Flex vertical={false} gap={12} align="center">
            <Body2 color="text-3">Referral code</Body2>
            <Copyable text="BOXO-NURS-2026">
              <Body1 style={{ fontFamily: "ui-monospace, monospace" }}>
                BOXO-NURS-2026
              </Body1>
            </Copyable>
          </Flex>
        </Flex>
      </Card>
    </PreviewLayout>
  )
}
