import { useState } from "react"

import {
  Body2,
  Flex,
  PopupSwiper,
  PrimaryButton,
  SecondaryButton,
  Title3,
} from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function PopupSwiperDefaultPreview() {
  const [open, setOpen] = useState(false)
  return (
    <PreviewLayout>
      <PrimaryButton text="Open popup" onClick={() => setOpen(true)} />
      <PopupSwiper
        visible={open}
        close={() => setOpen(false)}
        direction="bottom"
        allowSwipeDirections={["bottom"]}
      >
        <Flex
          vertical
          gap={16}
          style={{
            background: "var(--boxo-card-mobile-background, var(--fill-white))",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: 24,
          }}
        >
          <Title3>Custom popup</Title3>
          <Body2 color="text-3">
            Lower-level than Drawer — you control direction, swipe behaviour
            and inner styling. Reach for Drawer first for standard bottom
            sheets.
          </Body2>
          <SecondaryButton text="Close" onClick={() => setOpen(false)} />
        </Flex>
      </PopupSwiper>
    </PreviewLayout>
  )
}
