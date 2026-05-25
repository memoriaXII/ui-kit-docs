import { useState } from "react"

import {
  Body2,
  Drawer,
  Flex,
  PrimaryButton,
  SecondaryButton,
  Title3,
} from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function DrawerConfirmPreview() {
  const [open, setOpen] = useState(false)
  return (
    <PreviewLayout>
      <PrimaryButton text="Confirm purchase" onClick={() => setOpen(true)} />
      <Drawer visible={open} close={() => setOpen(false)}>
        <Flex vertical gap={16} style={{ padding: 24 }}>
          <Title3>Redeem 1,200 points?</Title3>
          <Body2 color="text-3">
            You&apos;ll get a $12 voucher emailed within 5 minutes.
          </Body2>
          <Flex vertical={false} gap={8}>
            <PrimaryButton text="Confirm" onClick={() => setOpen(false)} />
            <SecondaryButton text="Cancel" onClick={() => setOpen(false)} />
          </Flex>
        </Flex>
      </Drawer>
    </PreviewLayout>
  )
}
