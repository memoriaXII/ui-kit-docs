import { Body1, Flex, Footnote1, TouchCell } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

const ROWS: Array<[string, string]> = [
  ["Plan", "Premium"],
  ["Billing cycle", "Monthly"],
  ["Next charge", "Aug 14, 2026"],
]

export function TouchCellTrailingPreview() {
  return (
    <PreviewLayout>
      <Flex
        vertical
        gap={2}
        style={{ background: "var(--fill-white)", borderRadius: 12 }}
      >
        {ROWS.map(([key, val]) => (
          <TouchCell
            key={key}
            activeClass="cell-active"
            onClick={() => {}}
            label={
              <Flex vertical={false} justify="space-between" align="center">
                <Body1>{key}</Body1>
                <Footnote1 color="text-3">{val}</Footnote1>
              </Flex>
            }
          />
        ))}
      </Flex>
      <style>{`.cell-active { background: var(--fill-2); }`}</style>
    </PreviewLayout>
  )
}
