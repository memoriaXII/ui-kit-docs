import { Flex, Tip } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function TipEmphasisPreview() {
  return (
    <PreviewLayout>
      <Flex vertical gap={12}>
        <Tip
          emphasisPrefix="Heads up:"
          text="You can stack rewards from multiple partners on the same Boxo Pass."
        />
        <Tip
          emphasisPrefix="Tip:"
          text="Long-press a lounge pass to add it to Apple Wallet."
        />
      </Flex>
    </PreviewLayout>
  )
}
