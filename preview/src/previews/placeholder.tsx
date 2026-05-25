import { Placeholder, PrimaryButton } from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

export function PlaceholderPreview() {
  return (
    <PreviewLayout>
      <Section
        title="Empty list"
        description="Title + supporting copy + CTA. Use as the rendered output of any empty-list state."
      >
        <Placeholder
          title="No tickets yet"
          description="Your purchased lounge passes will show up here once you book one."
          action={<PrimaryButton text="Browse lounges" />}
        />
      </Section>

      <Section
        title="No description"
        description="title-only variant for terse states."
      >
        <Placeholder title="Nothing here." />
      </Section>
    </PreviewLayout>
  )
}
