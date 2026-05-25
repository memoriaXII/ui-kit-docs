import { Flex, SecondaryButton, Toast } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function ToastErrorPreview() {
  return (
    <PreviewLayout>
      <Flex vertical gap={8}>
        <SecondaryButton
          text="Network error"
          onClick={() => Toast.error("Network error")}
        />
        <SecondaryButton
          text="Payment declined"
          onClick={() =>
            Toast.error("Payment declined. Try a different card.")
          }
        />
      </Flex>
    </PreviewLayout>
  )
}
