import { ChevronRight } from "lucide-react"

export default function TouchCellDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col">
      {["Notifications", "Language", "Linked accounts"].map((label) => (
        <button
          key={label}
          className="hover:bg-muted/50 flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm transition-colors"
        >
          <span>{label}</span>
          <ChevronRight className="text-muted-foreground size-4" />
        </button>
      ))}
    </div>
  )
}
