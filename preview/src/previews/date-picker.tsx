import { useState } from "react"
import { format } from "date-fns"

import {
  Body1,
  Body2,
  Card,
  DatePicker,
  Flex,
  PrimaryButton,
} from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

const NOW = Date.now()
const IN_ONE_YEAR = NOW + 365 * 24 * 60 * 60 * 1000

export function DatePickerPreview() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<number | undefined>(undefined)

  return (
    <PreviewLayout>
      <Section
        title="Controlled picker"
        description="visible / onHide / onOk pattern. Range constrained to the next 12 months."
      >
        <Card>
          <Flex vertical gap={12}>
            <Body2 color="text-3">Departure date</Body2>
            <PrimaryButton
              text={value ? format(value, "dd MMM yyyy") : "Pick a date"}
              onClick={() => setOpen(true)}
            />
            {value && <Body1>Selected: {format(value, "EEEE, dd MMMM yyyy")}</Body1>}
          </Flex>
        </Card>
      </Section>

      <DatePicker
        visible={open}
        onHide={() => setOpen(false)}
        onOk={(ts) => {
          setValue(ts)
          setOpen(false)
        }}
        value={value}
        minDateTime={NOW}
        maxDateTime={IN_ONE_YEAR}
        title="Select date"
      />
    </PreviewLayout>
  )
}
