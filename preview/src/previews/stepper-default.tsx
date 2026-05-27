import { useState } from "react"
import { Body1, Flex, Stepper } from "@appboxo/ui-kit"

import { PreviewLayout, Row, Section } from "./_section"

export function StepperDefaultPreview() {
  const [travelers, setTravelers] = useState(1)
  const [guests, setGuests] = useState(2)

  return (
    <PreviewLayout>
      <Section
        title="Stepper"
        description="Raw Arco Mobile Stepper passthrough. Useful for quantity inputs in booking flows."
      >
        <Row label="Plain default">
          <Stepper
            defaultValue={travelers}
            onChange={setTravelers}
            min={1}
            max={6}
          />
        </Row>

        <Row label="Round theme + min/max bounds">
          <Flex
            vertical={false}
            justify="space-between"
            align="center"
            style={{
              background: "var(--fill-1)",
              borderRadius: 16,
              padding: 16,
            }}
          >
            <Body1 weight="semibold">Guests</Body1>
            <Stepper
              defaultValue={guests}
              onChange={setGuests}
              min={1}
              max={4}
              theme="round"
            />
          </Flex>
        </Row>
      </Section>
    </PreviewLayout>
  )
}
