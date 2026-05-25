import { useState } from "react"
import { format } from "date-fns"

import {
  Body2,
  Card,
  Flex,
  SecondaryButton,
  TimePicker,
} from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function TimePicker24hPreview() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<number | undefined>()
  return (
    <PreviewLayout>
      <Card>
        <Flex vertical gap={12}>
          <Body2 color="text-3">Departure (24h)</Body2>
          <SecondaryButton
            text={value ? format(value, "HH:mm") : "Pick a time (24h)"}
            onClick={() => setOpen(true)}
          />
        </Flex>
      </Card>
      <TimePicker
        visible={open}
        onHide={() => setOpen(false)}
        onOk={(ts) => {
          setValue(ts)
          setOpen(false)
        }}
        value={value}
        hourFormat="24h"
        title="Select time (24h)"
      />
    </PreviewLayout>
  )
}
