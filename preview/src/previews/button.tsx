// Legacy combined view — kept so the landing-page "Quick taste" still
// works. The dedicated per-variant routes live in `button-*.tsx`.

import { ButtonVariantsPreview } from "./button-variants"

export function ButtonPreview() {
  return <ButtonVariantsPreview />
}

export { ButtonVariantsPreview } from "./button-variants"
export { ButtonLinkPreview } from "./button-link"
export { ButtonDisabledPreview } from "./button-disabled"
export { ButtonLoadingPreview } from "./button-loading"
