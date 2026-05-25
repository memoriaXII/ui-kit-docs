import {
  Body1,
  Body2,
  Callout,
  Card,
  Flex,
  Footnote1,
  Footnote2,
  Headline,
  LargeTitle,
  Title1,
  Title2,
  Title3,
} from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

export function TypographyPreview() {
  return (
    <PreviewLayout>
      <Section title="The scale" description="Every typography component the kit ships, top to bottom.">
        <Card>
          <Flex vertical gap={6}>
            <LargeTitle>LargeTitle</LargeTitle>
            <Title1>Title 1</Title1>
            <Title2>Title 2</Title2>
            <Title3>Title 3</Title3>
            <Headline>Headline</Headline>
            <Body1>Body 1 — the workhorse paragraph style.</Body1>
            <Body2>Body 2 — secondary description, slightly muted.</Body2>
            <Callout>Callout — quoted or highlighted body copy.</Callout>
            <Footnote1>Footnote 1 — captions, helper text.</Footnote1>
            <Footnote2>Footnote 2 — smallest scale, metadata.</Footnote2>
          </Flex>
        </Card>
      </Section>

      <Section
        title="Color tokens"
        description="Pass color='text-N' to shift any style onto a different token."
      >
        <Card>
          <Flex vertical gap={6}>
            <Body1 color="text-5">text-5 — primary foreground</Body1>
            <Body1 color="text-4">text-4 — slightly muted</Body1>
            <Body1 color="text-3">text-3 — captions and helpers</Body1>
            <Body1 color="text-2">text-2 — disabled-looking</Body1>
          </Flex>
        </Card>
      </Section>

      <Section
        title="Weights"
        description="Pass weight='regular' | 'medium' | 'semibold' | 'bold'."
      >
        <Card>
          <Flex vertical gap={6}>
            <Body1 weight="regular">Regular weight body</Body1>
            <Body1 weight="medium">Medium weight body</Body1>
            <Body1 weight="semibold">Semibold weight body</Body1>
            <Body1 weight="bold">Bold weight body</Body1>
          </Flex>
        </Card>
      </Section>
    </PreviewLayout>
  )
}
