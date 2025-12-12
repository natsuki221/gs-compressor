import { useState, useCallback } from 'react'
import { Card } from './ui/card'
import { cn } from '../lib/utils'
import { toast } from 'sonner'
import { Upload } from 'lucide-react'

interface DragDropZoneProps {
  onFilesDropped: (files: File[]) => void
  disabled?: boolean
  compact?: boolean
}

export function DragDropZone({
  onFilesDropped,
  disabled = false,
  compact = false
}: DragDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [errorShake, setErrorShake] = useState(false)

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (disabled) return
      setIsDragging(true)
    },
    [disabled]
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const target = e.relatedTarget as Node
    if (e.currentTarget.contains(target)) return
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      if (disabled) return

      const droppedFiles = Array.from(e.dataTransfer.files)
      const validFiles: File[] = []
      let hasInvalidFile = false

      droppedFiles.forEach((file) => {
        if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
          validFiles.push(file)
        } else {
          hasInvalidFile = true
        }
      })

      if (hasInvalidFile) {
        setErrorShake(true)
        setTimeout(() => setErrorShake(false), 500)
        toast.error('Only PDF files are supported.')
      }

      if (validFiles.length > 0) {
        onFilesDropped(validFiles)
        toast.success(`${validFiles.length} file(s) added to queue`)
      }
    },
    [disabled, onFilesDropped]
  )

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn('h-full w-full animate-in fade-in duration-500', compact ? 'p-0' : 'p-6')}
    >
      <Card
        className={cn(
          'h-full w-full flex items-center justify-center border-2 border-dashed transition-all duration-300 ease-in-out cursor-default select-none',
          isDragging
            ? 'border-primary bg-primary/5 scale-[0.99] ring-2 ring-primary/20'
            : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30',
          errorShake && 'border-destructive/50 bg-destructive/5',
          disabled && 'opacity-50 cursor-not-allowed',
          compact ? 'flex-row gap-4 p-4' : 'flex-col p-8'
        )}
      >
        <div
          className={cn(
            'pointer-events-none flex items-center',
            compact ? 'flex-row gap-3' : 'flex-col gap-4 text-center'
          )}
        >
          <div
            className={cn(
              'rounded-full transition-colors duration-300 flex items-center justify-center',
              isDragging ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground',
              compact ? 'h-10 w-10 p-2' : 'h-16 w-16 p-4'
            )}
          >
            <Upload
              className={cn(
                'transition-transform duration-300',
                isDragging && 'scale-110',
                compact ? 'h-5 w-5' : 'h-8 w-8'
              )}
            />
          </div>

          <div className="space-y-1">
            <h3 className={cn('font-semibold tracking-tight', compact ? 'text-sm' : 'text-2xl')}>
              {isDragging ? 'Drop to Add' : compact ? 'Drop more PDFs here' : 'Drop PDF here'}
            </h3>
            <p className={cn('text-muted-foreground', compact ? 'text-xs' : 'text-sm')}>
              {isDragging
                ? 'Release to queue'
                : compact
                  ? 'Add to existing queue'
                  : 'Support for multiple files'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
