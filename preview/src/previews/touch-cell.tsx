import {
  Body1,
  Body2,
  Flex,
  Footnote1,
  TouchCell,
} from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

export function TouchCellPreview() {
  return (
    <PreviewLayout>
      <Section
        title="Plain rows"
        description="Tappable rows with active-state feedback. Use for settings, lists, picker triggers."
      >
        <Flex vertical gap={2} style={{ background: "var(--fill-white)", borderRadius: 12 }}>
          <TouchCell
            activeClass="cell-active"
            onClick={() => {}}
            label="Notifications"
          />
          <TouchCell
            activeClass="cell-active"
            onClick={() => {}}
            label="Language"
          />
          <TouchCell
            activeClass="cell-active"
            onClick={() => {}}
            label="Linked accounts"
          />
        </Flex>
      </Section>

      <Section
        title="Label + description"
        description="Use desc for the secondary line."
      >
        <Flex vertical gap={2} style={{ background: "var(--fill-white)", borderRadius: 12 }}>
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
      </Section>

      <Section
        title="With trailing value"
        description="Composed via JSX in label to surface a status / value on the right."
      >
        <Flex vertical gap={2} style={{ background: "var(--fill-white)", borderRadius: 12 }}>
          {[
            ["Plan", "Premium"],
            ["Billing cycle", "Monthly"],
            ["Next charge", "Aug 14, 2026"],
          ].map(([key, val]) => (
            <TouchCell
              key={key}
              activeClass="cell-active"
              onClick={() => {}}
              label={
                <Flex justify="space-between" align="center">
                  <Body1>{key}</Body1>
                  <Footnote1 color="text-3">{val}</Footnote1>
                </Flex>
              }
            />
          ))}
        </Flex>
      </Section>

      <style>{`.cell-active { background: var(--fill-2); }`}</style>
    </PreviewLayout>
  )
}
