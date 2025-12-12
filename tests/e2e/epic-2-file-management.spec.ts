import { test, expect } from '../support/fixtures'
import path from 'path'

test.describe('Epic-2: File Management', () => {
  test('FR-FM-01: User should be able to add files to the queue', async ({
    electronApp,
    fileFactory
  }) => {
    // GIVEN: The app is launched and ready
    const window = await electronApp.firstWindow()

    // AND: A valid PDF file exists
    const pdf = await fileFactory.createPdf({ name: 'test-doc.pdf' })

    // WHEN: The user drops a file (Simulated via IPC or Hidden Input for testability)
    // Note: Native D&D is hard to simulate in Playwright/Electron.
    // We assume the app exposes a test-helper or a hidden input for testing.
    // Or we trigger the drop event on the dropzone element.

    // Simulating drop event using fixture helper
    await dragAndDropFile(pdf.path, pdf.name)

    // THEN: The file appears in the queue list
    const queueItem = window.locator('[data-testid="queue-item"]')
    await expect(queueItem).toBeVisible()
    await expect(queueItem).toContainText('test-doc.pdf')
  })

  test('FR-FM-03: User should see original file size', async ({ electronApp, fileFactory }) => {
    // GIVEN: A PDF file of known size (e.g., ~1KB)
    const pdf = await fileFactory.createPdf({ name: 'size-test.pdf', sizeBytes: 1024 })
    const window = await electronApp.firstWindow()

    // WHEN: The file is added to the queue
    await window.evaluate(
      async (options) => {
        const dropEvent = new Event('drop', { bubbles: true })
        Object.assign(dropEvent, {
          dataTransfer: {
            files: [{ path: options.filePath, name: options.fileName, size: options.size }]
          }
        })
        document.querySelector('[data-testid="drop-zone"]')?.dispatchEvent(dropEvent)
      },
      { filePath: pdf.path, fileName: pdf.name, size: 1024 }
    )

    // THEN: The size is displayed correctly (e.g., "1 KB" or "1024 B")
    await expect(window.locator('[data-testid="file-size"]')).toContainText(/1.*KB|1024.*B/)
  })

  test('FR-FM-04: User can clear the queue', async ({ electronApp, fileFactory }) => {
    // GIVEN: A file is in the queue
    const pdf = await fileFactory.createPdf()
    const window = await electronApp.firstWindow()
    // (Add file logic repeated or extracted to helper in real refactor)
    await window.evaluate(
      async (options) => {
        const dropEvent = new Event('drop', { bubbles: true })
        Object.assign(dropEvent, {
          dataTransfer: { files: [{ path: options.filePath, name: options.fileName }] }
        })
        document.querySelector('[data-testid="drop-zone"]')?.dispatchEvent(dropEvent)
      },
      { filePath: pdf.path, fileName: pdf.name }
    )

    // WHEN: The user clicks "Clear Queue"
    await window.click('[data-testid="clear-queue-button"]')

    // THEN: The queue should be empty
    await expect(window.locator('[data-testid="queue-item"]')).toBeHidden()
  })
})
