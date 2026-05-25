import { Body1, Body2, Card, Copyable, Flex } from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

export function CopyablePreview() {
  return (
    <PreviewLayout>
      <Section
        title="Inline reference"
        description="Wrap any text — clicking copies the value to clipboard."
      >
        <Card>
          <Flex vertical gap={12}>
            <Flex gap={12} align="center">
              <Body2 color="text-3">Booking ID</Body2>
              <Copyable text="BKG-7F3A-92EE-114B">
                <Body1 style={{ fontFamily: "ui-monospace, monospace" }}>
                  BKG-7F3A-92EE-114B
                </Body1>
              </Copyable>
            </Flex>
            <Flex gap={12} align="center">
              <Body2 color="text-3">Referral code</Body2>
              <Copyable text="BOXO-NURS-2026">
                <Body1 style={{ fontFamily: "ui-monospace, monospace" }}>
                  BOXO-NURS-2026
                </Body1>
              </Copyable>
            </Flex>
          </Flex>
        </Card>
      </Section>

      <Section
        title="Long string"
        description="Useful for opaque tokens / signed URLs."
      >
        <Card>
          <Copyable text="ey0a73c4b8d2e1f5h6j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5">
            <Body1
              style={{
                fontFamily: "ui-monospace, monospace",
                wordBreak: "break-all",
              }}
            >
              ey0a73c4b8d2e1f5h6j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5
            </Body1>
          </Copyable>
        </Card>
      </Section>
    </PreviewLayout>
  )
}
