import { useState } from "react"

import { TextArea } from "@appboxo/ui-kit"

import { PreviewLayout, Row, Section } from "./_section"

export function TextareaPreview() {
  const [bio, setBio] = useState("")
  const [report, setReport] = useState(
    "App froze on the checkout screen after I tapped Confirm. Lost my session twice."
  )

  return (
    <PreviewLayout>
      <Section
        title="Default"
        description="Auto-grows between 3 and 8 rows."
      >
        <Row label="Tell us about yourself">
          <TextArea
            value={bio}
            onChange={(_e, v) => setBio(v)}
            placeholder="A few words…"
            autoSize={{ minRows: 3, maxRows: 8 }}
          />
        </Row>
      </Section>

      <Section
        title="Filled"
        description="Pre-filled content with autoSize."
      >
        <Row label="Bug report">
          <TextArea
            value={report}
            onChange={(_e, v) => setReport(v)}
            autoSize={{ minRows: 3, maxRows: 8 }}
          />
        </Row>
      </Section>

      <Section
        title="Error state"
        description="hasError mirrors Input."
      >
        <Row label="Notes">
          <TextArea
            value="too short"
            hasError
            rows={3}
            onChange={() => {}}
          />
        </Row>
      </Section>

      <Section title="Disabled">
        <Row label="Read-only summary">
          <TextArea
            value="System-generated transcript. Locked for audit."
            disabled
            rows={3}
          />
        </Row>
      </Section>
    </PreviewLayout>
  )
}
