import { useLayoutEffect, useState } from "react";

import { Section, Subhead } from "./Section";

// Renders a swatch grid for the kit's color tokens. The values are
// pulled at runtime via getComputedStyle so the swatches stay live
// whenever the brand toolbar swaps in a new stylesheet.
//
// The token list mirrors `themes/README.md`'s "color tokens" table.
// Anything missing from the active theme renders as transparent /
// "(unset)" so it's obvious when a partner brand left a slot empty.

const PALETTES: Array<{ label: string; tokens: string[] }> = [
  {
    label: "Primary",
    tokens: [
      "--primary-1",
      "--primary-2",
      "--primary-3",
      "--primary-6",
      "--primary-7",
    ],
  },
  {
    label: "Success",
    tokens: [
      "--success-1",
      "--success-2",
      "--success-3",
      "--success-6",
      "--success-7",
    ],
  },
  {
    label: "Danger",
    tokens: [
      "--danger-1",
      "--danger-2",
      "--danger-3",
      "--danger-6",
      "--danger-7",
    ],
  },
  {
    label: "Warning",
    tokens: [
      "--warning-1",
      "--warning-2",
      "--warning-3",
      "--warning-6",
      "--warning-7",
      "--warning-8",
    ],
  },
  {
    label: "Info",
    tokens: ["--info-1", "--info-2"],
  },
  {
    label: "Text",
    tokens: ["--text-1", "--text-2", "--text-3", "--text-4", "--text-5"],
  },
  {
    label: "Fill",
    tokens: [
      "--fill-1",
      "--fill-2",
      "--fill-3",
      "--fill-4",
      "--fill-white",
      "--line-1",
    ],
  },
  {
    label: "Brand semantics",
    tokens: [
      "--primary-color",
      "--lighter-primary-color",
      "--disabled-color",
      "--line-color",
    ],
  },
];

export function ColorTokensSection({
  brandTick,
}: {
  // Pass-through `brandTick` makes the section re-resolve every
  // token whenever the active brand or dark mode flips. We don't
  // actually need the brand string itself, just any value that
  // changes when the active stylesheet changes.
  brandTick: string;
}) {
  return (
    <Section
      title="Color tokens"
      description="Every CSS custom property the kit reads, resolved against the active brand. Use this to spot a brand that left a token unset (transparent swatch) or that ships an unreadable text-on-primary contrast."
    >
      {PALETTES.map((palette) => (
        <div
          key={palette.label}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <Subhead label={palette.label} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: 8,
            }}
          >
            {palette.tokens.map((token) => (
              <Swatch key={token} token={token} brandTick={brandTick} />
            ))}
          </div>
        </div>
      ))}
    </Section>
  );
}

function Swatch({ token, brandTick }: { token: string; brandTick: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        border: "1px solid var(--line-1)",
        borderRadius: 8,
        overflow: "hidden",
        background: "var(--fill-white)",
      }}
    >
      <div
        style={{
          height: 48,
          background: `var(${token})`,
          borderBottom: "1px solid var(--line-1)",
        }}
      />
      <div style={{ padding: "6px 8px", fontFamily: "monospace", fontSize: 11 }}>
        <div style={{ color: "var(--text-5)" }}>{token}</div>
        <ResolvedValue token={token} brandTick={brandTick} />
      </div>
    </div>
  );
}

function ResolvedValue({
  token,
  brandTick,
}: {
  token: string;
  brandTick: string;
}) {
  const [value, setValue] = useState<string>("…");

  // useLayoutEffect runs synchronously after DOM mutations but
  // before the browser paints. The brand toolbar mutates a <style>
  // tag's textContent inside its own useEffect (which runs
  // *before* this effect on the same render cycle thanks to the
  // brandTick prop), so by the time we read getComputedStyle the
  // new brand's tokens are already cascading.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.getElementById("root") ?? document.body;
    const v = getComputedStyle(root).getPropertyValue(token).trim();
    setValue(v || "(unset)");
  }, [token, brandTick]);

  return <div style={{ color: "var(--text-3)" }}>{value}</div>;
}
