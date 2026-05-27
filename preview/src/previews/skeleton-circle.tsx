import { Flex, Skeleton } from "@appboxo/ui-kit"

import { PreviewLayout, Row, Section } from "./_section"

export function SkeletonCirclePreview() {
  return (
    <PreviewLayout>
      <Section
        title="Avatars / status dots"
        description="`circle` wins over `radius` and forces a perfect circle."
      >
        <Row label="width=44, height=44, circle">
          <Skeleton width={44} height={44} circle />
        </Row>
        <Row label="width=32, height=32, circle">
          <Skeleton width={32} height={32} circle />
        </Row>
        <Row label="cluster of circles + bars">
          <Flex vertical={false} align="center" gap={12}>
            <Skeleton width={44} height={44} circle />
            <Flex gap={6}>
              <Skeleton width={140} height={14} />
              <Skeleton width={90} height={12} />
            </Flex>
          </Flex>
        </Row>
      </Section>
    </PreviewLayout>
  )
}
