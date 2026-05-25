import { Body1, Flex, Input } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function InputDisabledPreview() {
  return (
    <PreviewLayout>
      <Flex vertical gap={6}>
        <Body1 weight="semibold">Locked field</Body1>
        <Input value="account_id_42" disabled />
      </Flex>
    </PreviewLayout>
  )
}
