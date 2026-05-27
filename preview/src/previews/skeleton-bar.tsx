import { Flex, Skeleton } from "@appboxo/ui-kit"

import { PreviewLayout, Row, Section } from "./_section"

export function SkeletonBarPreview() {
  return (
    <PreviewLayout>
      <Section
        title="Pill bars"
        description="Numbers map to pixels; pass any CSS length string for percentage / rem widths."
      >
        <Row label="width={200} height={16}">
          <Skeleton width={200} height={16} />
        </Row>
        <Row label='width="100%" height={12}'>
          <Skeleton width="100%" height={12} />
        </Row>
        <Row label="width={120} height={10}">
          <Skeleton width={120} height={10} />
        </Row>
      </Section>

      <Section title="Static (no shimmer)">
        <Flex vertical={false} gap={12} align="center">
          <Skeleton width={140} height={14} noAnimation />
          <Skeleton width={80} height={14} noAnimation />
        </Flex>
      </Section>
    </PreviewLayout>
  )
}
