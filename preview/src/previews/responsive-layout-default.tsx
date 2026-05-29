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
    <ResponsiveLayout
      navBar={{ title: "Profile" }}
      footer={<PrimaryButton text="Save" onClick={() => Toast.info("Saved")} />}
    >
      <Flex vertical gap={16}>
        <Card>
          <Flex vertical gap={6}>
            <Title3>Personal details</Title3>
            <Body2 color="text-3">
              Adapts mobile / desktop via useBreakpoint.
            </Body2>
          </Flex>
        </Card>
        <Card>
          <Body1>alex.morgan@example.com</Body1>
        </Card>
      </Flex>
    </ResponsiveLayout>
  )
}
