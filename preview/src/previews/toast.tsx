import {
  Flex,
  PrimaryButton,
  SecondaryButton,
  Toast,
} from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

export function ToastPreview() {
  return (
    <PreviewLayout>
      <Section
        title="Info"
        description="Neutral pill — confirmations, success messages."
      >
        <Flex gap={8} wrap="wrap">
          <PrimaryButton text="Saved" onClick={() => Toast.info("Saved")} />
          <PrimaryButton
            text="Copied to clipboard"
            onClick={() => Toast.info("Copied to clipboard")}
          />
          <PrimaryButton
            text="Long-ish message"
            onClick={() =>
              Toast.info(
                "Your booking has been confirmed. A receipt was emailed to you."
              )
            }
          />
        </Flex>
      </Section>

      <Section
        title="Error"
        description="Tinted danger pill — validation, failures."
      >
        <Flex gap={8} wrap="wrap">
          <SecondaryButton
            text="Network error"
            onClick={() => Toast.error("Network error")}
          />
          <SecondaryButton
            text="Payment declined"
            onClick={() => Toast.error("Payment declined. Try a different card.")}
          />
        </Flex>
      </Section>
    </PreviewLayout>
  )
}
