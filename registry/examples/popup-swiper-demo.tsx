export default function PopupSwiperDemo() {
  return (
    <div className="border-border/60 bg-background relative h-32 w-44 overflow-hidden rounded-md border">
      <div className="text-muted-foreground absolute inset-x-0 top-0 flex items-center justify-center py-1.5 text-[10px]">
        Page content
      </div>
      <div className="border-border bg-muted/40 absolute inset-x-0 bottom-0 flex flex-col gap-1.5 rounded-t-lg border-t px-3 pt-3 pb-2">
        <div className="bg-muted-foreground/30 mx-auto h-1 w-8 rounded-full" />
        <div className="text-xs font-medium">Bottom sheet</div>
        <div className="text-muted-foreground text-[10px]">Swipe down to dismiss.</div>
      </div>
    </div>
  )
}
