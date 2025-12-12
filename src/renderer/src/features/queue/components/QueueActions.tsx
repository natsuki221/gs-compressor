import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { useQueueStore } from '../store/queueStore'
import { toast } from 'sonner'

export function QueueActions() {
  const files = useQueueStore((state) => state.files)
  const clearQueue = useQueueStore((state) => state.clearQueue)
  const removeSelected = useQueueStore((state) => state.removeSelected)
  const updateFileStatus = useQueueStore((state) => state.updateFileStatus)
  const [isCompressing, setIsCompressing] = useState(false)

  const handleCompress = async () => {
    setIsCompressing(true)
    const pendingFiles = files.filter((f) => f.status === 'pending' || f.status === 'error')

    if (pendingFiles.length === 0) {
      setIsCompressing(false)
      return
    }

    toast.info(`Starting compression for ${pendingFiles.length} file(s)...`)

    for (const file of pendingFiles) {
      updateFileStatus(file.id, 'processing')

      try {
        const result = await window.electronAPI.compressFile(file.path, 'transfer')

        if (result.success) {
          updateFileStatus(file.id, 'completed', undefined, 100)
        } else {
          updateFileStatus(file.id, 'error', result.error)
          toast.error(`Compression failed: ${file.name}`)
        }
      } catch (err: any) {
        updateFileStatus(file.id, 'error', err.message)
        toast.error(`Error processing ${file.name}`)
      }
    }

    setIsCompressing(false)
    toast.success('Queue processing complete')
  }

  if (files.length === 0) return null

  const selectedCount = files.filter((f) => f.selected).length

  return (
    <div className="border-t bg-background p-4 flex justify-between items-center bg-gray-50/50">
      {selectedCount > 0 ? (
        <Button variant="destructive" size="sm" onClick={removeSelected} disabled={isCompressing}>
          Remove Selected ({selectedCount})
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearQueue}
          className="text-muted-foreground hover:text-destructive"
          disabled={isCompressing}
        >
          Clear Queue
        </Button>
      )}

      <div className="flex gap-3 items-center">
        <span className="text-sm text-muted-foreground mr-2">
          {files.length} file{files.length > 1 ? 's' : ''} ready
        </span>
        <Button
          size="default"
          className="bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-semibold px-8"
          onClick={handleCompress}
          disabled={isCompressing}
        >
          {isCompressing ? 'Compressing...' : 'Compress Files'}
        </Button>
      </div>
    </div>
  )
}
