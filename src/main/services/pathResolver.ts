import { execSync } from 'child_process'
import { existsSync } from 'fs'

/**
 * Finds the Ghostscript binary path.
 * Priority:
 * 1. System PATH (e.g., /opt/homebrew/bin/gs)
 * 2. Throws error with installation instructions if not found
 */
export function getBinaryPath(): string {
  const platform = process.platform

  if (platform !== 'darwin') {
    throw new Error(`Unsupported platform: ${platform}. Only macOS is supported.`)
  }

  // Try to find gs in system PATH
  try {
    const systemGsPath = execSync('which gs', { encoding: 'utf-8' }).trim()
    if (systemGsPath && existsSync(systemGsPath)) {
      return systemGsPath
    }
  } catch {
    // 'which' command failed, gs not in PATH
  }

  // Common Homebrew locations
  const commonPaths = [
    '/opt/homebrew/bin/gs', // Apple Silicon
    '/usr/local/bin/gs', // Intel Mac
    '/usr/bin/gs' // System install
  ]

  for (const path of commonPaths) {
    if (existsSync(path)) {
      return path
    }
  }

  // Not found - throw helpful error
  throw new Error(
    'Ghostscript not found on your system.\n\n' +
      'Please install it using Homebrew:\n' +
      '  brew install ghostscript\n\n' +
      'Then restart the application.'
  )
}
