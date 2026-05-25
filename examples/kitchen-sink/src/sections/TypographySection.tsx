import {
  LargeTitle,
  Title1,
  Title2,
  Title3,
  TitleSmall,
  Headline,
  Callout,
  Body1,
  Body2,
  Footnote1,
  Footnote2,
  SubTitle,
  Caption1,
  Caption2,
} from "@appboxo/ui-kit";

import { Section, Subhead } from "./Section";

// The kit's typography exports map 1:1 to a named text style in the
// design system. Render every one in scale order so designers can
// spot any unintended overrides a brand stylesheet introduced (some
// brands tweak `.title1 { font-weight: 600 }` etc., which shows up
// here without us having to chase it through stories).
const STYLES: Array<{ name: string; render: () => React.ReactNode }> = [
  { name: "LargeTitle", render: () => <LargeTitle>Large title</LargeTitle> },
  { name: "Title1", render: () => <Title1>Title 1 / Article</Title1> },
  { name: "Title2", render: () => <Title2>Title 2 / Section</Title2> },
  { name: "Title3", render: () => <Title3>Title 3 / Group</Title3> },
  { name: "TitleSmall", render: () => <TitleSmall>Title small</TitleSmall> },
  { name: "Headline", render: () => <Headline>Headline copy</Headline> },
  { name: "SubTitle", render: () => <SubTitle>Subtitle copy</SubTitle> },
  { name: "Callout", render: () => <Callout>Callout copy</Callout> },
  {
    name: "Body1",
    render: () => (
      <Body1>
        Body 1 — paragraph length copy. The quick brown fox jumps over the
        lazy dog.
      </Body1>
    ),
  },
  {
    name: "Body2",
    render: () => (
      <Body2>
        Body 2 — paragraph length copy. The quick brown fox jumps over the
        lazy dog.
      </Body2>
    ),
  },
  {
    name: "Footnote1",
    render: () => <Footnote1>Footnote 1 — secondary inline copy.</Footnote1>,
  },
  {
    name: "Footnote2",
    render: () => <Footnote2>Footnote 2 — secondary inline copy.</Footnote2>,
  },
  { name: "Caption1", render: () => <Caption1>Caption 1</Caption1> },
  { name: "Caption2", render: () => <Caption2>Caption 2</Caption2> },
];

const WEIGHT_DEMOS: Array<{ weight: "regular" | "medium" | "semibold" | "bold" }> = [
  { weight: "regular" },
  { weight: "medium" },
  { weight: "semibold" },
  { weight: "bold" },
];

export function TypographySection() {
  return (
    <Section
      title="Typography"
      description="All named scales, top to bottom. Every component supports the four weight tokens (regular / medium / semibold / bold) via the `weight` prop."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Subhead label="Scale" />
        {STYLES.map(({ name, render }) => (
          <div
            key={name}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(120px, 160px) 1fr",
              gap: 16,
              alignItems: "center",
            }}
          >
            <code
              style={{
                fontSize: 12,
                color: "var(--text-3)",
                fontFamily: "monospace",
              }}
            >
              {name}
            </code>
            <div>{render()}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Subhead label="Weights (Body1)" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
          }}
        >
          {WEIGHT_DEMOS.map(({ weight }) => (
            <Body1 key={weight} weight={weight}>
              {weight}: The quick brown fox.
            </Body1>
          ))}
        </div>
      </div>
    </Section>
  );
}
