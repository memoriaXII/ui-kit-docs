import { useState } from "react"

import { Body1, Body2, Flex, Radio, TouchCell } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

const OPTIONS = [
  { value: "card", label: "Credit card", desc: "•••• 4242" },
  { value: "paypal", label: "PayPal", desc: "nurs@boxo.com" },
  { value: "apple", label: "Apple Pay", desc: "Default device" },
] as const

export function RadioGroupPreview() {
  const [selected, setSelected] = useState<string>("card")
  return (
    <PreviewLayout>
      <Flex vertical gap={4}>
        {OPTIONS.map((opt) => (
          <TouchCell
            key={opt.value}
            activeClass="cell-active"
            onClick={() => setSelected(opt.value)}
            label={
              <Flex vertical={false} align="center" gap={12}>
                <Radio active={selected === opt.value} />
                <Flex vertical gap={2}>
                  <Body1>{opt.label}</Body1>
                  <Body2 color="text-3">{opt.desc}</Body2>
                </Flex>
              </Flex>
            }
          />
        ))}
      </Flex>
      <style>{`.cell-active { background: var(--fill-2); }`}</style>
    </PreviewLayout>
  )
}
