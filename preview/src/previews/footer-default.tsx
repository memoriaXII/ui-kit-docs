import {
  Footer,
  PrimaryButton,
  SecondaryButton,
  Toast,
} from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function FooterDefaultPreview() {
  return (
    <PreviewLayout>
      <Footer>
        <PrimaryButton text="Confirm" onClick={() => Toast.info("Confirmed")} />
        <SecondaryButton text="Cancel" />
      </Footer>
    </PreviewLayout>
  )
}
