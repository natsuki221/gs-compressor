import { contextBridge, ipcRenderer, webUtils } from 'electron'
import { ElectronAPI } from '../shared/types'

const api: ElectronAPI = {
  compressFile: (filePath, mode) => ipcRenderer.invoke('compression:start', { filePath, mode }),
  cancelCompression: (jobId) => ipcRenderer.invoke('compression:cancel', jobId),
  getVersions: () => ipcRenderer.invoke('app:versions'),
  checkGhostscript: () => ipcRenderer.invoke('ghostscript:check'),
  testExecuteGhostscript: (args) => ipcRenderer.invoke('ghostscript:test-execute', args),
  getPathForFile: (file: File) => webUtils.getPathForFile(file),
  onProgress: (callback) => {
    const subscription = (_event: any, progress: number): void => callback(_event, progress)
    ipcRenderer.on('compression:progress', subscription)
    return (): void => {
      ipcRenderer.removeListener('compression:progress', subscription)
    }
  },
  onFileOpen: (callback) => {
    const subscription = (_event: any, path: string): void => callback(path)
    ipcRenderer.on('file:open', subscription)
    return (): void => {
      ipcRenderer.removeListener('file:open', subscription)
    }
  },
  showItemInFolder: (path) => ipcRenderer.invoke('shell:showItemInFolder', path)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electronAPI', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in d.ts)
  window.electronAPI = api
}
