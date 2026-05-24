import Image from "next/image"

import { BRANDS, type Swatch } from "@/lib/brands"
import { getBrandSwatches } from "@/lib/brands.server"
import { BrandSwatches } from "@/components/brand-swatches"
import { ComponentPreviewTabs } from "@/components/component-preview-tabs"
import { ComponentSource } from "@/components/component-source"
import { Index } from "@/registry/__index__"

const swatchesByBrand: Record<string, Swatch[]> = Object.fromEntries(
  BRANDS.map((b) => [b.slug, getBrandSwatches(b.slug)])
)

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
  const Component = Index[name]?.component

  if (!Component) {
    return (
      <p className="text-muted-foreground text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
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

  return (
    <div className="flex flex-col gap-2">
      <BrandSwatches swatchesByBrand={swatchesByBrand} />
      <ComponentPreviewTabs
        className={className}
        align={align}
        hideCode={hideCode}
        component={<Component />}
        source={<ComponentSource name={name} collapsible={false} />}
        marginOff={marginOff}
        {...props}
      />
    </div>
  )
}
