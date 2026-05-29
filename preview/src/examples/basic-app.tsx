// Mirror of examples/basic-app/src/App.tsx so the docs iframe can render
// the full screen without us shipping basic-app as its own Vercel project.
// Kept verbatim where possible — if basic-app's App.tsx changes upstream,
// re-sync this file by hand.

import { useState } from "react"

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
  Toast,
} from "@appboxo/ui-kit"

export function BasicAppExample() {
  const [name, setName] = useState("")
  const trimmed = name.trim()

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
            <Footnote1 color="text-3">
              Hi, {trimmed} — looking good.
            </Footnote1>
          )}
        </Flex>
      </Card>

      <Tip text="We only use this on your device. Nothing leaves the phone." />

      <Flex vertical={false} gap={8}>
        <PrimaryButton
          text="Continue"
          onClick={() =>
            Toast.info(trimmed ? `See you, ${trimmed}` : "Add your name first")
          }
        />
        <SecondaryButton text="Skip" onClick={() => Toast.error("Skipped")} />
      </Flex>
    </main>
  )
}
