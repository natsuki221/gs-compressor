export type CompressionMode = 'ai' | 'print' | 'transfer'

export interface ElectronAPI {
  // Methods
  compressFile: (
    filePath: string,
    mode: CompressionMode
  ) => Promise<{
    success: boolean
    outputPath?: string
    newSize?: number
    error?: string
  }>
  cancelCompression: (jobId: string) => Promise<void>

  // File utilities
  getPathForFile: (file: File) => string

  // Versions for debug
  getVersions: () => Promise<{ node: string; chrome: string; electron: string; gs: string }>

  // Ghostscript Test
  checkGhostscript: () => Promise<string>
  testExecuteGhostscript: (args: string[]) => Promise<{ stdout: string; stderr: string }>

  // Events
  onProgress: (callback: (event: unknown, progress: number) => void) => () => void
  onFileOpen: (callback: (path: string) => void) => () => void

  // System
  showItemInFolder: (path: string) => Promise<void>
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
