import { useState } from "react"

import { Body1, Flex, Radio, TouchCell } from "@appboxo/ui-kit"

const options = ["Credit card", "PayPal", "Apple Pay"]

export function RadioPreview() {
  const [selected, setSelected] = useState(options[0])
  return (
    <Flex vertical gap={4} style={{ padding: 16 }}>
      {options.map((label) => (
        <TouchCell key={label} onClick={() => setSelected(label)}>
          <Flex align="center" gap={12}>
            <Radio active={selected === label} />
            <Body1>{label}</Body1>
          </Flex>
        </TouchCell>
      ))}
    </Flex>
  )
}
