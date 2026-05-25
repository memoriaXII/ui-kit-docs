import {
  Flex,
  PrimaryButton,
  QuaternaryButton,
  SecondaryButton,
  TertiaryButton,
  Toast,
} from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function ButtonVariantsPreview() {
  return (
    <PreviewLayout>
      <Flex vertical gap={12}>
        <PrimaryButton text="Primary" onClick={() => Toast.info("Primary")} />
        <SecondaryButton
          text="Secondary"
          onClick={() => Toast.info("Secondary")}
        />
        <TertiaryButton text="Tertiary" onClick={() => Toast.info("Tertiary")} />
        <QuaternaryButton
          text="Quaternary"
          onClick={() => Toast.info("Quaternary")}
        />
      </Flex>
    </PreviewLayout>
  )
}
