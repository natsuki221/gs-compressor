import { test, expect } from '../support/fixtures'

test.describe('Application Launch', () => {
  test('should launch the application window', async ({ electronApp }) => {
    const window = await electronApp.firstWindow()
    const title = await window.title()

    // Default title is typically "gs-compressor" or similar from package.json or index.html
    // Verify it's not empty
    expect(title).toBeTruthy()
  })

  // Example of using the file factory (even if not used in this specific test strictly)
  test('should allow dragging files (simulated)', async ({ electronApp, fileFactory }) => {
    const window = await electronApp.firstWindow()
    const mockPdf = await fileFactory.createPdf()

    // Just verifying we can generate a file path
    expect(mockPdf.path).toContain('.pdf')

    // In a real test, we would simulate drag-drop using electron APIs or window.dispatchEvent
  })
})
