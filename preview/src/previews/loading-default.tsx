import { Body2, Flex, Loading } from "@appboxo/ui-kit"

import { PreviewLayout, Row, Section } from "./_section"

export function LoadingDefaultPreview() {
  return (
    <PreviewLayout>
      <Section
        title="Loading"
        description="Raw Arco Mobile Loading passthrough — small inline spinner. For the kit's full-screen route loader use LayoutLoading instead."
      >
        <Row label="Inline">
          <Flex vertical={false} gap={12} align="center">
            <Loading />
            <Body2 color="text-3">Fetching latest passes…</Body2>
          </Flex>
        </Row>

        <Row label="Bigger">
          <Flex
            vertical
            align="center"
            justify="center"
            gap={12}
            style={{
              padding: 32,
              background: "var(--fill-1)",
              borderRadius: 16,
            }}
          >
            <Loading radius={20} />
            <Body2 color="text-3">Confirming payment…</Body2>
          </Flex>
        </Row>
      </Section>
    </PreviewLayout>
  )
}
