import { Flex, PrimaryButton, Toast } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function ToastInfoPreview() {
  return (
    <PreviewLayout>
      <Flex vertical gap={8}>
        <PrimaryButton text="Saved" onClick={() => Toast.info("Saved")} />
        <PrimaryButton
          text="Copied to clipboard"
          onClick={() => Toast.info("Copied to clipboard")}
        />
        <PrimaryButton
          text="Longer message"
          onClick={() =>
            Toast.info(
              "Your booking has been confirmed. A receipt was emailed to you."
            )
          }
        />
      </Flex>
    </PreviewLayout>
  )
}
