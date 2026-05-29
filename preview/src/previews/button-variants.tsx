import {
  Flex,
  PrimaryButton,
  QuaternaryButton,
  SecondaryButton,
  TertiaryButton,
} from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function ButtonVariantsPreview() {
  return (
    <PreviewLayout>
      <Flex vertical gap={12}>
        <PrimaryButton text="Primary" />
        <SecondaryButton text="Secondary" />
        <TertiaryButton text="Tertiary" />
        <QuaternaryButton text="Quaternary" />
      </Flex>
    </PreviewLayout>
  )
}
