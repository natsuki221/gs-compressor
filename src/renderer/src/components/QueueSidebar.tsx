import { useQueueStore } from '../features/queue/store/queueStore'
import { Checkbox } from './ui/checkbox'
import { ScrollArea } from './ui/scroll-area'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import {
  FileText,
  Trash2,
  CheckCircle,
  Loader2,
  AlertCircle,
  FolderSearch,
  Plus
} from 'lucide-react'
import { cn } from '../lib/utils'

interface QueueSidebarProps {
  onAddFiles: () => void
}

export function QueueSidebar({ onAddFiles }: QueueSidebarProps) {
  const files = useQueueStore((state) => state.files)
  const toggleSelection = useQueueStore((state) => state.toggleSelection)
  const toggleSelectAll = useQueueStore((state) => state.toggleSelectAll)
  const removeFile = useQueueStore((state) => state.removeFile)

  const allSelected = files.length > 0 && files.every((f) => f.selected)

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
        return 'bg-green-100 text-green-700 border-green-200'
      case 'processing':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'error':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'processing':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <FileText className="h-5 w-5 text-slate-400" />
    }
  }

  const handleReveal = async (outputPath: string | undefined) => {
    if (outputPath) {
      await window.electronAPI.showItemInFolder(outputPath)
    }
  }

  return (
    <aside className="w-96 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0 z-10 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex justify-between items-center shrink-0">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={allSelected}
            onCheckedChange={(checked) => toggleSelectAll(!!checked)}
            className="h-4 w-4"
          />
          <h3 className="font-semibold text-slate-700 text-sm">Batch Queue</h3>
        </div>
        <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
          {files.length}
        </span>
      </div>

      {/* File List */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {files.map((file) => {
            const reduction = file.compressedSize
              ? Math.round(((file.size - file.compressedSize) / file.size) * 100)
              : 0

            return (
              <div
                key={file.id}
                className={cn(
                  'p-3 rounded-lg bg-white border shadow-sm group hover:shadow-md transition-all',
                  file.selected && 'ring-2 ring-primary/20 border-primary/30'
                )}
              >
                {/* Row 1: Checkbox + Icon + Name + Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox
                    checked={file.selected}
                    onCheckedChange={(checked) => toggleSelection(file.id, !!checked)}
                    className="h-4 w-4 shrink-0"
                  />
                  <div className="h-8 w-8 bg-slate-100 rounded flex items-center justify-center shrink-0">
                    {getStatusIcon(file.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" title={file.name}>
                      {file.name}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn('text-[10px] shrink-0', getStatusColor(file.status))}
                  >
                    {file.status === 'completed' && reduction > 0
                      ? `-${reduction}%`
                      : file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                  </Badge>
                </div>

                {/* Row 2: Size info or Progress */}
                <div className="ml-14 mb-2">
                  {file.status === 'processing' ? (
                    <Progress value={file.progress || 30} className="h-1.5" />
                  ) : file.status === 'completed' && file.compressedSize ? (
                    <div className="flex items-center text-xs text-slate-500 gap-1">
                      <span className="line-through">{formatSize(file.size)}</span>
                      <span>→</span>
                      <span className="font-semibold text-green-600">
                        {formatSize(file.compressedSize)}
                      </span>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500">
                      {formatSize(file.size)}
                      {file.status === 'error' && file.statusDetail && (
                        <span className="text-red-500 ml-2" title={file.statusDetail}>
                          {file.statusDetail}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Row 3: Actions */}
                <div className="flex items-center justify-end gap-1 ml-14">
                  {file.status === 'completed' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-slate-500 hover:text-slate-700"
                      onClick={() => handleReveal(file.outputPath)}
                    >
                      <FolderSearch className="h-3 w-3 mr-1" />
                      開啟位置
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-slate-500 hover:text-red-600"
                    onClick={() => removeFile(file.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    移除
                  </Button>
                </div>
              </div>
            )
          })}

          {/* Add File Button */}
          <button
            onClick={onAddFiles}
            className="w-full p-4 border-2 border-dashed border-slate-200 rounded-lg text-center cursor-pointer hover:bg-slate-100/50 hover:border-slate-300 transition-colors"
          >
            <Plus className="h-5 w-5 text-slate-400 mx-auto mb-1" />
            <span className="text-xs font-medium text-slate-500">新增檔案</span>
          </button>
        </div>
      </ScrollArea>
    </aside>
  )
}
