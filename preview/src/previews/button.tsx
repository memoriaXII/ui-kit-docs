import {
  Flex,
  PrimaryButton,
  QuaternaryButton,
  SecondaryButton,
  TertiaryButton,
  Toast,
} from "@appboxo/ui-kit"

import { PreviewLayout, Row, Section } from "./_section"

export function ButtonPreview() {
  return (
    <PreviewLayout>
      <Section
        title="Variants"
        description="Four exports, four token paths. Pick the dominant one per screen."
      >
        <Row>
          <PrimaryButton text="Primary" onClick={() => Toast.info("Primary")} />
        </Row>
        <Row>
          <SecondaryButton text="Secondary" onClick={() => Toast.info("Secondary")} />
        </Row>
        <Row>
          <TertiaryButton text="Tertiary" onClick={() => Toast.info("Tertiary")} />
        </Row>
        <Row>
          <QuaternaryButton text="Quaternary" onClick={() => Toast.info("Quaternary")} />
        </Row>
      </Section>

      <Section
        title="As a link"
        description="Pass href + the button renders inside UIKitLink (Next Link when wrapped in NextUIKitProvider, plain <a> otherwise)."
      >
        <PrimaryButton text="Go to /checkout" href="/checkout" />
      </Section>

      <Section
        title="Disabled"
        description="The disabled prop is forwarded to Arco."
      >
        <Flex gap={8} wrap="wrap">
          <PrimaryButton text="Disabled primary" disabled />
          <SecondaryButton text="Disabled secondary" disabled />
        </Flex>
      </Section>

      <Section
        title="Loading"
        description="The loading prop swaps the label for a spinner."
      >
        <Flex gap={8} wrap="wrap">
          <PrimaryButton text="Loading…" loading />
          <SecondaryButton text="Loading…" loading />
        </Flex>
      </Section>
    </PreviewLayout>
  )
}
