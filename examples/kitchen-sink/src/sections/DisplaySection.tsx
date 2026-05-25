import {
  Card,
  TouchCell,
  SummaryTable,
  Tip,
  Placeholder,
  Copyable,
  Body1,
  Body2,
  Footnote1,
  InfoCircleIcon,
} from "@appboxo/ui-kit";

import { Section, Subhead, PhoneFrame } from "./Section";

export function DisplaySection() {
  return (
    <Section
      title="Display & feedback"
      description="Read-only surfaces. Mostly Arco's Cell wrapped in opinionated layouts plus the kit's own Tip / Placeholder / Copyable composites."
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: 24,
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="Card" />
          <Card>
            <Body1 weight="semibold">Default card</Body1>
            <Footnote1>Pulls --boxo-card-mobile-* tokens.</Footnote1>
          </Card>
          <Card active>
            <Body1 weight="semibold">Active card</Body1>
            <Footnote1>Used for selected states (e.g. plan picker).</Footnote1>
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="TouchCell" />
          <PhoneFrame>
            <TouchCell
              activeClass="cell-active"
              label="Account"
              desc="Manage your profile, password and 2FA"
            />
            <TouchCell
              activeClass="cell-active"
              label="Notifications"
              desc="Push, email and in-app"
            />
            <TouchCell
              activeClass="cell-active"
              label="Help center"
              desc="Browse FAQs or contact support"
            />
          </PhoneFrame>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="SummaryTable" />
          <SummaryTable
            title="Order summary"
            items={[
              { label: "Plan", value: "Europe 5GB" },
              { label: "Validity", value: "30 days" },
              { label: "Total", value: "€18.99" },
              {
                label: "Activation fee",
                value: "Free",
                onClick: () => alert("Tooltip would open here"),
              },
            ]}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="Tip" />
          <Tip text="Tip components inherit colors from the active theme tokens." />
          <Tip
            text="prefix gets emphasised so users notice the warning at a glance."
            emphasisPrefix="Heads up: "
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="Placeholder" />
          <PhoneFrame>
            <Placeholder
              icon={
                <InfoCircleIcon
                  width={48}
                  height={48}
                  color="var(--text-3)"
                />
              }
              title="No results"
              subtitle="Try a different keyword or clear your filter to see all plans."
              button={{
                text: "Clear filter",
                onClick: () => alert("clear pressed"),
              }}
            />
          </PhoneFrame>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="Copyable" />
          <Body2>Tap the value to copy:</Body2>
          <Copyable text="UID-2FQK-9PR3-12X8">
            <Body1
              weight="semibold"
              style={{ fontFamily: "monospace", color: "var(--text-5)" }}
            >
              UID-2FQK-9PR3-12X8
            </Body1>
          </Copyable>
        </div>
      </div>
    </Section>
  );
}
