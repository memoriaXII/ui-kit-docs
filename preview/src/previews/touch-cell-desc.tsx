import { Flex, TouchCell } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function TouchCellDescPreview() {
  return (
    <PreviewLayout>
      <Flex
        vertical
        gap={2}
        style={{ background: "var(--fill-white)", borderRadius: 12 }}
      >
        <TouchCell
          activeClass="cell-active"
          onClick={() => {}}
          label="Account"
          desc="Profile, name, email"
        />
        <TouchCell
          activeClass="cell-active"
          onClick={() => {}}
          label="Payments"
          desc="Cards, wallets, billing history"
        />
        <TouchCell
          activeClass="cell-active"
          onClick={() => {}}
          label="Privacy"
          desc="Visibility, analytics, marketing"
        />
      </Flex>
      <style>{`.cell-active { background: var(--fill-2); }`}</style>
    </PreviewLayout>
  )
}
