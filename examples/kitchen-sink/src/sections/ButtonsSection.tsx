import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  QuaternaryButton,
} from "@appboxo/ui-kit";

import { Section, Subhead } from "./Section";

const ROW_STYLE: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  alignItems: "center",
};

export function ButtonsSection() {
  return (
    <Section
      title="Buttons"
      description="Four kit-shipped variants. Each consumes its own --button-* tokens, so a brand can override one without touching the others."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Subhead label="Default state" />
        <div style={ROW_STYLE}>
          <PrimaryButton text="Primary" />
          <SecondaryButton text="Secondary" />
          <TertiaryButton text="Tertiary" />
          <QuaternaryButton text="Quaternary" />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Subhead label="Disabled" />
        <div style={ROW_STYLE}>
          <PrimaryButton text="Primary" disabled />
          <SecondaryButton text="Secondary" disabled />
          <TertiaryButton text="Tertiary" disabled />
          <QuaternaryButton text="Quaternary" disabled />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Subhead label="Loading" />
        <div style={ROW_STYLE}>
          <PrimaryButton text="Saving…" loading />
          <SecondaryButton text="Saving…" loading />
        </div>
      </div>
    </Section>
  );
}
