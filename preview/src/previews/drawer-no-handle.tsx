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

export function DrawerNoHandlePreview() {
  const [open, setOpen] = useState(false)
  return (
    <PreviewLayout>
      <SecondaryButton
        text="Open without handle"
        onClick={() => setOpen(true)}
      />
      <Drawer hideControl visible={open} close={() => setOpen(false)}>
        <Flex vertical gap={16} style={{ padding: 24 }}>
          <Title3>No drag handle</Title3>
          <Body2 color="text-3">
            Use this variant when the user should dismiss via an explicit
            button only. Swipe-down still works.
          </Body2>
          <PrimaryButton text="Close" onClick={() => setOpen(false)} />
        </Flex>
      </Drawer>
    </PreviewLayout>
  )
}
