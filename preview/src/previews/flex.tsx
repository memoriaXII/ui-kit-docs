import { Body1, Flex, PrimaryButton, SecondaryButton } from "@appboxo/ui-kit"

export function FlexPreview() {
  return (
    <Flex vertical gap={16} style={{ padding: 16 }}>
      <Body1 weight="semibold">Welcome</Body1>
      <Flex gap={8}>
        <PrimaryButton text="Continue" />
        <SecondaryButton text="Skip" />
      </Flex>
    </Flex>
  )
}
