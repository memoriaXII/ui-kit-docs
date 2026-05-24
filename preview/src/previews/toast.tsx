import { Flex, PrimaryButton, SecondaryButton, Toast } from "@appboxo/ui-kit"

export function ToastPreview() {
  return (
    <Flex vertical gap={12} style={{ padding: 16 }}>
      <PrimaryButton text="Show info toast" onClick={() => Toast.info("Saved")} />
      <SecondaryButton
        text="Show error toast"
        onClick={() => Toast.error("Network error")}
      />
    </Flex>
  )
}
