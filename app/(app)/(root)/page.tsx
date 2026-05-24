import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Button } from "@/registry/elevenlabs-ui/ui/button"

const title = "Appboxo UI Kit"
const description =
  "A themeable, host-agnostic React UI kit for Boxo and partner mini-apps. Built on Arco Design Mobile, ships 37 brand themes, works in Next.js / Vite / CRA."

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
            <Image
              src="/logo-light.svg"
              alt="Appboxo UI Kit"
              width={274}
              height={63}
              className="block h-12 w-auto dark:hidden sm:h-16"
              priority
            />
            <Image
              src="/logo-dark.svg"
              alt="Appboxo UI Kit"
              width={274}
              height={63}
              className="hidden h-12 w-auto dark:block sm:h-16"
              priority
            />
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
