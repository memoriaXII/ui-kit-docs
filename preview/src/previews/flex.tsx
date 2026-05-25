import { Body1, Card, Flex } from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

const Pill = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "6px 14px",
      borderRadius: 999,
      background: "var(--primary-2)",
      color: "var(--primary-7)",
      fontSize: 12,
      fontWeight: 500,
    }}
  >
    {children}
  </div>
)

export function FlexPreview() {
  return (
    <PreviewLayout>
      <Section title="Vertical stack" description="vertical + gap props.">
        <Card>
          <Flex vertical gap={12}>
            <Pill>One</Pill>
            <Pill>Two</Pill>
            <Pill>Three</Pill>
          </Flex>
        </Card>
      </Section>

      <Section title="Horizontal row" description="Default direction.">
        <Card>
          <Flex gap={8} wrap="wrap">
            <Pill>One</Pill>
            <Pill>Two</Pill>
            <Pill>Three</Pill>
            <Pill>Four</Pill>
          </Flex>
        </Card>
      </Section>

      <Section title="Space between" description="justify='space-between'.">
        <Card>
          <Flex justify="space-between" align="center">
            <Body1 weight="semibold">Notifications</Body1>
            <Pill>On</Pill>
          </Flex>
        </Card>
      </Section>

      <Section title="Centered" description="align='center' + justify='center'.">
        <Card style={{ minHeight: 120 }}>
          <Flex align="center" justify="center" style={{ height: "100%" }}>
            <Pill>Empty state</Pill>
          </Flex>
        </Card>
      </Section>
    </PreviewLayout>
  )
}
