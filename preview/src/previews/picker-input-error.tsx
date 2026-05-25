import { Body1, Flex, Footnote2, PickerInput } from "@appboxo/ui-kit"

const COUNTRIES = [
  [
    { label: "Singapore", value: "SG" },
    { label: "Taiwan", value: "TW" },
    { label: "United States", value: "US" },
  ],
]

import { PreviewLayout } from "./_section"

export function PickerInputErrorPreview() {
  return (
    <PreviewLayout>
      <Flex vertical gap={6}>
        <Body1 weight="semibold">Country</Body1>
        <PickerInput data={COUNTRIES} value={[]} hasError onOk={() => {}} />
        <Footnote2 color="text-3">Please select a country.</Footnote2>
      </Flex>
    </PreviewLayout>
  )
}
