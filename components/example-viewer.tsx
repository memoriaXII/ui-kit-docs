"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  FileText,
  Monitor,
  RefreshCw,
  Smartphone,
  Tablet,
} from "lucide-react"

import { PREVIEW_ORIGIN } from "@/lib/iframe-previews"
import { cn } from "@/lib/utils"
import { useBrand } from "@/components/brand-context"
import { Button } from "@/registry/ui/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/registry/ui/ui/tabs"

type FileNode =
  | { type: "file"; name: string; path: string }
  | { type: "dir"; name: string; path: string; children: FileNode[] }

type Device = "desktop" | "tablet" | "mobile"

const DEVICE_WIDTHS: Record<Device, number | null> = {
  desktop: null, // 100%
  tablet: 768,
  mobile: 375,
}

type Props = {
  slug: string
  tree: FileNode[]
  iframe: boolean
  defaultFile: string
  /** Pre-rendered code content per file path, keyed by path. */
  files: Record<string, { language: string; highlightedCode: string }>
  sourceUrl: string
  runCommand: string
}

export function ExampleViewer({
  slug,
  tree,
  iframe,
  defaultFile,
  files,
  sourceUrl,
  runCommand,
}: Props) {
  const { brand } = useBrand()
  const { resolvedTheme } = useTheme()
  const dark = resolvedTheme === "dark"

  const [tab, setTab] = React.useState<"preview" | "code">(
    iframe ? "preview" : "code"
  )
  const [device, setDevice] = React.useState<Device>("mobile")
  const [activeFile, setActiveFile] = React.useState<string>(defaultFile)
  const [iframeKey, setIframeKey] = React.useState(0)

  const iframeRef = React.useRef<HTMLIFrameElement | null>(null)

  React.useEffect(() => {
    const win = iframeRef.current?.contentWindow
    if (!win) return
    win.postMessage(
      { type: "freedom-preview:update", brand, dark },
      PREVIEW_ORIGIN
    )
  }, [brand, dark])

  const previewSrc = `${PREVIEW_ORIGIN}/example/${encodeURIComponent(
    slug
  )}?brand=${encodeURIComponent(brand)}&dark=${dark}`

  const currentFile = files[activeFile]

  return (
    <div className="bg-card flex flex-col overflow-hidden rounded-lg border">
      {/* Top bar: tabs + device + actions */}
      <div className="flex flex-wrap items-center gap-2 border-b px-3 py-2">
        <Tabs value={tab} onValueChange={(v) => setTab(v as "preview" | "code")}>
          <TabsList className="h-8">
            <TabsTrigger value="preview" disabled={!iframe} className="px-3 py-1">
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="px-3 py-1">
              Code
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {tab === "preview" && iframe && (
          <div className="ml-2 flex items-center gap-1 rounded-md border p-0.5">
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

        <div className="ml-auto flex items-center gap-1">
          {tab === "preview" && iframe && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="size-8"
                onClick={() => setIframeKey((k) => k + 1)}
                aria-label="Reload preview"
                title="Reload"
              >
                <RefreshCw className="size-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="size-8"
                asChild
                aria-label="Open preview in new tab"
                title="Open in new tab"
              >
                <a href={previewSrc} target="_blank" rel="noreferrer">
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </>
          )}
          <Button size="sm" variant="outline" asChild>
            <Link href={sourceUrl} target="_blank" rel="noreferrer">
              View source
              <ArrowUpRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Body: preview iframe OR file tree + code */}
      {tab === "preview" && iframe ? (
        <PreviewBody
          key={iframeKey}
          src={previewSrc}
          device={device}
          iframeRef={iframeRef}
        />
      ) : (
        <CodeBody
          tree={tree}
          activeFile={activeFile}
          onSelect={setActiveFile}
          file={currentFile}
        />
      )}

      {/* Footer: run command */}
      <div className="bg-muted/40 border-t px-3 py-2.5">
        <div className="text-muted-foreground mb-1 text-[10px] uppercase tracking-wider">
          Try it in your terminal
        </div>
        <code className="bg-background block overflow-x-auto rounded px-2 py-1.5 font-mono text-xs">
          {runCommand}
        </code>
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

function PreviewBody({
  src,
  device,
  iframeRef,
}: {
  src: string
  device: Device
  iframeRef: React.RefObject<HTMLIFrameElement | null>
}) {
  const width = DEVICE_WIDTHS[device]
  return (
    <div className="bg-muted/30 flex h-[640px] items-stretch justify-center overflow-auto p-4">
      <div
        className="bg-background h-full overflow-hidden rounded-md border shadow-sm"
        style={{
          width: width ?? "100%",
          maxWidth: "100%",
        }}
      >
        <iframe
          ref={iframeRef}
          src={src}
          title="Example preview"
          className="block size-full"
          sandbox="allow-scripts allow-same-origin allow-popups"
          loading="lazy"
        />
      </div>
    </div>
  )
}

function CodeBody({
  tree,
  activeFile,
  onSelect,
  file,
}: {
  tree: FileNode[]
  activeFile: string
  onSelect: (path: string) => void
  file: { language: string; highlightedCode: string } | undefined
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)]">
      <div className="bg-muted/30 max-h-[640px] overflow-auto border-b p-2 text-sm md:border-b-0 md:border-r">
        <FileTree nodes={tree} activeFile={activeFile} onSelect={onSelect} />
      </div>
      <div className="max-h-[640px] overflow-auto">
        {file ? (
          <div
            className="text-sm [&_pre]:!m-0 [&_pre]:!rounded-none [&_pre]:border-0 [&_pre]:bg-transparent [&_pre]:p-4"
            dangerouslySetInnerHTML={{ __html: file.highlightedCode }}
          />
        ) : (
          <div className="text-muted-foreground p-6 text-sm">
            Select a file to view its source.
          </div>
        )}
      </div>
    </div>
  )
}

function FileTree({
  nodes,
  activeFile,
  onSelect,
  depth = 0,
}: {
  nodes: FileNode[]
  activeFile: string
  onSelect: (path: string) => void
  depth?: number
}) {
  return (
    <ul className="flex flex-col">
      {nodes.map((node) =>
        node.type === "dir" ? (
          <DirNode
            key={node.path}
            node={node}
            activeFile={activeFile}
            onSelect={onSelect}
            depth={depth}
          />
        ) : (
          <FileNodeItem
            key={node.path}
            node={node}
            active={activeFile === node.path}
            onSelect={onSelect}
            depth={depth}
          />
        )
      )}
    </ul>
  )
}

function DirNode({
  node,
  activeFile,
  onSelect,
  depth,
}: {
  node: Extract<FileNode, { type: "dir" }>
  activeFile: string
  onSelect: (path: string) => void
  depth: number
}) {
  // Auto-expand if active file is inside this dir.
  const contains = React.useMemo(
    () => activeFile.startsWith(node.path + "/"),
    [activeFile, node.path]
  )
  const [open, setOpen] = React.useState(contains || depth < 1)

  React.useEffect(() => {
    if (contains) setOpen(true)
  }, [contains])

  return (
    <li>
      <button
        type="button"
        className="text-muted-foreground hover:text-foreground flex w-full items-center gap-1 rounded px-1.5 py-1 text-left text-xs"
        style={{ paddingLeft: `${depth * 12 + 6}px` }}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? (
          <ChevronDown className="size-3" />
        ) : (
          <ChevronRight className="size-3" />
        )}
        <span className="truncate">{node.name}</span>
      </button>
      {open && (
        <FileTree
          nodes={node.children}
          activeFile={activeFile}
          onSelect={onSelect}
          depth={depth + 1}
        />
      )}
    </li>
  )
}

function FileNodeItem({
  node,
  active,
  onSelect,
  depth,
}: {
  node: Extract<FileNode, { type: "file" }>
  active: boolean
  onSelect: (path: string) => void
  depth: number
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(node.path)}
        className={cn(
          "flex w-full items-center gap-1.5 rounded px-1.5 py-1 text-left text-xs",
          active
            ? "bg-accent text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
        style={{ paddingLeft: `${depth * 12 + 18}px` }}
      >
        <FileText className="size-3 shrink-0" />
        <span className="truncate">{node.name}</span>
      </button>
    </li>
  )
}
