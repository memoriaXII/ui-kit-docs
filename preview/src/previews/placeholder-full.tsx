import { Placeholder, PrimaryButton } from "@appboxo/ui-kit"

import { PreviewLayout } from "./_section"

export function PlaceholderFullPreview() {
  return (
    <PreviewLayout>
      <Placeholder
        title="No tickets yet"
        description="Your purchased lounge passes will show up here once you book one."
        action={<PrimaryButton text="Browse lounges" />}
      />
    </PreviewLayout>
  )
}
