import { useQueueStore } from '../store/queueStore'
import { QueueItem } from './QueueItem'
import { ScrollArea } from '../../../components/ui/scroll-area'
import { DragDropZone } from '../../../components/DragDropZone'
// Re-using zone inside empty list if we want, or just rely on outer layout.
// For now, the list just renders items.

export function QueueList() {
  const files = useQueueStore((state) => state.files)

  if (files.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground text-sm border-2 border-dashed border-muted rounded-lg m-4">
        <p>Queue is empty</p>
        {/* We might want a drop zone here too */}
      </div>
    )
  }

  return (
    <ScrollArea className="h-full pr-4">
      <div className="flex flex-col gap-1">
        {files.map((item) => (
          <QueueItem key={item.id} item={item} />
        ))}
      </div>
    </ScrollArea>
  )
}
