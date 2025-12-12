import { test as base, _electron as electron, ElectronApplication, Locator } from '@playwright/test'
import { FileFactory } from './factories/file-factory'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

type TestFixtures = {
  fileFactory: FileFactory
  electronApp: ElectronApplication
  appWindow: Awaited<ReturnType<ElectronApplication['firstWindow']>>
  dragAndDropFile: (filePath: string, fileName: string, selector?: string) => Promise<void>
}

export const test = base.extend<TestFixtures>({
  fileFactory: async ({}, use) => {
    const factory = new FileFactory()
    await use(factory)
    await factory.cleanup()
  },
  electronApp: async ({}, use) => {
    const mainEntry = path.join(__dirname, '../../../../out/main/index.js')
    const app = await electron.launch({
      args: [mainEntry],
      env: { ...process.env, NODE_ENV: 'test' }
    })
    await use(app)
    await app.close()
  },
  appWindow: async ({ electronApp }, use) => {
    const window = await electronApp.firstWindow()
    await use(window)
  },
  dragAndDropFile: async ({ appWindow }, use) => {
    // Helper to simulate drag and drop
    await use(
      async (
        filePath: string,
        fileName: string,
        selector: string = '[data-testid="drop-zone"]'
      ) => {
        await appWindow.evaluate(
          async (options) => {
            const dropEvent = new Event('drop', { bubbles: true })
            Object.assign(dropEvent, {
              dataTransfer: {
                files: [{ path: options.filePath, name: options.fileName }]
              }
            })
            document.querySelector(options.selector)?.dispatchEvent(dropEvent)
          },
          { filePath, fileName, selector }
        )
      }
    )
  }
})

export { expect } from '@playwright/test'
