// `Footer` isn't directly exported from @appboxo/ui-kit at the moment —
// only the FooterProps type is. The kit consumes Footer internally via
// Layout's `footer` slot, which accepts either FooterProps or a ReactNode.
// Showcase the realistic usage: a Layout with the footer slot wired.

import { Body1, Card, Flex, Layout, Toast } from "@appboxo/ui-kit"

export function FooterDefaultPreview() {
  return (
    <div
      style={{
        background: "var(--fill-2)",
        minHeight: "100%",
        padding: 20,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 320,
          height: 560,
          background: "var(--fill-white)",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 8px 32px -8px rgba(0,0,0,0.18)",
          border: "1px solid var(--line-1)",
        }}
      >
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
      </div>
    </div>
  )
}
