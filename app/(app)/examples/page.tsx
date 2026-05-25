import { Metadata } from "next"

import { loadAllExamples } from "@/lib/examples-data"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { ExamplesGallery } from "@/components/examples-gallery"

const title = "Examples"
const description =
  "End-to-end reference apps built with @appboxo/ui-kit. Switch tabs to filter by intent, scroll for the live preview, file tree and source of each."

export const metadata: Metadata = {
  title,
  description,
}

export const dynamic = "force-static"

export default async function ExamplesPage() {
  const entries = await loadAllExamples()

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
      </PageHeader>
      <div className="container-wrapper section-soft flex-1 pb-16">
        <div className="container">
          <ExamplesGallery entries={entries} />
        </div>
      </div>
    </div>
  )
}
