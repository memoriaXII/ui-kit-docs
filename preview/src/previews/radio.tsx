import { useState } from "react"

import { Body1, Body2, Flex, Footnote2, Radio, TouchCell } from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

const PAYMENT_OPTIONS = [
  { value: "card", label: "Credit card", desc: "•••• 4242" },
  { value: "paypal", label: "PayPal", desc: "nurs@boxo.com" },
  { value: "apple", label: "Apple Pay", desc: "Default device" },
] as const

const PLANS = [
  { value: "monthly", label: "Monthly", desc: "$9.99 / mo" },
  { value: "yearly", label: "Yearly", desc: "$95.88 / yr — save 20%" },
] as const

export function RadioPreview() {
  const [payment, setPayment] = useState<string>("card")
  const [plan, setPlan] = useState<string>("monthly")

  return (
    <PreviewLayout>
      <Section
        title="Standalone marks"
        description="The Radio export is the visual circle only — combine with whatever row layout you need."
      >
        <Flex gap={20} align="center">
          <Flex vertical gap={6} align="center">
            <Radio active />
            <Footnote2 color="text-3">active</Footnote2>
          </Flex>
          <Flex vertical gap={6} align="center">
            <Radio active={false} />
            <Footnote2 color="text-3">inactive</Footnote2>
          </Flex>
        </Flex>
      </Section>

      <Section
        title="Payment method"
        description="Composed with TouchCell + Flex — the kit doesn't ship a RadioGroup, so wire your own state."
      >
        <Flex vertical gap={4}>
          {PAYMENT_OPTIONS.map((opt) => (
            <TouchCell
              key={opt.value}
              activeClass="cell-active"
              onClick={() => setPayment(opt.value)}
              label={
                <Flex align="center" gap={12}>
                  <Radio active={payment === opt.value} />
                  <Flex vertical gap={2}>
                    <Body1>{opt.label}</Body1>
                    <Body2 color="text-3">{opt.desc}</Body2>
                  </Flex>
                </Flex>
              }
            />
          ))}
        </Flex>
      </Section>

      <Section title="Plan selector">
        <Flex vertical gap={4}>
          {PLANS.map((opt) => (
            <TouchCell
              key={opt.value}
              activeClass="cell-active"
              onClick={() => setPlan(opt.value)}
              label={
                <Flex align="center" gap={12}>
                  <Radio active={plan === opt.value} />
                  <Flex vertical gap={2}>
                    <Body1>{opt.label}</Body1>
                    <Body2 color="text-3">{opt.desc}</Body2>
                  </Flex>
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
