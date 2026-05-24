import { Metadata } from "next"
import Link from "next/link"

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Button } from "@/registry/elevenlabs-ui/ui/button"

const title = "Freedom UI Kit"
const description =
  "A themeable, host-agnostic React UI kit for Boxo and partner mini-apps."

export const dynamic = "force-static"
export const revalidate = false

export const metadata: Metadata = {
  title,
  description,
}

export default function IndexPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, transparent 25%, hsl(var(--background) / 0.5) 50%, hsl(var(--background) / 0.8) 70%, hsl(var(--background) / 0.95) 85%, hsl(var(--background)) 95%)",
          }}
        />
        <PageHeader className="relative z-10">
          <PageHeaderHeading className="max-w-4xl">
            <span className="flex items-baseline gap-2 sm:gap-3">
              <span className="leading-[0.95] font-bold tracking-[-0.03em]">
                Freedom
              </span>
              <span className="font-normal tracking-[-0.02em] opacity-90">
                UI Kit
              </span>
            </span>
          </PageHeaderHeading>
          <PageHeaderDescription>{description}</PageHeaderDescription>
          <PageActions>
            <Button asChild size="sm">
              <Link href="/docs">Get Started</Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link href="/docs/components">View Components</Link>
            </Button>
          </PageActions>
        </PageHeader>
      </div>
    </div>
  )
}
