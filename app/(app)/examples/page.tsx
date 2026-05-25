import { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Badge } from "@/registry/ui/ui/badge"
import { Button } from "@/registry/ui/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/ui/ui/card"

const title = "Examples"
const description =
  "End-to-end reference apps built with @appboxo/ui-kit, mirroring real Boxo partner mini-app shapes."

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
    slug: "basic-app",
    name: "Basic App",
    description:
      "70-line hello world. The minimum @appboxo/ui-kit consumer that still looks like a real screen.",
    tags: ["Vite", "Starter"],
    source: "https://github.com/Appboxo/ui-kit/tree/main/examples/basic-app",
    run: "cd examples/basic-app && pnpm install && pnpm dev",
  },
  {
    slug: "kitchen-sink",
    name: "Kitchen Sink",
    description:
      "Single-page kit gallery: every component on one page with a brand toolbar (37 themes) and light/dark toggle.",
    tags: ["Vite", "All components", "Brand toolbar"],
    source: "https://github.com/Appboxo/ui-kit/tree/main/examples/kitchen-sink",
    run: "cd examples/kitchen-sink && pnpm install && pnpm dev",
  },
  {
    slug: "freedom-theme",
    name: "Freedom Theme",
    description:
      "Paired example A. Same App.tsx as custom-theme but rendered with the bundled themes/freedom/theme.css.",
    tags: ["Vite", "Theming"],
    source:
      "https://github.com/Appboxo/ui-kit/tree/main/examples/freedom-theme",
    run: "cd examples/freedom-theme && pnpm install && pnpm dev",
  },
  {
    slug: "custom-theme",
    name: "Custom Theme",
    description:
      "Paired example B. Same App.tsx but using themes/default + a 30-line my-brand.css overlay (fictional Citrus brand). `diff -r` against freedom-theme shows exactly what BYO theming costs.",
    tags: ["Vite", "Theming", "BYO brand"],
    source: "https://github.com/Appboxo/ui-kit/tree/main/examples/custom-theme",
    run: "cd examples/custom-theme && pnpm install && pnpm dev",
  },
  {
    slug: "pass-freedom",
    name: "Pass Freedom",
    description:
      "Full 11-page mini-app forked from production pass-freedom. All backend / host calls stubbed. Soak test for the kit.",
    tags: ["Next.js", "Full app", "Mocked backend"],
    source: "https://github.com/Appboxo/ui-kit/tree/main/examples/pass-freedom",
    run: "cd examples/pass-freedom && pnpm install && pnpm dev",
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
