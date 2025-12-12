export type CompressionMode = 'ai' | 'print' | 'transfer'

export interface ScenarioPreset {
  id: CompressionMode
  label: string
  icon: string
  description: string
  technicalNote: string
}

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'ai',
    label: 'AI Mode',
    icon: '🤖',
    description: 'Optimize for LLM Context Window',
    technicalNote: 'Aggressive text/vector optimization. Screen-quality images (72 DPI).'
  },
  {
    id: 'print',
    label: 'Print Mode',
    icon: '🖨️',
    description: 'Layout Fidelity Priority',
    technicalNote: 'Safe rasterization. Print-quality (300 DPI). Zero layout shift guaranteed.'
  },
  {
    id: 'transfer',
    label: 'Transfer Mode',
    icon: '📧',
    description: 'Balanced for Email/IM',
    technicalNote: 'Ebook-quality (150 DPI). Good balance of size and quality.'
  }
]

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
