import { faker } from '@faker-js/faker'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'

export class FileFactory {
  private createdFiles: string[] = []

  /**
   * Creates a dummy PDF file with a valid header
   */
  async createPdf(overrides: { name?: string; sizeBytes?: number } = {}) {
    const fileName = overrides.name || `${faker.system.fileName()}.pdf`
    const tmpDir = os.tmpdir()
    const filePath = path.join(tmpDir, fileName)

    // simple PDF header to satisfy basic checks
    let content = '%PDF-1.4\n%\n'

    // Add dummy content to reach size if requested
    if (overrides.sizeBytes) {
      const padding = 'A'.repeat(Math.max(0, overrides.sizeBytes - content.length))
      content += padding
    }

    await fs.writeFile(filePath, content)
    this.createdFiles.push(filePath)
    return {
      path: filePath,
      name: fileName,
      originalSize: content.length
    }
  }

  async cleanup() {
    for (const file of this.createdFiles) {
      try {
        await fs.unlink(file)
      } catch (e) {
        // ignore if already deleted
      }
    }
    this.createdFiles = []
  }
}
