import { useState } from "react"

import { Body1, Flex, PickerInput } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

const THEME_OPTIONS = [
  [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "System", value: "system" },
  ],
]

export function PickerInputDefaultPreview() {
  const [value, setValue] = useState<(string | number)[]>(["light"])
  return (
    <PreviewLayout>
      <Flex vertical gap={6}>
        <Body1 weight="semibold">Theme</Body1>
        <PickerInput
          data={THEME_OPTIONS}
          value={value}
          onOk={(v) => setValue(v)}
        />
      </Flex>
    </PreviewLayout>
  )
}
