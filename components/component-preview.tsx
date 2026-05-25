import fs from "node:fs"
import path from "node:path"

import Image from "next/image"

import { resolveIframeSlug } from "@/lib/iframe-previews"
import { ComponentPreviewTabs } from "@/components/component-preview-tabs"
import { ComponentSource } from "@/components/component-source"
import { IframePreview } from "@/components/iframe-preview"
import { Index } from "@/registry/__index__"

/**
 * Resolve which file to show in the Code tab.
 *
 * - iframe-mode previews: show the real `preview/src/previews/<slug>.tsx`
 *   that drives the iframe — actual @appboxo/ui-kit code.
 * - placeholder previews: show the shadcn-based demo file under
 *   `registry/examples/<name>.tsx`.
 *
 * Returns a path relative to the project root, or null if no file is found.
 * `<ComponentSource src={...} />` reads files relative to `process.cwd()`.
 */
function resolveCodePath(name: string, iframeSlug: string | null) {
  const candidates: string[] = []
  if (iframeSlug) {
    candidates.push(`preview/src/previews/${iframeSlug}.tsx`)
  }
  candidates.push(`registry/examples/${name}.tsx`)
  return candidates.find((p) => fs.existsSync(path.join(process.cwd(), p)))
}

export function ComponentPreview({
  name,
  type,
  className,
  align = "center",
  hideCode = false,
  marginOff = false,
  ...props
}: React.ComponentProps<"div"> & {
  name: string
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
  type?: "block" | "component" | "example"
  marginOff?: boolean
}) {
  const iframeSlug = resolveIframeSlug(name)
  const Component = Index[name]?.component

  if (!iframeSlug && !Component) {
    return (
      <p className="text-muted-foreground text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry or iframe-previews.
      </p>
    )
  }

  if (type === "block") {
    return (
      <div className="relative aspect-[4/2.5] w-full overflow-hidden rounded-md border md:-mx-1">
        <Image
          src={`/r/${name}-light.png`}
          alt={name}
          width={1440}
          height={900}
          className="bg-background absolute top-0 left-0 z-20 w-[970px] max-w-none sm:w-[1280px] md:hidden dark:hidden md:dark:hidden"
        />
        <Image
          src={`/r/${name}-dark.png`}
          alt={name}
          width={1440}
          height={900}
          className="bg-background absolute top-0 left-0 z-20 hidden w-[970px] max-w-none sm:w-[1280px] md:hidden dark:block md:dark:hidden"
        />
        <div className="bg-background absolute inset-0 hidden w-[1600px] md:block">
          <iframe src={`/view/${name}`} className="size-full" />
        </div>
      </div>
    )
  }

  const previewBody = iframeSlug ? (
    <IframePreview slug={iframeSlug} />
  ) : Component ? (
    <Component />
  ) : null

  const codePath = resolveCodePath(name, iframeSlug)

  return (
    <ComponentPreviewTabs
      className={className}
      align={align}
      hideCode={hideCode}
      component={previewBody}
      source={
        codePath ? (
          <ComponentSource src={codePath} collapsible={false} />
        ) : null
      }
      marginOff={marginOff}
      {...props}
    />
  )
}
