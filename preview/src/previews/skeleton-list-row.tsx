import { Card, Flex, Skeleton } from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

export function SkeletonListRowPreview() {
  return (
    <PreviewLayout>
      <Section
        title="List row mock"
        description="Compose Skeleton primitives inside the same Flex / Card structure you'd use after data loads — keeps the page from reflowing when content arrives."
      >
        <Flex gap={8}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} style={{ background: "var(--fill-1)" }}>
              <Flex vertical={false} align="center" gap={12}>
                <Skeleton width={44} height={44} circle />
                <Flex gap={6}>
                  <Skeleton width={140} height={14} />
                  <Skeleton width={90} height={12} />
                </Flex>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Section>
    </PreviewLayout>
  )
}
