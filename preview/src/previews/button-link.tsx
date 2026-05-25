import { Flex, PrimaryButton, SecondaryButton } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function ButtonLinkPreview() {
  return (
    <PreviewLayout>
      <Flex vertical gap={12}>
        <PrimaryButton text="Open checkout" href="/checkout" />
        <SecondaryButton text="View terms" href="/terms" replace />
      </Flex>
    </PreviewLayout>
  )
}
