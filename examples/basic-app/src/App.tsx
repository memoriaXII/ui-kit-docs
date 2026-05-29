import { useState } from "react";
import {
  Body1,
  Body2,
  Card,
  Flex,
  Footnote1,
  Input,
  LargeTitle,
  PrimaryButton,
  SecondaryButton,
  Tip,
} from "@appboxo/ui-kit";

// `basic-app` is the smallest @appboxo/ui-kit consumer that still
// looks like a real screen. Everything here is one file on purpose --
// if you're skimming the repo to decide whether the kit is for you,
// you can read it in 30 seconds. For richer wiring patterns, see the
// sibling examples (kitchen-sink, freedom-theme, pass-freedom).
export const App = () => {
  const [name, setName] = useState("");
  const trimmed = name.trim();

  return (
    <main
      style={{
        maxWidth: 750,
        margin: "0 auto",
        minHeight: "100vh",
        padding: "32px 24px 48px",
        background: "var(--fill-white)",
        color: "var(--text-5)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <Flex vertical gap={4}>
        <LargeTitle>Welcome</LargeTitle>
        <Body2 color="text-4">Tell us your name to get started.</Body2>
      </Flex>

      <Card>
        <Flex vertical gap={12}>
          <Body1 weight="semibold">Your name</Body1>
          <Input
            value={name}
            onChange={(_e, value) => setName(value)}
            placeholder="e.g. Alex Morgan"
          />
          {trimmed && (
            <Footnote1 color="text-3">Hi, {trimmed} — looking good.</Footnote1>
          )}
        </Flex>
      </Card>

      <Tip text="We only use this on your device. Nothing leaves the phone." />

      <Flex gap={8}>
        <PrimaryButton text="Continue" />
        <SecondaryButton text="Skip" />
      </Flex>
    </main>
  );
};
