import { test, expect } from '../support/fixtures'

test.describe('Epic-3: Compression Core', () => {
  test('FR-CE-01: User can select AI Mode', async ({ electronApp, fileFactory }) => {
    const window = await electronApp.firstWindow()

    // GIVEN: App is loaded
    // WHEN: User selects "AI Mode" from the settings/dropdown
    await window.click('[data-testid="mode-selector"]')
    await window.click('[data-testid="mode-option-ai"]')

    // THEN: The UI reflects the selection
    await expect(window.locator('[data-testid="mode-selector"]')).toHaveText(/AI Mode/i)
  })

  test('FR-CE-03: Compression flow (Happy Path)', async ({ electronApp, fileFactory }) => {
    // GIVEN: A PDF file is in the queue
    const pdf = await fileFactory.createPdf({ name: 'to-compress.pdf' })
    const window = await electronApp.firstWindow()

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

    // AND: "Transfer Mode" is selected (Default)

    // WHEN: User clicks "Compress"
    await window.click('[data-testid="compress-button"]')

    // THEN: A progress indicator appears
    await expect(window.locator('[data-testid="processing-indicator"]')).toBeVisible()

    // AND: Eventually the status changes to "Completed"
    // Note: Since we don't have a real GS binary in this test environment yet (or maybe we do),
    // this test expects the underlying system to work or handle the mock.
    // In ATDD, we define what SHOULD happen.

    // We expect the progress to finish.
    // Increasing timeout because compression might take > default 5s (though mock GS should be fast)
    await expect(window.locator('[data-testid="status-completed"]')).toBeVisible({ timeout: 10000 })

    // AND: The new size is displayed
    await expect(window.locator('[data-testid="compressed-size"]')).toBeVisible()
  })
})
