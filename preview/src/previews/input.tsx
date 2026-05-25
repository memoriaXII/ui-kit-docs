// Legacy combined view — kept for the components grid thumbnail. The
// per-variant routes live in `input-*.tsx`.

import { InputDefaultPreview } from "./input-default"

export function InputPreview() {
  return <InputDefaultPreview />
}

export { InputDefaultPreview } from "./input-default"
export { InputFilledPreview } from "./input-filled"
export { InputErrorPreview } from "./input-error"
export { InputDisabledPreview } from "./input-disabled"
