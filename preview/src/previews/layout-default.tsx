import {
  Body1,
  Body2,
  Card,
  Flex,
  Layout,
  PrimaryButton,
  Title3,
  Toast,
} from "@appboxo/ui-kit"

/**
 * Layout is full-screen by design — it sets height: 100dvh on its root
 * and assumes it owns the viewport. To preview it inside a 450px docs
 * iframe we wrap it in a phone-frame mock so the demo still reads as a
 * screen rather than a clipped layout.
 */
export function LayoutDefaultPreview() {
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
          navBar={{
            title: "Checkout",
            hideBack: false,
          }}
          footer={
            <PrimaryButton
              text="Confirm payment"
              onClick={() => Toast.info("Confirmed")}
            />
          }
        >
          <Flex vertical gap={16}>
            <Card>
              <Flex vertical gap={6}>
                <Title3>Order summary</Title3>
                <Body2 color="text-3">Lounge pass · KUL · Plaza Premium</Body2>
              </Flex>
            </Card>
            <Card>
              <Flex vertical={false} justify="space-between" align="center">
                <Body1>Subtotal</Body1>
                <Body1 weight="semibold">$117.60</Body1>
              </Flex>
            </Card>
            <Card>
              <Body2 color="text-3">
                Your card on file will be charged once you confirm.
              </Body2>
            </Card>
          </Flex>
        </Layout>
      </div>
    </div>
  )
}
