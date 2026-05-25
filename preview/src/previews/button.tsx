import {
  Flex,
  PrimaryButton,
  QuaternaryButton,
  SecondaryButton,
  TertiaryButton,
  Toast,
} from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

/**
 * Each Button*Preview below is mounted at its own /button-<slug> route in
 * the preview app, then iframed into a dedicated section in the docs MDX.
 * The legacy `ButtonPreview` (all variants in one scroll) still exists
 * for the landing-page "Quick taste" + as a fallback.
 */

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

export function ButtonLoadingPreview() {
  return (
    <PreviewLayout>
      <Flex vertical gap={12}>
        <PrimaryButton text="Loading…" loading />
        <SecondaryButton text="Loading…" loading />
      </Flex>
    </PreviewLayout>
  )
}

/** Legacy combined view — kept for the landing-page Quick taste. */
export function ButtonPreview() {
  return <ButtonVariantsPreview />
}
