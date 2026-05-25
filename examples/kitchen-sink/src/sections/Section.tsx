import type { CSSProperties, PropsWithChildren } from "react";

interface SectionProps {
  title: string;
  description?: string;
  bodyStyle?: CSSProperties;
}

// Tiny visual wrapper used by every kitchen-sink section. Pulled out
// so the headings, padding and section dividers stay consistent
// without every section file having to duplicate the same chrome.
export function Section({
  title,
  description,
  children,
  bodyStyle,
}: PropsWithChildren<SectionProps>) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <header style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <h2
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 600,
            color: "var(--text-5)",
            borderBottom: "1px solid var(--line-1)",
            paddingBottom: 8,
          }}
        >
          {title}
        </h2>
        {description && (
          <p style={{ margin: 0, color: "var(--text-4)", fontSize: 13 }}>
            {description}
          </p>
        )}
      </header>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          ...bodyStyle,
        }}
      >
        {children}
      </div>
    </section>
  );
}

interface SubheadProps {
  label: string;
}

export function Subhead({ label }: SubheadProps) {
  return (
    <h3
      style={{
        margin: 0,
        fontSize: 13,
        fontWeight: 600,
        color: "var(--text-3)",
        textTransform: "uppercase",
        letterSpacing: 0.4,
      }}
    >
      {label}
    </h3>
  );
}

interface PhoneFrameProps {
  width?: number | string;
  background?: string;
}

// Renders a fixed-width "phone column" so kit components, which
// were designed for ~750px design canvases at 50px base font (so
// 1rem == 50px → 7.5rem ≈ 375px), don't end up stretched across the
// full desktop viewport.
export function PhoneFrame({
  children,
  width = "7.5rem",
  background = "var(--fill-white)",
}: PropsWithChildren<PhoneFrameProps>) {
  return (
    <div
      style={{
        width,
        background,
        border: "1px solid var(--line-1)",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}
