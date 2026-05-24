import { Checkbox, Flex } from "@appboxo/ui-kit"

export function CheckboxPreview() {
  return (
    <Flex vertical gap={12} style={{ padding: 16 }}>
      <Checkbox iconType="circle-dot" defaultChecked>
        Accept terms and conditions
      </Checkbox>
      <Checkbox iconType="circle-outline-dot">
        Subscribe to newsletter
      </Checkbox>
    </Flex>
  )
}
