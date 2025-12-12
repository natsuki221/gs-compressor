import { spawn, ChildProcess } from 'child_process'
import { getBinaryPath } from './pathResolver'
import { existsSync, chmodSync } from 'fs'

export interface GhostscriptOptions {
  args: string[]
}

export interface ExecutionResult {
  stdout: string
  stderr: string
}

export function spawnGhostscript(args: string[]): ChildProcess {
  const binaryPath = getBinaryPath()

  if (!existsSync(binaryPath)) {
    throw new Error(`Ghostscript binary not found at: ${binaryPath}`)
  }

  // Ensure executable permissions
  try {
    chmodSync(binaryPath, 0o755)
  } catch (err) {
    console.error('Failed to set permissions on Ghostscript binary:', err)
  }

  return spawn(binaryPath, args)
}

/**
 * Executes Ghostscript with the given arguments and returns the output.
 * Rejects if the process exits with a non-zero code.
 */
export async function executeGhostscript(args: string[]): Promise<ExecutionResult> {
  return new Promise((resolve, reject) => {
    const child = spawnGhostscript(args)
    let stdout = ''
    let stderr = ''

    if (child.stdout) {
      child.stdout.on('data', (data) => {
        stdout += data.toString()
      })
    }

    if (child.stderr) {
      child.stderr.on('data', (data) => {
        stderr += data.toString()
      })
    }

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout: stdout.trim(), stderr: stderr.trim() })
      } else {
        // Construct a helpful error message
        const errorMsg = `Ghostscript process exited with code ${code}`
        const fullError = stderr.trim() ? `${errorMsg}: ${stderr.trim()}` : errorMsg
        reject(new Error(fullError))
      }
    })

    child.on('error', (err) => {
      reject(new Error(`Failed to spawn Ghostscript: ${err.message}`))
    })
  })
}

export async function getGhostscriptVersion(): Promise<string> {
  try {
    const { stdout } = await executeGhostscript(['--version'])
    return stdout
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get Ghostscript version: ${error.message}`)
    }
    throw error
  }
}
