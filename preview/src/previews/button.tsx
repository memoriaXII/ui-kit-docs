import {
  Flex,
  PrimaryButton,
  QuaternaryButton,
  SecondaryButton,
  TertiaryButton,
  Toast,
} from "@appboxo/ui-kit"

export function ButtonPreview() {
  return (
    <Flex vertical gap={12} style={{ padding: 16 }}>
      <PrimaryButton text="Primary" onClick={() => Toast.info("Primary")} />
      <SecondaryButton text="Secondary" onClick={() => Toast.info("Secondary")} />
      <TertiaryButton text="Tertiary" onClick={() => Toast.info("Tertiary")} />
      <QuaternaryButton text="Quaternary" onClick={() => Toast.info("Quaternary")} />
    </Flex>
  )
}
