import { useState } from "react"
import { Body1, Flex, Masking, PrimaryButton, Title3 } from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

export function MaskingDefaultPreview() {
  const [open, setOpen] = useState(false)

  return (
    <PreviewLayout>
      <Section
        title="Masking"
        description="Raw Arco Mobile Masking passthrough — a full-screen blocking overlay used for confirms / inline auth prompts. Pair with body content of your choice."
      >
        <Flex gap={12}>
          <PrimaryButton text="Open mask" onClick={() => setOpen(true)} />
        </Flex>

        <Masking visible={open} maskClass="!bg-[rgba(0,0,0,0.6)]">
          <div
            style={{
              minWidth: 280,
              maxWidth: 320,
              background: "var(--fill-1)",
              borderRadius: 16,
              padding: 20,
            }}
          >
            <Flex gap={12}>
              <Title3 weight="semibold">Confirm purchase</Title3>
              <Body1 color="text-3">
                The mask blocks taps outside the dialog until you close it.
              </Body1>
              <Flex vertical={false} gap={8} justify="end">
                <PrimaryButton text="Close" onClick={() => setOpen(false)} />
              </Flex>
            </Flex>
          </div>
        </Masking>
      </Section>
    </PreviewLayout>
  )
}
