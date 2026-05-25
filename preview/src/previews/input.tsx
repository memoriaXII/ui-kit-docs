import { useState } from "react"

import { Input } from "@appboxo/ui-kit"

import { PreviewLayout, Row, Section } from "./_section"

export function InputPreview() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("nurs@boxo")
  const [phone, setPhone] = useState("+886 invalid")

  return (
    <PreviewLayout>
      <Section title="Default" description="Empty state with a placeholder.">
        <Row label="Your name">
          <Input
            value={name}
            onChange={(_e, v) => setName(v)}
            placeholder="e.g. Nurs"
          />
        </Row>
      </Section>

      <Section
        title="Filled"
        description="Value present, no error."
      >
        <Row label="Email">
          <Input
            value={email}
            onChange={(_e, v) => setEmail(v)}
            placeholder="you@boxo.com"
          />
        </Row>
      </Section>

      <Section
        title="Error state"
        description="Pass hasError to surface validation feedback."
      >
        <Row label="Phone">
          <Input
            value={phone}
            hasError
            onChange={(_e, v) => setPhone(v)}
            placeholder="+886 9xx xxx xxx"
          />
        </Row>
      </Section>

      <Section
        title="Disabled"
        description="Greyed out + non-interactive."
      >
        <Row label="Locked field">
          <Input value="account_id_42" disabled />
        </Row>
      </Section>
    </PreviewLayout>
  )
}
