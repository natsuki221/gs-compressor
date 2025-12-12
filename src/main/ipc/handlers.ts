import { ipcMain } from 'electron'
import { getGhostscriptVersion } from '../services/ghostscript'
import { app } from 'electron'

import { basename, dirname, join, extname } from 'path'
import { executeGhostscript } from '../services/ghostscript'
import { getGhostscriptArgs } from '../services/compressionStrategies'

export function setupHandlers(): void {
  // Compression Actions
  ipcMain.handle('compression:start', async (_, { filePath, mode }) => {
    try {
      // 1. Determine Output Path
      const dir = dirname(filePath)
      const ext = extname(filePath)
      const name = basename(filePath, ext)
      const outputPath = join(dir, `${name}_compressed${ext}`)

      // 2. Get Arguments
      const args = getGhostscriptArgs(filePath, outputPath, mode)
      
      // DEBUG: Log the command being executed
      console.log('[GS DEBUG] Input:', filePath)
      console.log('[GS DEBUG] Output:', outputPath)
      console.log('[GS DEBUG] Args:', args.join(' '))

      // 3. Execute
      await executeGhostscript(args)

      // 4. Get New Size
      const { stat } = await import('fs/promises')
      const stats = await stat(outputPath)

      return { success: true, outputPath, newSize: stats.size }
    } catch (error: any) {
      console.error('Compression failed:', error)
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('ghostscript:check', async () => {
    return getGhostscriptVersion()
  })

  // Experimental: Allow renderer to trigger arbitrary GS command for testing
  // In production this should be removed or strictly sanitized
  ipcMain.handle('ghostscript:test-execute', async (_, args: string[]) => {
    // Lazy import to avoid circular dep issues if any, or just direct
    const { executeGhostscript } = await import('../services/ghostscript')
    return executeGhostscript(args)
  })

  // App Meta
  ipcMain.handle('app:versions', () => {
    return {
      node: process.versions.node,
      chrome: process.versions.chrome,
      electron: process.versions.electron,
      gs: 'Unknown' // Will be filled by verify call
    }
  })

  // System
  ipcMain.handle('shell:showItemInFolder', (_, path) => {
    import('electron').then(({ shell }) => {
      shell.showItemInFolder(path)
    })
  })
}
