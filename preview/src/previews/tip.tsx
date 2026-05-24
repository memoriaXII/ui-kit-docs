import { Flex, Tip } from "@appboxo/ui-kit"

export function TipPreview() {
  return (
    <Flex vertical gap={12} style={{ padding: 16 }}>
      <Tip text="We only use this on your device. Nothing leaves the phone." />
      <Tip
        emphasisPrefix="Heads up:"
        text="You can stack rewards from multiple partners on the same Boxo Pass."
      />
    </Flex>
  )
}
