import { Cell, Flex } from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

export function CellDefaultPreview() {
  return (
    <PreviewLayout>
      <Section
        title="Cell"
        description="Raw Arco Mobile Cell passthrough. Picks up the kit's --cell-* design tokens from the active brand theme."
      >
        <div style={{ background: "var(--fill-1)", borderRadius: 12 }}>
          <Cell label="Account" showArrow>
            user@example.com
          </Cell>
          <Cell label="Subscription" showArrow>
            Pro
          </Cell>
          <Cell label="Notifications" showArrow>
            Email + push
          </Cell>
        </div>
      </Section>

      <Section title="Without arrows">
        <div style={{ background: "var(--fill-1)", borderRadius: 12 }}>
          <Cell label="App version">2.1.4</Cell>
          <Cell label="Build">abcd123</Cell>
        </div>
      </Section>
    </PreviewLayout>
  )
}
