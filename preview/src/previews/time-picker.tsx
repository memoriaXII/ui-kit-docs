import { useState } from "react"
import { format } from "date-fns"

import {
  Body1,
  Body2,
  Card,
  Flex,
  PrimaryButton,
  SecondaryButton,
  TimePicker,
} from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

export function TimePickerPreview() {
  const [open12, setOpen12] = useState(false)
  const [open24, setOpen24] = useState(false)
  const [value, setValue] = useState<number | undefined>()

  return (
    <PreviewLayout>
      <Section
        title="12-hour clock"
        description="Default. Three wheels: hour / minute / AM-PM."
      >
        <Card>
          <Flex vertical gap={12}>
            <Body2 color="text-3">Reminder time</Body2>
            <PrimaryButton
              text={value ? format(value, "hh:mm a") : "Pick a time"}
              onClick={() => setOpen12(true)}
            />
          </Flex>
        </Card>
      </Section>

      <Section
        title="24-hour clock"
        description='Pass hourFormat="24h" to use 24h wheels.'
      >
        <Card>
          <Flex vertical gap={12}>
            <Body2 color="text-3">Departure</Body2>
            <SecondaryButton
              text={value ? format(value, "HH:mm") : "Pick a time (24h)"}
              onClick={() => setOpen24(true)}
            />
            {value && (
              <Body1>
                Selected: {format(value, "hh:mm a")} ({format(value, "HH:mm")} 24h)
              </Body1>
            )}
          </Flex>
        </Card>
      </Section>

      <TimePicker
        visible={open12}
        onHide={() => setOpen12(false)}
        onOk={(ts) => {
          setValue(ts)
          setOpen12(false)
        }}
        value={value}
        hourFormat="12h"
        title="Select time"
      />

      <TimePicker
        visible={open24}
        onHide={() => setOpen24(false)}
        onOk={(ts) => {
          setValue(ts)
          setOpen24(false)
        }}
        value={value}
        hourFormat="24h"
        title="Select time (24h)"
      />
    </PreviewLayout>
  )
}
