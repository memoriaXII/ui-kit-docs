import {
  DownIcon,
  ChevronLeftIcon,
  InfoCircleIcon,
} from "@appboxo/ui-kit";

import { Section, Subhead } from "./Section";

const ICONS: Array<{
  name: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}> = [
  { name: "DownIcon", Icon: DownIcon },
  { name: "ChevronLeftIcon", Icon: ChevronLeftIcon },
  { name: "InfoCircleIcon", Icon: InfoCircleIcon },
];

const SIZES: Array<{ label: string; size: number }> = [
  { label: "16", size: 16 },
  { label: "24", size: 24 },
  { label: "32", size: 32 },
];

export function IconsSection() {
  return (
    <Section
      title="Icons"
      description="The handful of inline SVGs the kit re-exports. Use color-via-currentColor or `color=` so they always pick up the active text token."
    >
      {ICONS.map(({ name, Icon }) => (
        <div
          key={name}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <Subhead label={name} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              padding: 12,
              border: "1px solid var(--line-1)",
              borderRadius: 6,
            }}
          >
            {SIZES.map(({ label, size }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Icon width={size} height={size} color="var(--text-5)" />
                <span style={{ color: "var(--text-3)", fontSize: 11 }}>
                  {label}px
                </span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Icon width={24} height={24} color="var(--primary-6)" />
              <span style={{ color: "var(--text-3)", fontSize: 11 }}>
                primary
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Icon width={24} height={24} color="var(--danger-6)" />
              <span style={{ color: "var(--text-3)", fontSize: 11 }}>
                danger
              </span>
            </div>
          </div>
        </div>
      ))}
    </Section>
  );
}
