import {
  Body1,
  Body2,
  Callout,
  Flex,
  Footnote1,
  Footnote2,
  Headline,
  LargeTitle,
  Title1,
  Title2,
  Title3,
} from "@appboxo/ui-kit"

export function TypographyPreview() {
  return (
    <Flex vertical gap={6} style={{ padding: 16 }}>
      <LargeTitle>Large title</LargeTitle>
      <Title1>Title 1</Title1>
      <Title2>Title 2</Title2>
      <Title3>Title 3</Title3>
      <Headline>Headline</Headline>
      <Body1>Body 1 — the quick brown fox.</Body1>
      <Body2 color="text-4">Body 2 — supporting copy.</Body2>
      <Callout>Callout</Callout>
      <Footnote1 color="text-3">Footnote 1</Footnote1>
      <Footnote2 color="text-3">Footnote 2</Footnote2>
    </Flex>
  )
}
