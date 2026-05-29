// Direct port of examples/freedom-theme/src/App.tsx so the docs iframe
// can render the full showcase without us shipping freedom-theme as its
// own Vercel project. The shared App is identical between
// examples/{freedom-theme,custom-theme} — only `main.tsx` differs (which
// stylesheet stack you import). We render it with the Freedom-brand
// props here; partners who want to see the Citrus overlay run
// examples/custom-theme locally.
//
// If freedom-theme's App.tsx changes upstream, re-sync this file by hand.

import { ReactNode, useLayoutEffect, useState } from "react"

import {
  Body1,
  Body2,
  Card,
  Copyable,
  Flex,
  Footnote2,
  Input,
  LargeTitle,
  PrimaryButton,
  QuaternaryButton,
  SecondaryButton,
  TertiaryButton,
  Tip,
  Title2,
  Title3,
  TouchCell,
} from "@appboxo/ui-kit"

const SWATCH_TOKENS: Array<{ name: string; label: string }> = [
  { name: "--primary-6", label: "Primary" },
  { name: "--primary-1", label: "Primary tint" },
  { name: "--success-6", label: "Success" },
  { name: "--warning-6", label: "Warning" },
  { name: "--danger-6", label: "Danger" },
  { name: "--info-6", label: "Info" },
]

const useTokenSwatches = (dark: boolean) => {
  const [values, setValues] = useState<Record<string, string>>({})
  useLayoutEffect(() => {
    const root = document.getElementById("root")
    if (!root) return
    const computed = getComputedStyle(root)
    setValues(
      Object.fromEntries(
        SWATCH_TOKENS.map((t) => [
          t.name,
          computed.getPropertyValue(t.name).trim() || "—",
        ])
      )
    )
  }, [dark])
  return values
}

const INSTALL_SNIPPET = `import "@arco-design/mobile-react/esm/style"
import "@appboxo/ui-kit/styles.css"
import "@appboxo/ui-kit/themes/freedom/theme.css"`

export function FreedomThemeExample() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [hasError, setHasError] = useState(false)
  const [dark, setDark] = useState(false)
  const swatches = useTokenSwatches(dark)

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    const root = document.getElementById("root")
    if (next) root?.classList.add("arco-theme-dark")
    else root?.classList.remove("arco-theme-dark")
  }

  return (
    <div className="page-shell">
      <div className="grid">
        <aside className="brand-rail">
          <Flex vertical gap={20}>
            <Flex vertical gap={6}>
              <Footnote2 color="text-3">@appboxo/ui-kit</Footnote2>
              <LargeTitle>Freedom</LargeTitle>
              <Body2 color="text-3">
                The bundled Freedom theme — every token wired, light & dark
                palettes ready, demonstrates the kit running with its
                opinionated default brand.
              </Body2>
            </Flex>

            <Card>
              <Flex vertical gap={12}>
                <Footnote2 color="text-3">Appearance</Footnote2>
                <SecondaryButton
                  text={dark ? "Switch to light" : "Switch to dark"}
                  onClick={toggleDark}
                />
                <Footnote2 color="text-3">
                  Flips <code>arco-theme-dark</code> on <code>#root</code>;
                  the kit re-reads every <code>--*</code> token from CSS.
                </Footnote2>
              </Flex>
            </Card>

            <Card>
              <Flex vertical gap={12}>
                <Footnote2 color="text-3">Live tokens</Footnote2>
                <Flex vertical gap={10}>
                  {SWATCH_TOKENS.map((t) => (
                    <Flex
                      key={t.name}
                      vertical={false}
                      gap={12}
                      align="center"
                    >
                      <div
                        className="swatch"
                        style={{ background: `var(${t.name})` }}
                      />
                      <Flex vertical gap={2}>
                        <Body2 weight="semibold">{t.label}</Body2>
                        <span className="mono muted">
                          {swatches[t.name] || "—"}
                        </span>
                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </Card>

            <Card>
              <Flex vertical gap={10}>
                <Footnote2 color="text-3">Add to your app entry</Footnote2>
                <Copyable text={INSTALL_SNIPPET}>
                  <pre className="codeblock">{INSTALL_SNIPPET}</pre>
                </Copyable>
                <Footnote2 color="text-3">
                  Click anywhere on the snippet to copy.
                </Footnote2>
              </Flex>
            </Card>
          </Flex>
        </aside>

        <main className="showcase">
          <Section
            eyebrow="Form"
            title="Inputs respect token state"
            blurb="Focus ring, error state, and the inline link all flow from the active brand's CSS variables."
          >
            <Card>
              <Flex vertical gap={20}>
                <Flex vertical gap={6}>
                  <Body1 weight="semibold">Your name</Body1>
                  <Input
                    value={name}
                    onChange={(_e, val) => setName(val)}
                    placeholder="Type to see the focus ring"
                  />
                </Flex>

                <Flex vertical gap={6}>
                  <Body1 weight="semibold">Phone</Body1>
                  <Input
                    value={phone}
                    hasError={hasError}
                    onChange={(_e, val) => setPhone(val)}
                    placeholder="Toggle error state below"
                  />
                  <Flex
                    vertical={false}
                    justify="space-between"
                    align="center"
                  >
                    <Footnote2 color="text-3">
                      Reads <code>--danger-*</code> when in error.
                    </Footnote2>
                    <span
                      className="inline-link"
                      onClick={() => setHasError(!hasError)}
                      role="button"
                      tabIndex={0}
                    >
                      {hasError ? "Clear error" : "Trigger error"}
                    </span>
                  </Flex>
                </Flex>

                <Tip
                  emphasisPrefix="Tip "
                  text="reads --info-* tokens. Cards read --boxo-card-mobile-*. Switching brands repaints all of these at once."
                />
              </Flex>
            </Card>
          </Section>

          <Section
            eyebrow="Action"
            title="Four button variants, four token paths"
          >
            <Card>
              <Flex vertical={false} gap={8} wrap="wrap">
                <PrimaryButton text="Primary" />
                <SecondaryButton text="Secondary" />
                <TertiaryButton text="Tertiary" />
                <QuaternaryButton text="Quaternary" />
              </Flex>
            </Card>
          </Section>

          <Section eyebrow="Display" title="List rows + copyable values">
            <Card style={{ padding: 0 }}>
              <TouchCell
                activeClass="cell-active"
                label="Account"
                desc="Profile, name, email"
              />
              <TouchCell
                activeClass="cell-active"
                label="Payments"
                desc="Cards, wallets, billing history"
              />
              <TouchCell
                activeClass="cell-active"
                label="Notifications"
                desc="Push, email and SMS preferences"
              />
            </Card>

            <Card>
              <Flex vertical gap={12}>
                <Body1 weight="semibold">Inline copyable</Body1>
                <Flex vertical={false} gap={12} align="center">
                  <Body2>Booking ID</Body2>
                  <Copyable text="BKG-7F3A-92EE-114B">
                    <span className="mono">BKG-7F3A-92EE-114B</span>
                  </Copyable>
                </Flex>
              </Flex>
            </Card>
          </Section>

          <Section eyebrow="Typography" title="Stacked heading + body styles">
            <Card>
              <Flex vertical gap={6}>
                <LargeTitle>LargeTitle</LargeTitle>
                <Title2>Title2</Title2>
                <Title3>Title3</Title3>
                <Body1>Body1 — the workhorse paragraph style.</Body1>
                <Body2 color="text-3">
                  Body2 — secondary description, slightly muted.
                </Body2>
                <Footnote2 color="text-3">
                  Footnote2 — captions, metadata, helper text.
                </Footnote2>
              </Flex>
            </Card>
          </Section>
        </main>
      </div>

      <style>{`
        .page-shell {
          min-height: 100vh;
          background: var(--fill-1);
          color: var(--text-5);
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          max-width: 1280px;
          margin: 0 auto;
          padding: 32px 24px;
        }
        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: 360px 1fr;
            align-items: start;
            gap: 40px;
          }
          .brand-rail { position: sticky; top: 32px; }
        }
        .showcase { display: flex; flex-direction: column; gap: 28px; }
        .swatch {
          width: 32px; height: 32px;
          border-radius: 8px;
          border: 1px solid var(--line-1);
          flex-shrink: 0;
        }
        .codeblock {
          margin: 0; padding: 12px 14px;
          background: var(--fill-2);
          border-radius: 8px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12px; line-height: 1.55;
          color: var(--text-5);
          white-space: pre-wrap;
          overflow-x: auto;
        }
        .mono {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12px;
          color: var(--text-5);
        }
        .muted { color: var(--text-3); }
        .inline-link {
          color: var(--primary-6);
          font-size: 13px; font-weight: 500;
          cursor: pointer; user-select: none;
        }
        .inline-link:hover { color: var(--primary-7); }
        .cell-active { background: var(--fill-2); }
        code {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.85em;
          padding: 1px 4px;
          border-radius: 4px;
          background: var(--fill-2);
          color: var(--text-5);
        }
      `}</style>
    </div>
  )
}

const Section = ({
  eyebrow,
  title,
  blurb,
  children,
}: {
  eyebrow: string
  title: string
  blurb?: string
  children: ReactNode
}) => (
  <section>
    <Flex vertical gap={6} style={{ marginBottom: 14 }}>
      <Footnote2
        color="text-3"
        style={{ textTransform: "uppercase", letterSpacing: 0.6 }}
      >
        {eyebrow}
      </Footnote2>
      <Title3>{title}</Title3>
      {blurb && <Body2 color="text-3">{blurb}</Body2>}
    </Flex>
    {children}
  </section>
)
