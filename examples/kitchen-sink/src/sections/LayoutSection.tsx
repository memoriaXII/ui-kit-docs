import {
  Flex,
  LayoutLoading,
  PrimaryButton,
  SecondaryButton,
  Body1,
  Body2,
  ChevronLeftIcon,
} from "@appboxo/ui-kit";

import { Section, Subhead, PhoneFrame } from "./Section";

const FlexBox = ({ label }: { label: string }) => (
  <div
    style={{
      background: "var(--primary-2)",
      color: "var(--text-5)",
      padding: "12px 16px",
      borderRadius: 6,
      textAlign: "center",
      fontSize: 13,
    }}
  >
    {label}
  </div>
);

export function LayoutSection() {
  return (
    <Section
      title="Layout primitives"
      description="Composition helpers. The kit's full Layout / NavBar widget is intentionally omitted here -- it pulls in next-i18next + iframe-aware logic that doesn't make sense outside a real page. We render NavBar's visual chrome by hand instead."
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="Flex (horizontal)" />
          <Flex vertical={false} gap={12}>
            <FlexBox label="A" />
            <FlexBox label="B" />
            <FlexBox label="C" />
          </Flex>

          <Subhead label="Flex (vertical)" />
          <Flex gap={8}>
            <FlexBox label="Row 1" />
            <FlexBox label="Row 2" />
            <FlexBox label="Row 3" />
          </Flex>

          <Subhead label="Flex (space-between)" />
          <Flex
            vertical={false}
            justify="space-between"
            align="center"
            gap={8}
            style={{
              padding: 12,
              border: "1px solid var(--line-1)",
              borderRadius: 6,
            }}
          >
            <Body1>Left</Body1>
            <Body2>Center</Body2>
            <Body1>Right</Body1>
          </Flex>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="NavBar (Arco visual chrome)" />
          <PhoneFrame>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "0 12px",
                height: "var(--nav-bar-height, 1rem)",
                background: "var(--fill-white)",
                borderBottom: "1px solid var(--line-1)",
              }}
            >
              <ChevronLeftIcon
                width={20}
                height={20}
                color="var(--text-5)"
              />
              <Body1 weight="semibold" style={{ flex: 1, textAlign: "center" }}>
                Page title
              </Body1>
              <span style={{ width: 20 }} />
            </div>
            <div style={{ padding: 16 }}>
              <Body2>Page content goes here.</Body2>
            </div>
          </PhoneFrame>

          <Subhead label="Footer" />
          <PhoneFrame>
            <div style={{ padding: 16 }}>
              <Body2>Above the footer …</Body2>
            </div>
            <div
              style={{
                padding: 16,
                borderTop: "1px solid var(--line-1)",
                background: "var(--fill-white)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <PrimaryButton text="Continue" />
              <SecondaryButton text="Skip" />
            </div>
          </PhoneFrame>

          <Subhead label="LayoutLoading" />
          <PhoneFrame>
            <div
              style={{
                height: 160,
                position: "relative",
                // LayoutLoading is `position: fixed` on purpose
                // (it's a full-screen overlay in real apps). A
                // `transform` on the parent makes it the nearest
                // containing block, which traps the fixed position
                // inside the phone frame for the kitchen sink.
                transform: "translateZ(0)",
              }}
            >
              <LayoutLoading />
            </div>
          </PhoneFrame>
        </div>
      </div>
    </Section>
  );
}
