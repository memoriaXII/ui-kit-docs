import type { ReactNode } from "react"

import { Body1, Body2, Flex, Footnote2 } from "@appboxo/ui-kit"

/**
 * Section wrapper used by every preview to render multiple variants under
 * clear labels. Keeps each preview file consistent + scannable.
 */
export function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <Flex
      vertical
      gap={28}
      style={{
        padding: 20,
        background: "var(--fill-1)",
        color: "var(--text-5)",
        minHeight: "100vh",
      }}
    >
      {children}
    </Flex>
  )
}

export function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <Flex vertical gap={10}>
      <Flex vertical gap={2}>
        <Footnote2
          color="text-3"
          style={{ textTransform: "uppercase", letterSpacing: 0.6 }}
        >
          {title}
        </Footnote2>
        {description && <Body2 color="text-3">{description}</Body2>}
      </Flex>
      <Flex vertical gap={12}>
        {children}
      </Flex>
    </Flex>
  )
}

export function Row({
  label,
  children,
}: {
  label?: string
  children: ReactNode
}) {
  return (
    <Flex vertical gap={6}>
      {label && <Body1 weight="semibold">{label}</Body1>}
      {children}
    </Flex>
  )
}
