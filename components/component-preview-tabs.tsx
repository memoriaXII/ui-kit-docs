"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useBrand } from "@/components/brand-context"
import { Tabs, TabsList, TabsTrigger } from "@/registry/ui/ui/tabs"

export function ComponentPreviewTabs({
  className,
  align = "center",
  hideCode = false,
  component,
  source,
  marginOff = false,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "center" | "start" | "end"
  hideCode?: boolean
  component: React.ReactNode
  source: React.ReactNode
  marginOff?: boolean
}) {
  const [tab, setTab] = React.useState("preview")
  const { brand } = useBrand()
  // Iframe previews don't have a serialisable React source — they live in
  // the sibling Vite app. Hide the Code tab in that case.
  const showCode = !hideCode && source != null

  return (
    <div
      className={cn(
        "group bg-background relative mt-4 mb-12 flex flex-col gap-2",
        className
      )}
      data-freedom-brand={brand}
      {...props}
    >
      <Tabs
        className="bg-background relative mr-auto w-full"
        value={tab}
        onValueChange={setTab}
      >
        <div className="flex items-center justify-between">
          {showCode && (
            <TabsList className="h-auto justify-start gap-6 rounded-none border-0 bg-transparent p-0 px-2 md:px-0">
              <TabsTrigger
                value="preview"
                className="text-muted-foreground data-[state=active]:text-foreground hover:text-foreground/80 data-[state=active]:border-foreground -mb-px h-9 rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-2 text-sm font-medium transition-colors data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent dark:data-[state=active]:border-b-foreground"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="text-muted-foreground data-[state=active]:text-foreground hover:text-foreground/80 data-[state=active]:border-foreground -mb-px h-9 rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-2 text-sm font-medium transition-colors data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent dark:data-[state=active]:border-b-foreground"
              >
                Code
              </TabsTrigger>
            </TabsList>
          )}
        </div>
      </Tabs>
      <div
        data-tab={tab}
        className="data-[tab=code]:border-code bg-background relative overflow-hidden rounded-lg border md:-mx-1"
      >
        <div
          data-slot="preview"
          data-active={tab === "preview"}
          className="invisible data-[active=true]:visible"
        >
          <div
            data-align={align}
            className={cn(
              "preview bg-background flex h-[450px] w-full justify-center data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start",
              marginOff ? "p-0" : "p-10"
            )}
          >
            {component}
          </div>
        </div>
        <div
          data-slot="code"
          data-active={tab === "code"}
          className="absolute inset-0 hidden overflow-hidden data-[active=true]:block **:[figure]:!m-0 **:[pre]:h-[450px]"
        >
          {source}
        </div>
      </div>
    </div>
  )
}
