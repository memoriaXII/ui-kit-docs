import { Flex, TouchCell } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function TouchCellPlainPreview() {
  return (
    <PreviewLayout>
      <Flex
        vertical
        gap={2}
        style={{ background: "var(--fill-white)", borderRadius: 12 }}
      >
        <TouchCell activeClass="cell-active" onClick={() => {}} label="Notifications" />
        <TouchCell activeClass="cell-active" onClick={() => {}} label="Language" />
        <TouchCell activeClass="cell-active" onClick={() => {}} label="Linked accounts" />
      </Flex>
      <style>{`.cell-active { background: var(--fill-2); }`}</style>
    </PreviewLayout>
  )
}
