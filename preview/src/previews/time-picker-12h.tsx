import { useState } from "react"
import { format } from "date-fns"

import {
  Body2,
  Card,
  Flex,
  PrimaryButton,
  TimePicker,
} from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function TimePicker12hPreview() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<number | undefined>()
  return (
    <PreviewLayout>
      <Card>
        <Flex vertical gap={12}>
          <Body2 color="text-3">Reminder time (12h)</Body2>
          <PrimaryButton
            text={value ? format(value, "hh:mm a") : "Pick a time"}
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
        hourFormat="12h"
        title="Select time"
      />
    </PreviewLayout>
  )
}
