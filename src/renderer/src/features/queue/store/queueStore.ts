import { create } from 'zustand'

export type FileStatus = 'pending' | 'processing' | 'completed' | 'error'

export interface QueueItem {
  id: string
  file: File // The original File object (or mock in Electron renderer)
  path: string
  name: string
  size: number
  compressedSize?: number // result size
  outputPath?: string // result path
  status: FileStatus
  statusDetail?: string
  progress: number // 0-100
  selected: boolean
}

interface QueueState {
  files: QueueItem[]
  addFiles: (newFiles: File[]) => void
  removeFile: (id: string) => void
  removeSelected: () => void
  clearQueue: () => void
  toggleSelection: (id: string, selected: boolean) => void
  toggleSelectAll: (selected: boolean) => void
  updateFileStatus: (
    id: string,
    status: FileStatus,
    detail?: string,
    progress?: number,
    result?: { size: number; path: string }
  ) => void
}

export const useQueueStore = create<QueueState>((set) => ({
  files: [],

  addFiles: (newFiles) =>
    set((state) => {
      // Filter duplicates based on path/name if reasonable, or allow all.
      // user might want to simple dedupe by path.
      const existingPaths = new Set(state.files.map((f) => f.path))
      const freshFiles = newFiles
        .filter((f) => {
          const filePath = window.electronAPI?.getPathForFile?.(f) || ''
          return !existingPaths.has(filePath || f.name)
        })
        .map((f) => {
          const filePath = window.electronAPI?.getPathForFile?.(f) || ''
          return {
            id: crypto.randomUUID(),
            file: f,
            path: filePath,
            name: f.name,
            size: f.size,
            status: 'pending' as FileStatus,
            progress: 0,
            selected: false
          }
        })

      return { files: [...state.files, ...freshFiles] }
    }),

  removeFile: (id) =>
    set((state) => ({
      files: state.files.filter((f) => f.id !== id)
    })),

  removeSelected: () =>
    set((state) => ({
      files: state.files.filter((f) => !f.selected)
    })),

  clearQueue: () => set({ files: [] }),

  toggleSelection: (id, selected) =>
    set((state) => ({
      files: state.files.map((f) => (f.id === id ? { ...f, selected } : f))
    })),

  toggleSelectAll: (selected) =>
    set((state) => ({
      files: state.files.map((f) => ({ ...f, selected }))
    })),

  updateFileStatus: (id, status, detail, progress, result) =>
    set((state) => ({
      files: state.files.map((f) =>
        f.id === id
          ? {
              ...f,
              status,
              statusDetail: detail ?? f.statusDetail,
              progress: progress ?? f.progress,
              compressedSize: result?.size ?? f.compressedSize,
              outputPath: result?.path ?? f.outputPath
            }
          : f
      )
    }))
}))
