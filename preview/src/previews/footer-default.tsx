// `Footer` isn't directly exported from @appboxo/ui-kit at the moment —
// only the FooterProps type is. The kit consumes Footer internally via
// Layout's `footer` slot, which accepts either FooterProps or a ReactNode.
// Showcase the realistic usage: a Layout with the footer slot wired.

import { Body1, Card, Flex, Layout, Toast } from "@appboxo/ui-kit"

export function FooterDefaultPreview() {
  return (
    <Layout
      navBar={{ title: "Checkout" }}
      footer={{
        primaryButton: {
          text: "Confirm",
          onClick: () => Toast.info("Confirmed"),
        },
        secondaryButton: {
          text: "Cancel",
          onClick: () => Toast.info("Cancelled"),
        },
      }}
    >
      <Flex vertical gap={12}>
        <Card>
          <Body1>Tap the buttons below — that's the Footer area.</Body1>
        </Card>
      </Flex>
    </Layout>
  )
}
