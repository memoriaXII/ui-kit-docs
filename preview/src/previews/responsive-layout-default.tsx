import {
  Body1,
  Body2,
  Card,
  Flex,
  PrimaryButton,
  ResponsiveLayout,
  Title3,
  Toast,
} from "@appboxo/ui-kit"

export function ResponsiveLayoutDefaultPreview() {
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
        <ResponsiveLayout
          navBar={{ title: "Profile" }}
          footer={<PrimaryButton text="Save" onClick={() => Toast.info("Saved")} />}
        >
          <Flex vertical gap={16}>
            <Card>
              <Flex vertical gap={6}>
                <Title3>Personal details</Title3>
                <Body2 color="text-3">Adapts mobile / desktop via useBreakpoint.</Body2>
              </Flex>
            </Card>
            <Card>
              <Body1>nurs@boxo.com</Body1>
            </Card>
          </Flex>
        </ResponsiveLayout>
      </div>
    </div>
  )
}
