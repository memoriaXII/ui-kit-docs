import { useState } from "react"

import {
  Body1,
  Body2,
  Drawer,
  Flex,
  PrimaryButton,
  SecondaryButton,
  Title3,
} from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function DrawerDetailsPreview() {
  const [open, setOpen] = useState(false)
  return (
    <PreviewLayout>
      <SecondaryButton
        text="Open ticket details"
        onClick={() => setOpen(true)}
      />
      <Drawer visible={open} close={() => setOpen(false)}>
        <Flex vertical gap={16} style={{ padding: 24 }}>
          <Title3>Lounge pass · KUL · Plaza Premium</Title3>
          <Flex vertical gap={6}>
            <Body1 weight="semibold">Valid until</Body1>
            <Body2 color="text-3">14 Aug 2026 — 23:00 KUL local time</Body2>
          </Flex>
          <Flex vertical gap={6}>
            <Body1 weight="semibold">Booking ID</Body1>
            <Body2 color="text-3">BKG-7F3A-92EE-114B</Body2>
          </Flex>
          <PrimaryButton text="Done" onClick={() => setOpen(false)} />
        </Flex>
      </Drawer>
    </PreviewLayout>
  )
}
