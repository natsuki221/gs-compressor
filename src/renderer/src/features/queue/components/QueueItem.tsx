import { useRef } from 'react'
import { FileText, Trash2, CheckCircle, AlertCircle, FolderSearch, Loader2 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Checkbox } from '../../../components/ui/checkbox'
import { Progress } from '../../../components/ui/progress'
import { QueueItem as QueueItemType, useQueueStore } from '../store/queueStore'
import { cn, truncateFilename } from '../../../lib/utils'

interface QueueItemProps {
  item: QueueItemType
}

export function QueueItem({ item }: QueueItemProps) {
  const removeFile = useQueueStore((state) => state.removeFile)
  const toggleSelection = useQueueStore((state) => state.toggleSelection)

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200'
      case 'processing':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200'
      case 'error':
        return 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200'
      default:
        return 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
    }
  }

  const handleReveal = async () => {
    if (item.outputPath) {
      await window.electronAPI.showItemInFolder(item.outputPath)
    }
  }

  const reduction = item.compressedSize
    ? Math.round(((item.size - item.compressedSize) / item.size) * 100)
    : 0

  return (
    <div className="flex items-center p-3 mb-2 bg-card rounded-lg border shadow-sm group hover:shadow-md transition-all overflow-hidden">
      {/* Selection (only if not processing/completed maybe? keeping enabled for now) */}
      <div className="mr-3">
        <Checkbox
          checked={item.selected}
          onCheckedChange={(checked) => toggleSelection(item.id, !!checked)}
        />
      </div>

      {/* Icon */}
      <div className="h-10 w-10 bg-muted/50 rounded-lg flex items-center justify-center mr-3 text-muted-foreground">
        {item.status === 'processing' ? (
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        ) : item.status === 'completed' ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : item.status === 'error' ? (
          <AlertCircle className="h-5 w-5 text-destructive" />
        ) : (
          <FileText className="h-5 w-5" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 mr-4">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-medium text-sm truncate pr-2 max-w-[140px]" title={item.name}>
            {truncateFilename(item.name)}
          </h4>
          <Badge
            variant="outline"
            className={cn(
              'text-xs font-normal whitespace-nowrap ml-2 shrink-0',
              getStatusColor(item.status)
            )}
          >
            {item.status === 'completed' && reduction > 0
              ? `-${reduction}%`
              : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Badge>
        </div>

        {item.status === 'processing' ? (
          <div className="flex items-center gap-2 mt-1">
            <Progress value={item.progress || 30} className="h-1.5" />
            {/* Mocking progress for now if backend doesn't stream it yet */}
          </div>
        ) : item.status === 'completed' && item.compressedSize ? (
          <div className="flex items-center text-xs text-muted-foreground gap-1">
            <span className="line-through">{formatSize(item.size)}</span>
            <span>→</span>
            <span className="font-semibold text-green-600">{formatSize(item.compressedSize)}</span>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatSize(item.size)}</span>
            {item.status === 'error' && (
              <span className="text-destructive max-w-[150px] truncate" title={item.statusDetail}>
                {item.statusDetail}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        {item.status === 'completed' && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={handleReveal}
            title="Reveal in Finder"
          >
            <FolderSearch className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
          onClick={() => removeFile(item.id)}
          title="Remove from queue"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
