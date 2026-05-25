import { ReactNode, useLayoutEffect, useState } from "react";
import {
  Body1,
  Body2,
  Card,
  Copyable,
  Flex,
  Footnote1,
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
  Toast,
  TouchCell,
} from "@appboxo/ui-kit";

// This file is intentionally identical between `examples/freedom-theme`
// and `examples/custom-theme`. The only differences live in `main.tsx`
// (which stylesheet you import) and the props passed to <App />. Running
//
//   diff -r examples/freedom-theme examples/custom-theme
//
// should only show those two divergence points. Add a new feature here?
// Copy this file across both demos byte-for-byte.

export interface AppProps {
  brandName: string;
  brandBlurb: string;
  // Copyable code snippet shown in the left rail. Different brands use
  // different stylesheet stacks (one vs two imports), so the snippet is
  // injected from `main.tsx` rather than hard-coded here.
  installSnippet: string;
  installCaption: string;
}

// Tokens we surface as live swatches in the left rail. The values are
// pulled from `getComputedStyle(#root)`, so each swatch shows the *real*
// resolved value for the active brand + light/dark combo.
const SWATCH_TOKENS: Array<{ name: string; label: string }> = [
  { name: "--primary-6", label: "Primary" },
  { name: "--primary-1", label: "Primary tint" },
  { name: "--success-6", label: "Success" },
  { name: "--warning-6", label: "Warning" },
  { name: "--danger-6", label: "Danger" },
  { name: "--info-6", label: "Info" },
];

const useTokenSwatches = (dark: boolean) => {
  const [values, setValues] = useState<Record<string, string>>({});
  // useLayoutEffect (not useEffect): the `arco-theme-dark` class is
  // flipped synchronously in `toggleDark`, so we want to re-read
  // computed styles before the browser paints to avoid one-frame stale
  // swatches when the user toggles dark mode.
  useLayoutEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;
    const computed = getComputedStyle(root);
    setValues(
      Object.fromEntries(
        SWATCH_TOKENS.map((t) => [
          t.name,
          computed.getPropertyValue(t.name).trim() || "—",
        ]),
      ),
    );
  }, [dark]);
  return values;
};

export const App = ({
  brandName,
  brandBlurb,
  installSnippet,
  installCaption,
}: AppProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hasError, setHasError] = useState(false);
  const [dark, setDark] = useState(false);
  const swatches = useTokenSwatches(dark);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    const root = document.getElementById("root");
    if (next) root?.classList.add("arco-theme-dark");
    else root?.classList.remove("arco-theme-dark");
  };

  return (
    <div className="page-shell">
      <div className="grid">
        <aside className="brand-rail">
          <Flex vertical gap={20}>
            <Flex vertical gap={6}>
              <Footnote2 color="text-3">@appboxo/ui-kit</Footnote2>
              <LargeTitle>{brandName}</LargeTitle>
              <Body2 color="text-3">{brandBlurb}</Body2>
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
                    <Flex key={t.name} gap={12} align="center">
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
                <Footnote2 color="text-3">{installCaption}</Footnote2>
                <Copyable text={installSnippet}>
                  <pre className="codeblock">{installSnippet}</pre>
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
            blurb="Focus ring, error state, and the inline link all flow from the active brand's CSS variables. No prop renames per brand."
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
                  <Footnote2 color="text-3">
                    Reads <code>--primary-*</code> on focus and selection.
                  </Footnote2>
                </Flex>

                <Flex vertical gap={6}>
                  <Body1 weight="semibold">Phone</Body1>
                  <Input
                    value={phone}
                    hasError={hasError}
                    onChange={(_e, val) => setPhone(val)}
                    placeholder="Toggle error state below"
                  />
                  <Flex justify="space-between" align="center">
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
            blurb="Each variant pulls from its own slice of the token contract -- Primary lives on --primary-6, Tertiary on the gradient stack, and so on. Click any to confirm Toast inherits the same palette."
          >
            <Card>
              <Flex vertical gap={12}>
                <Flex gap={8} wrap="wrap">
                  <PrimaryButton
                    text="Primary"
                    onClick={() => Toast.info("Primary tapped")}
                  />
                  <SecondaryButton
                    text="Secondary"
                    onClick={() => Toast.info("Secondary tapped")}
                  />
                  <TertiaryButton
                    text="Tertiary"
                    onClick={() => Toast.info("Tertiary tapped")}
                  />
                  <QuaternaryButton
                    text="Quaternary"
                    onClick={() => Toast.info("Quaternary tapped")}
                  />
                </Flex>
                <Footnote2 color="text-3">
                  Buttons use <code>--primary-*</code> and Arco's
                  <code>--boxo-button-*</code> overrides side by side.
                </Footnote2>
              </Flex>
            </Card>
          </Section>

          <Section
            eyebrow="Display"
            title="List rows + copyable values"
            blurb="The active-state highlight on rows is a brand-level decision (--fill-2), not a per-row prop. Same for the copy icon's accent."
          >
            <Card style={{ padding: 0 }}>
              <TouchCell
                activeClass="cell-active"
                label="Account"
                desc="Profile, name, email"
                onClick={() => Toast.info("Opened account")}
              />
              <TouchCell
                activeClass="cell-active"
                label="Payments"
                desc="Cards, wallets, billing history"
                onClick={() => Toast.info("Opened payments")}
              />
              <TouchCell
                activeClass="cell-active"
                label="Notifications"
                desc="Push, email and SMS preferences"
                onClick={() => Toast.info("Opened notifications")}
              />
            </Card>

            <Card>
              <Flex vertical gap={12}>
                <Body1 weight="semibold">Inline copyable</Body1>
                <Flex gap={12} align="center">
                  <Body2>Booking ID</Body2>
                  <Copyable text="BKG-7F3A-92EE-114B">
                    <span className="mono">BKG-7F3A-92EE-114B</span>
                  </Copyable>
                </Flex>
                <Footnote2 color="text-3">
                  The copy icon picks up <code>--primary-6</code>; the popover
                  uses Arco's defaults.
                </Footnote2>
              </Flex>
            </Card>
          </Section>

          <Section
            eyebrow="Typography"
            title="Stacked heading + body styles"
            blurb="The font family is set once at the host level; the kit only controls weights, line-heights, and the color tokens each style maps to."
          >
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

      {/*
        Demo-only stylesheet. Kept inline so each example folder stays
        copy-pasteable as a single React app -- a partner team can lift
        `App.tsx` + `main.tsx` into their codebase without chasing a CSS
        module. The classes referenced below (.swatch / .codeblock /
        etc.) intentionally live nowhere else.
      */}
      <style>{`
        .page-shell {
          min-height: 100vh;
          background: var(--fill-1);
          /*
           * The kit's token vocabulary follows iOS: --text-5 is the
           * primary text color (dark in light mode, near-white in
           * dark mode). --text-1 is the inverse, used for text on
           * dark surfaces -- it would render white-on-white here.
           */
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
          .brand-rail {
            position: sticky;
            top: 32px;
          }
        }
        .showcase {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .swatch {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid var(--line-1);
          flex-shrink: 0;
        }
        .codeblock {
          margin: 0;
          padding: 12px 14px;
          background: var(--fill-2);
          border-radius: 8px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12px;
          line-height: 1.55;
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
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          user-select: none;
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
  );
};

const Section = ({
  eyebrow,
  title,
  blurb,
  children,
}: {
  eyebrow: string;
  title: string;
  blurb?: string;
  children: ReactNode;
}) => (
  <section>
    <Flex vertical gap={6} style={{ marginBottom: 14 }}>
      <Footnote2 color="text-3" style={{ textTransform: "uppercase", letterSpacing: 0.6 }}>
        {eyebrow}
      </Footnote2>
      <Title3>{title}</Title3>
      {blurb && <Body2 color="text-3">{blurb}</Body2>}
    </Flex>
    {children}
  </section>
);
