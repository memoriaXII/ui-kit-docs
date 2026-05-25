import { useState } from "react"

import { Checkbox, Flex } from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

export function CheckboxPreview() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)
  const [c, setC] = useState(true)

  return (
    <PreviewLayout>
      <Section
        title="Solid filled dot"
        description='iconType="circle-dot" — the default mark.'
      >
        <Flex vertical gap={10}>
          <Checkbox
            iconType="circle-dot"
            checked={a}
            onChange={(v) => setA(v)}
          >
            Accept terms and conditions
          </Checkbox>
          <Checkbox iconType="circle-dot" checked={false} onChange={() => {}}>
            Subscribe to newsletter
          </Checkbox>
        </Flex>
      </Section>

      <Section
        title="Outline ring"
        description='iconType="circle-outline-dot" — subtler variant for nested lists.'
      >
        <Flex vertical gap={10}>
          <Checkbox
            iconType="circle-outline-dot"
            checked={c}
            onChange={(v) => setC(v)}
          >
            Enable analytics
          </Checkbox>
          <Checkbox
            iconType="circle-outline-dot"
            checked={b}
            onChange={(v) => setB(v)}
          >
            Personalised recommendations
          </Checkbox>
        </Flex>
      </Section>

      <Section title="Disabled">
        <Flex vertical gap={10}>
          <Checkbox iconType="circle-dot" disabled checked>
            Disabled & checked
          </Checkbox>
          <Checkbox iconType="circle-dot" disabled>
            Disabled & unchecked
          </Checkbox>
        </Flex>
      </Section>
    </PreviewLayout>
  )
}
