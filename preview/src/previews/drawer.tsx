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

import { PreviewLayout, Section } from "./_section"

export function DrawerPreview() {
  const [confirm, setConfirm] = useState(false)
  const [details, setDetails] = useState(false)
  const [noHandle, setNoHandle] = useState(false)

  return (
    <PreviewLayout>
      <Section
        title="Confirmation drawer"
        description="Default control bar + swipe-down to dismiss."
      >
        <PrimaryButton
          text="Confirm purchase"
          onClick={() => setConfirm(true)}
        />
        <Drawer visible={confirm} close={() => setConfirm(false)}>
          <Flex vertical gap={16} style={{ padding: 24 }}>
            <Title3>Redeem 1,200 points?</Title3>
            <Body2 color="text-3">
              You'll get a $12 voucher emailed to nurs@boxo.com within 5
              minutes.
            </Body2>
            <Flex gap={8}>
              <PrimaryButton text="Confirm" onClick={() => setConfirm(false)} />
              <SecondaryButton
                text="Cancel"
                onClick={() => setConfirm(false)}
              />
            </Flex>
          </Flex>
        </Drawer>
      </Section>

      <Section
        title="Details drawer"
        description="Bigger drawer with mixed content."
      >
        <SecondaryButton
          text="Open ticket details"
          onClick={() => setDetails(true)}
        />
        <Drawer visible={details} close={() => setDetails(false)}>
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
            <Flex vertical gap={6}>
              <Body1 weight="semibold">Guest</Body1>
              <Body2 color="text-3">Nurs · primary holder</Body2>
            </Flex>
            <PrimaryButton text="Done" onClick={() => setDetails(false)} />
          </Flex>
        </Drawer>
      </Section>

      <Section
        title="No drag handle"
        description="Pass hideControl when you want the user to dismiss only via the explicit close button."
      >
        <SecondaryButton
          text="Open without handle"
          onClick={() => setNoHandle(true)}
        />
        <Drawer
          hideControl
          visible={noHandle}
          close={() => setNoHandle(false)}
        >
          <Flex vertical gap={16} style={{ padding: 24 }}>
            <Title3>No drag handle</Title3>
            <Body2 color="text-3">
              The grab indicator at the top is hidden. Swipe still works.
            </Body2>
            <PrimaryButton text="Close" onClick={() => setNoHandle(false)} />
          </Flex>
        </Drawer>
      </Section>
    </PreviewLayout>
  )
}
