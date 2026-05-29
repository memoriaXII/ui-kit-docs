// Single-action variant — Layout with footer={{ primaryButton: ... }}.

import { Body1, Card, Flex, Layout } from "@appboxo/ui-kit"

export function FooterSinglePreview() {
  return (
    <Layout
      navBar={{ title: "Welcome" }}
      footer={{
        primaryButton: { text: "Continue" },
      }}
    >
      <Flex vertical gap={12}>
        <Card>
          <Body1>One sticky CTA at the bottom — that's Footer.</Body1>
        </Card>
      </Flex>
    </Layout>
  )
}
