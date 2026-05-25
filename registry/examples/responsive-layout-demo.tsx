export default function ResponsiveLayoutDemo() {
  return (
    <div className="flex items-center gap-2">
      <div className="border-border/60 flex h-24 w-12 flex-col overflow-hidden rounded-sm border text-[9px]">
        <div className="border-border/60 bg-muted/60 border-b py-0.5 text-center">mobile</div>
        <div className="text-muted-foreground flex flex-1 items-center justify-center">·</div>
      </div>
      <div className="border-border/60 flex h-20 w-32 flex-col overflow-hidden rounded-sm border text-[9px]">
        <div className="border-border/60 bg-muted/60 border-b py-0.5 text-center">desktop</div>
        <div className="flex flex-1">
          <div className="bg-muted/40 w-10 border-r" />
          <div className="text-muted-foreground flex flex-1 items-center justify-center">·</div>
        </div>
      </div>
    </div>
  )
}
