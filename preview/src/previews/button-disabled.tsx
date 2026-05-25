import {
  Flex,
  PrimaryButton,
  QuaternaryButton,
  SecondaryButton,
  TertiaryButton,
} from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function ButtonDisabledPreview() {
  return (
    <PreviewLayout>
      <Flex vertical gap={12}>
        <PrimaryButton text="Disabled primary" disabled />
        <SecondaryButton text="Disabled secondary" disabled />
        <TertiaryButton text="Disabled tertiary" disabled />
        <QuaternaryButton text="Disabled quaternary" disabled />
      </Flex>
    </PreviewLayout>
  )
}
