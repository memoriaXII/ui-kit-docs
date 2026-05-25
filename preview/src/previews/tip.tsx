import { Flex, Tip } from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

export function TipPreview() {
  return (
    <PreviewLayout>
      <Section title="Default" description="Text-only hint with the bundled InfoCircle icon.">
        <Tip text="We only use this on your device. Nothing leaves the phone." />
      </Section>

      <Section
        title="Emphasised prefix"
        description="The emphasisPrefix prop bolds the leading clause without breaking the layout."
      >
        <Flex vertical gap={12}>
          <Tip
            emphasisPrefix="Heads up:"
            text="You can stack rewards from multiple partners on the same Boxo Pass."
          />
          <Tip
            emphasisPrefix="Tip:"
            text="Long-press a lounge pass to add it to Apple Wallet."
          />
        </Flex>
      </Section>

      <Section
        title="Inside a card"
        description="Tips slot into card layouts to highlight a single rule without dominating."
      >
        <div
          style={{
            background: "var(--boxo-card-mobile-background, var(--fill-1))",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <Tip text="This balance is rounded to the nearest 10 points. Check your statement for exact values." />
        </div>
      </Section>
    </PreviewLayout>
  )
}
