/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

import { ElectronAPI } from '../../shared/types'

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

declare module '*.svg' {
  const content: string
  export default content
}
