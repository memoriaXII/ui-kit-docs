import { useState } from "react"

import {
  Body1,
  Body2,
  Card,
  DialCodeSelector,
  Flex,
  PrimaryButton,
  type DialCodeItem,
} from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

export function DialCodeSelectorPreview() {
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState<DialCodeItem | null>(null)

  return (
    <PreviewLayout>
      <Section
        title="Controlled popup"
        description="You own the visible state and listen for onSelect. Tap the button to open the search-able country list."
      >
        <Card>
          <Flex vertical gap={12}>
            <Body2 color="text-3">Country / dial code</Body2>
            <PrimaryButton
              text={
                picked
                  ? `${picked.flag} ${picked.name} (${picked.callingCode})`
                  : "Pick a country"
              }
              onClick={() => setOpen(true)}
            />
            {picked && (
              <Body1>
                Selected: {picked.code} → +{picked.callingCode}
              </Body1>
            )}
          </Flex>
        </Card>
      </Section>

      <DialCodeSelector
        visible={open}
        onClose={() => setOpen(false)}
        onSelect={(item) => {
          setPicked(item)
          setOpen(false)
        }}
      />
    </PreviewLayout>
  )
}
