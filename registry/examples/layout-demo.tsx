export default function LayoutDemo() {
  return (
    <div className="border-border/60 flex h-32 w-44 flex-col overflow-hidden rounded-md border">
      <div className="border-border/60 bg-muted/60 flex items-center justify-center border-b py-1.5 text-[10px] font-medium">
        Nav bar
      </div>
      <div className="text-muted-foreground flex flex-1 items-center justify-center text-[10px]">
        Content
      </div>
      <div className="border-border/60 bg-muted/40 flex items-center justify-center border-t py-1.5 text-[10px] font-medium">
        Footer
      </div>
    </div>
  )
}
