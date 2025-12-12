import { useCallback, useState } from 'react'
import { clsx } from 'clsx'
import { useQueueStore } from '../store/queueStore'

export function DragDropZone(): JSX.Element {
  const [isDragOver, setIsDragOver] = useState(false)
  const addFiles = useQueueStore((state) => state.addFiles)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const files = Array.from(e.dataTransfer.files)
        addFiles(files)
      }
    },
    [addFiles]
  )

  // Also support click to upload
  const handleSelectFiles = (): void => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.accept = 'application/pdf'
    input.onchange = (e): void => {
      const files = (e.target as HTMLInputElement).files
      if (files) {
        addFiles(Array.from(files))
      }
    }
    input.click()
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleSelectFiles}
      className={clsx(
        'flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors',
        isDragOver
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-muted-foreground/25 text-muted-foreground hover:border-primary/50 hover:bg-muted/50'
      )}
    >
      <div className="text-sm font-medium">Click or Drag & Drop PDFs here</div>
      <div className="text-xs text-muted-foreground mt-1">Supports multiple files</div>
    </div>
  )
}
