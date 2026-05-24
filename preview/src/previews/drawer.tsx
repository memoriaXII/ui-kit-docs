import { useState } from "react"

import {
  Body1,
  Drawer,
  Flex,
  PrimaryButton,
  SecondaryButton,
} from "@appboxo/ui-kit"

export function DrawerPreview() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ padding: 16 }}>
      <PrimaryButton text="Confirm purchase" onClick={() => setOpen(true)} />
      <Drawer visible={open} close={() => setOpen(false)}>
        <Flex vertical gap={16} style={{ padding: 24 }}>
          <Body1>Redeem 1,200 points for a $12 voucher?</Body1>
          <Flex gap={8}>
            <PrimaryButton text="Confirm" onClick={() => setOpen(false)} />
            <SecondaryButton text="Cancel" onClick={() => setOpen(false)} />
          </Flex>
        </Flex>
      </Drawer>
    </div>
  )
}
