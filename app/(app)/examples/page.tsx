import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { EXAMPLES, exampleSourceUrl, type Example } from "@/lib/examples"
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
  "End-to-end reference apps built with @appboxo/ui-kit. Each example ships the full source on GitHub; click into one for a file tree, code viewer and live preview."

export const metadata: Metadata = {
  title,
  description,
}

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
            {EXAMPLES.map((example) => (
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
            <Link
              href={exampleSourceUrl(example.slug)}
              target="_blank"
              rel="noreferrer"
            >
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
      <CardFooter className="mt-auto">
        <Button asChild className="w-full" variant="outline">
          <Link href={`/examples/${example.slug}`}>
            Browse
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
