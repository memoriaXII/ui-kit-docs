// Tiny visual helper used by Flex variant previews so each demo shows
// the actual flex behaviour (positioning of N pills) without bringing
// in extra kit components.

import type { ReactNode } from "react"

export const Pill = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      padding: "6px 14px",
      borderRadius: 999,
      background: "var(--primary-2)",
      color: "var(--primary-7)",
      fontSize: 12,
      fontWeight: 500,
    }}
  >
    {children}
  </div>
)
