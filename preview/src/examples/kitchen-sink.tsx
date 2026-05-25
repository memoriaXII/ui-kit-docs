// Condensed version of examples/kitchen-sink. The full kitchen-sink has
// 9 sections + a brand toolbar; here we render a representative subset
// (typography, buttons, inputs, surfaces, toast triggers) so the iframe
// stays scannable. Use the file tree on the docs page to read the full
// section files, or `pnpm dev` the example locally for the complete tour.

import { useState } from "react"

import {
  Body1,
  Body2,
  Card,
  Checkbox,
  Flex,
  Footnote2,
  Input,
  LargeTitle,
  PrimaryButton,
  QuaternaryButton,
  Radio,
  SearchBar,
  SecondaryButton,
  TertiaryButton,
  TextArea,
  Tip,
  Title2,
  Title3,
  Toast,
  TouchCell,
} from "@appboxo/ui-kit"

export function KitchenSinkExample() {
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [agreed, setAgreed] = useState(true)
  const [plan, setPlan] = useState("monthly")

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--fill-1)",
        color: "var(--text-5)",
        padding: "32px 24px 48px",
        maxWidth: 820,
        margin: "0 auto",
      }}
    >
      <Flex vertical gap={24}>
        <Flex vertical gap={4}>
          <LargeTitle>Kitchen sink</LargeTitle>
          <Body2 color="text-3">
            A trimmed tour through the kit's typography, forms, buttons and
            surfaces. Switch the active brand from the docs header to repaint
            everything below.
          </Body2>
        </Flex>

        <Section title="Typography">
          <Card>
            <Flex vertical gap={4}>
              <LargeTitle>LargeTitle</LargeTitle>
              <Title2>Title 2</Title2>
              <Title3>Title 3</Title3>
              <Body1>Body 1 — the workhorse paragraph style.</Body1>
              <Body2 color="text-3">
                Body 2 — secondary description, slightly muted.
              </Body2>
              <Footnote2 color="text-3">Footnote 2 — captions.</Footnote2>
            </Flex>
          </Card>
        </Section>

        <Section title="Buttons">
          <Card>
            <Flex vertical gap={12}>
              <Flex vertical={false} gap={8} wrap="wrap">
                <PrimaryButton text="Primary" onClick={() => Toast.info("Primary")} />
                <SecondaryButton text="Secondary" onClick={() => Toast.info("Secondary")} />
                <TertiaryButton text="Tertiary" onClick={() => Toast.info("Tertiary")} />
                <QuaternaryButton text="Quaternary" onClick={() => Toast.info("Quaternary")} />
              </Flex>
              <Footnote2 color="text-3">
                Four exports, four token paths — see the Components docs for
                the full prop surface.
              </Footnote2>
            </Flex>
          </Card>
        </Section>

        <Section title="Forms">
          <Card>
            <Flex vertical gap={16}>
              <Flex vertical gap={6}>
                <Body1 weight="semibold">Search</Body1>
                <SearchBar placeholder="Search rewards, stores, brands…" />
              </Flex>

              <Flex vertical gap={6}>
                <Body1 weight="semibold">Your name</Body1>
                <Input
                  value={name}
                  onChange={(_e, v) => setName(v)}
                  placeholder="e.g. Nurs"
                />
              </Flex>

              <Flex vertical gap={6}>
                <Body1 weight="semibold">About you</Body1>
                <TextArea
                  value={bio}
                  onChange={(_e, v) => setBio(v)}
                  placeholder="A few words…"
                  autoSize={{ minRows: 3, maxRows: 6 }}
                />
              </Flex>

              <Checkbox
                iconType="circle-dot"
                checked={agreed}
                onChange={(c) => setAgreed(c)}
              >
                Agree to terms and conditions
              </Checkbox>

              <Flex vertical gap={4}>
                <Body1 weight="semibold">Plan</Body1>
                {(["monthly", "yearly"] as const).map((opt) => (
                  <TouchCell
                    key={opt}
                    onClick={() => setPlan(opt)}
                    activeClass="cell-active"
                    label={
                      <Flex vertical={false} align="center" gap={10}>
                        <Radio active={plan === opt} />
                        <Body1 style={{ textTransform: "capitalize" }}>{opt}</Body1>
                      </Flex>
                    }
                  />
                ))}
              </Flex>
            </Flex>
          </Card>
        </Section>

        <Section title="Surfaces">
          <Card>
            <Flex vertical gap={12}>
              <Tip text="Tip — inline hint with an icon. Reads --info-* tokens." />
              <Tip
                emphasisPrefix="Heads up:"
                text="emphasisPrefix bolds the leading clause without changing the icon or layout."
              />
            </Flex>
          </Card>
        </Section>

        <Section title="Toasts">
          <Card>
            <Flex vertical={false} gap={8}>
              <PrimaryButton
                text="Info"
                onClick={() => Toast.info("Saved")}
              />
              <SecondaryButton
                text="Error"
                onClick={() => Toast.error("Network error")}
              />
            </Flex>
          </Card>
        </Section>
      </Flex>

      <style>{`
        .cell-active { background: var(--fill-2); }
      `}</style>
    </div>
  )
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <Flex vertical gap={8}>
      <Footnote2 color="text-3" style={{ textTransform: "uppercase", letterSpacing: 0.6 }}>
        {title}
      </Footnote2>
      {children}
    </Flex>
  </section>
)
