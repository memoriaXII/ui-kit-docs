import { Checkbox, Flex } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function CheckboxDisabledPreview() {
  return (
    <PreviewLayout>
      <Flex vertical gap={10}>
        <Checkbox iconType="circle-dot" disabled checked>
          Disabled & checked
        </Checkbox>
        <Checkbox iconType="circle-dot" disabled>
          Disabled & unchecked
        </Checkbox>
      </Flex>
    </PreviewLayout>
  )
}
