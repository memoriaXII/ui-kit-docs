import { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Badge } from "@/registry/elevenlabs-ui/ui/badge"
import { Button } from "@/registry/elevenlabs-ui/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/elevenlabs-ui/ui/card"

const title = "Examples"
const description =
  "End-to-end reference apps built with @freedom/ui-kit, mirroring real Boxo partner mini-app shapes."

export const metadata: Metadata = {
  title,
  description,
}

type Example = {
  slug: string
  name: string
  description: string
  tags: string[]
  /** Path inside the freedom-ui-kit repo. */
  source: string
  /** Devserver command to run it locally. */
  run: string
}

const examples: Example[] = [
  {
    slug: "pass-freedom",
    name: "Pass Freedom",
    description:
      "Full-fledged loyalty / pass mini-app. Hits stubbed backends, demonstrates auth, lists, transactions and theme switching.",
    tags: ["Next.js", "Full app", "Stubbed backend"],
    source:
      "https://github.com/Appboxo/freedom-ui-kit/tree/main/examples/pass-freedom",
    run: "pnpm --filter pass-freedom dev",
  },
  {
    slug: "kitchen-sink",
    name: "Kitchen Sink",
    description:
      "Every component rendered side by side. Useful for visual regressions and seeing the full API surface at a glance.",
    tags: ["Vite", "All components"],
    source:
      "https://github.com/Appboxo/freedom-ui-kit/tree/main/examples/kitchen-sink",
    run: "pnpm --filter kitchen-sink dev",
  },
  {
    slug: "basic-app",
    name: "Basic App",
    description:
      "Minimal starter that wires up FreedomThemeProvider, the host shell and a few primitives. Best entry point for a new mini-app.",
    tags: ["Vite", "Starter"],
    source:
      "https://github.com/Appboxo/freedom-ui-kit/tree/main/examples/basic-app",
    run: "pnpm --filter basic-app dev",
  },
  {
    slug: "freedom-theme",
    name: "Freedom Theme",
    description:
      "Demonstrates the default Freedom theme across all primitives. Use as a reference when designing new themes.",
    tags: ["Vite", "Theming"],
    source:
      "https://github.com/Appboxo/freedom-ui-kit/tree/main/examples/freedom-theme",
    run: "pnpm --filter freedom-theme dev",
  },
  {
    slug: "custom-theme",
    name: "Custom Theme",
    description:
      "Shows how partners override theme tokens to match their own brand without forking the kit.",
    tags: ["Vite", "Theming", "Partner"],
    source:
      "https://github.com/Appboxo/freedom-ui-kit/tree/main/examples/custom-theme",
    run: "pnpm --filter custom-theme dev",
  },
]

export default function ExamplesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
      </PageHeader>
      <div className="container-wrapper section-soft flex-1 pb-12">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {examples.map((example) => (
              <ExampleCard key={example.slug} example={example} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ExampleCard({ example }: { example: Example }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg">{example.name}</CardTitle>
          <Button asChild size="icon" variant="ghost" className="size-7">
            <Link href={example.source} target="_blank" rel="noreferrer">
              <ArrowUpRight className="size-4" />
              <span className="sr-only">View source</span>
            </Link>
          </Button>
        </div>
        <CardDescription>{example.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1.5">
          {example.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex-col items-stretch gap-2">
        <code className="bg-muted text-muted-foreground rounded-md px-2 py-1.5 font-mono text-xs">
          {example.run}
        </code>
        <Button asChild variant="outline" size="sm">
          <Link href={example.source} target="_blank" rel="noreferrer">
            View source
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
