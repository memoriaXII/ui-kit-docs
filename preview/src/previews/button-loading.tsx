import { Flex, PrimaryButton, SecondaryButton } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function ButtonLoadingPreview() {
  return (
    <PreviewLayout>
      <Flex vertical gap={12}>
        <PrimaryButton text="Saving…" loading />
        <SecondaryButton text="Loading…" loading />
      </Flex>
    </PreviewLayout>
  )
}
