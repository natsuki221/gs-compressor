import { Checkbox } from '../../../components/ui/checkbox'
import { useQueueStore } from '../store/queueStore'

export function QueueHeader() {
  const files = useQueueStore((state) => state.files)
  const toggleSelectAll = useQueueStore((state) => state.toggleSelectAll)

  if (files.length === 0) return null

  const allSelected = files.length > 0 && files.every((f) => f.selected)

  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b bg-muted/30 text-sm font-medium text-muted-foreground shrink-0">
      <Checkbox
        checked={allSelected}
        onCheckedChange={(checked) => toggleSelectAll(!!checked)}
        className="translate-y-[1px]"
      />
      <div className="flex-1">Select All</div>
      <div>{files.length} items</div>
    </div>
  )
}
