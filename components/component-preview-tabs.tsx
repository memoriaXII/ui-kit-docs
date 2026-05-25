"use client"

import * as React from "react"
import { Monitor, Smartphone, Tablet } from "lucide-react"

import { cn } from "@/lib/utils"
import { useBrand } from "@/components/brand-context"
import { Tabs, TabsList, TabsTrigger } from "@/registry/ui/ui/tabs"

type Device = "desktop" | "tablet" | "mobile"

const DEVICE_WIDTHS: Record<Device, number | null> = {
  desktop: null,
  tablet: 768,
  mobile: 375,
}

export function ComponentPreviewTabs({
  className,
  align = "center",
  hideCode = false,
  component,
  source,
  marginOff = false,
  iframe = false,
  defaultDevice = "desktop",
  ...props
}: React.ComponentProps<"div"> & {
  align?: "center" | "start" | "end"
  hideCode?: boolean
  component: React.ReactNode
  source: React.ReactNode
  marginOff?: boolean
  /** When true, the preview component is an iframe and a device size
   * switcher is shown so users can preview different viewports. */
  iframe?: boolean
  /** Initial device when `iframe` is true. */
  defaultDevice?: Device
}) {
  const [tab, setTab] = React.useState("preview")
  const [device, setDevice] = React.useState<Device>(defaultDevice)
  const { brand } = useBrand()
  const showCode = !hideCode && source != null

  const deviceWidth = DEVICE_WIDTHS[device]
  const useDeviceFrame = iframe && device !== "desktop"

  return (
    <div
      className={cn(
        "group bg-background relative mt-4 mb-12 flex flex-col",
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
        <div className="flex items-center justify-between gap-2">
          {showCode ? (
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
          ) : (
            <div />
          )}
          {iframe && tab === "preview" && (
            <div className="flex items-center gap-1 rounded-md border p-0.5">
              <DeviceButton
                active={device === "desktop"}
                onClick={() => setDevice("desktop")}
                label="Desktop"
              >
                <Monitor className="size-4" />
              </DeviceButton>
              <DeviceButton
                active={device === "tablet"}
                onClick={() => setDevice("tablet")}
                label="Tablet"
              >
                <Tablet className="size-4" />
              </DeviceButton>
              <DeviceButton
                active={device === "mobile"}
                onClick={() => setDevice("mobile")}
                label="Mobile"
              >
                <Smartphone className="size-4" />
              </DeviceButton>
            </div>
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
          {useDeviceFrame ? (
            <div className="bg-muted/40 flex h-[600px] items-stretch justify-center overflow-auto p-4">
              <div
                className="bg-background h-full overflow-hidden rounded-md border shadow-sm"
                style={{
                  width: deviceWidth ?? "100%",
                  maxWidth: "100%",
                }}
              >
                {component}
              </div>
            </div>
          ) : (
            <div
              data-align={align}
              className={cn(
                "preview bg-background flex h-[450px] w-full justify-center data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start",
                marginOff ? "p-0" : "p-10"
              )}
            >
              {component}
            </div>
          )}
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

function DeviceButton({
  active,
  onClick,
  children,
  label,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "rounded-sm px-2 py-1 transition-colors",
        active
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:bg-muted/60"
      )}
    >
      {children}
    </button>
  )
}
