import { Card, Flex, Skeleton } from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

export function SkeletonCardPreview() {
  return (
    <PreviewLayout>
      <Section
        title="Card content mock"
        description="Header row + 3-line body. Mixes `width={'100%'}` (string) and `width={220}` (number) to show both length APIs."
      >
        <Card style={{ background: "var(--fill-1)" }}>
          <Flex gap={16}>
            <Flex vertical={false} align="center" gap={12}>
              <Skeleton width={24} height={24} circle />
              <Skeleton width={180} height={12} />
            </Flex>
            <Flex gap={8}>
              <Skeleton width="100%" height={12} />
              <Skeleton width="100%" height={12} />
              <Skeleton width={220} height={12} />
            </Flex>
          </Flex>
        </Card>
      </Section>
    </PreviewLayout>
  )
}
