import { Body1, Copyable, Flex } from "@appboxo/ui-kit"

export function CopyablePreview() {
  return (
    <Flex vertical gap={12} style={{ padding: 16 }}>
      <Body1>Your referral code:</Body1>
      <Copyable value="boxo-ABCD-1234">boxo-ABCD-1234</Copyable>
    </Flex>
  )
}
