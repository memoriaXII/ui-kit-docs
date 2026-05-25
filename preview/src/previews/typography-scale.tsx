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

import { PreviewLayout } from "./_section"

export function TypographyScalePreview() {
  return (
    <PreviewLayout>
      <Card>
        <Flex vertical gap={6}>
          <LargeTitle>LargeTitle</LargeTitle>
          <Title1>Title 1</Title1>
          <Title2>Title 2</Title2>
          <Title3>Title 3</Title3>
          <Headline>Headline</Headline>
          <Body1>Body 1 — the workhorse paragraph style.</Body1>
          <Body2>Body 2 — secondary description, slightly muted.</Body2>
          <Callout>Callout — quoted / highlighted body copy.</Callout>
          <Footnote1>Footnote 1 — captions, helper text.</Footnote1>
          <Footnote2>Footnote 2 — smallest scale, metadata.</Footnote2>
        </Flex>
      </Card>
    </PreviewLayout>
  )
}
