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
 * and assumes it owns the viewport. The docs site renders this preview
 * inside an iframe whose container is sized to the chosen device
 * (mobile / tablet / desktop), so Layout fills it naturally.
 */
export function LayoutDefaultPreview() {
  return (
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
  )
}
