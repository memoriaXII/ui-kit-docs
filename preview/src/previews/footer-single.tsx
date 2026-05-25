import { Footer, PrimaryButton, Toast } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function FooterSinglePreview() {
  return (
    <PreviewLayout>
      <Footer>
        <PrimaryButton
          text="Continue"
          onClick={() => Toast.info("Continue tapped")}
        />
      </Footer>
    </PreviewLayout>
  )
}
