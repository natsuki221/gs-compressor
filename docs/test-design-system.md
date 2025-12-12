# System-Level Test Design

## Testability Assessment

- **Controllability**: **PASS**. The application structure (Electron Main/Renderer separation) allows excellent controllability via IPC mocking. The `contextBridge` pattern makes it easy to simulate Main process behavior (e.g., successful compression, failures, progress updates) when testing the Renderer. The Ghostscript service is isolated, allowing unit tests to mock the `spawn` process.
- **Observability**: **CONCERNS**. The critical "compression engine" is a black-box binary (`gs`). Observability relies entirely on parsing `stdout`/`stderr` from the child process. If the binary hangs without output or produces partial output, diagnosis is difficult.
- **Reliability**: **PASS**. The architecture specifically calls for "graceful failure" handling. The state management (Zustand) is in-memory and predictable.

## Architecturally Significant Requirements (ASRs)

| Requirement                          | Category    | Risk Score       | Rationale                                                                                                        |
| :----------------------------------- | :---------- | :--------------- | :--------------------------------------------------------------------------------------------------------------- |
| **Offline-First / Data Sovereignty** | Security    | **9 (Critical)** | Core value proposition. Any network leakage destroys trust.                                                      |
| **Bundled Binary Execution**         | Reliability | **6 (High)**     | Integration with native `gs` binary (x64/arm64) is the single point of failure for core functionality.           |
| **Zero Layout Shift**                | Quality     | **6 (High)**     | Requires specific GS parameters (`dPDFSETTINGS`). Difficult to validate automatically without visual regression. |
| **Startup Time < 2s**                | Performance | **4 (Medium)**   | Vite architecture supports this, but native binary initialization must be lazy/fast.                             |

## Test Levels Strategy

Given the "Desktop Utility" nature with a heavy dependency on a native binary:

- **Unit Tests: 50%**
  - **Focus**: Compression strategy mapping (Intent -> GS Args), IPC handlers validation, Queue state logic (Zustand), Output parsing regex.
  - **Rationale**: Complex logic resides in parameter mapping and state management, which are pure functions/logic.
- **Component/Integration Tests: 35%**
  - **Focus**: React UI components (Drag & Drop zone, Progress bars, Settings), IPC Bridge integration (`window.electronAPI`).
  - **Rationale**: Ensuring the UI correctly reflects the state updates from the Main process is critical for UX.
- **E2E / System Tests: 15%**
  - **Focus**: "Smoke Tests" (File In -> File Out), Application Launch, Native Menu integration.
  - **Rationale**: E2E is expensive due to Electron startup and native binary dependencies. Use sparingly for critical paths.

## NFR Testing Approach

- **Security (Privacy)**:
  - **Automated**: E2E tests with Playwright network interception (`context.route`) to assert **zero** outgoing requests during compression flow.
  - **Manual**: "Wi-Fi Off" verification.
- **Performance**:
  - **Automated**: Measure `app.evaluate(() => performance.now())` milestones during startup in Electron-Playwright tests.
  - **Threshold**: Fail if time-to-interactive > 2s.
- **Reliability**:
  - **Automated**: Unit tests for `ghostscript.ts` service with mocked `child_process.spawn` throwing errors / non-zero exit codes to verify error handling.
- **Maintainability**:
  - **Automated**: ESLint/Prettier + TypeScript strict mode.

## Test Environment Requirements

- **CI/CD**:
  - **macOS Runners**: Required to verify the actual `gs` binary execution and `.dmg` packaging.
  - **Architecture**: Ideally both x64 and arm64 runners, or at least one with cross-arch build checks.
- **Local**:
  - Node.js 20+ env.
  - Access to `resources/bin/mac-*/gs` (must be present for E2E).

## Testability Concerns

1.  **Visual Validation of "Zero Layout Shift"**: Automated visual regression testing on PDFs is complex and prone to flakiness.
    - _Recommendation_: Rely on rigorous unit testing of the _Parameters_ (Strategy Pattern) to ensure we are sending the correct "safe" flags (`dPDFSETTINGS=/prepress`, etc.) to Ghostscript, rather than trying to visually inspecting every output pixel in CI.
2.  **Binary Permissions**: The executable bit (`+x`) on `resources/bin/mac-*/gs` can be lost during git checkout or packaging if not handled explicitly.
    - _Recommendation_: Add a `test-setup` script that explicitly `chmod +x` the binaries before running tests.

## Recommendations for Sprint 0

1.  **Initialize Vitest**: Set up `vitest` for Unit/Component testing.
2.  **Mock Ghostscript**: Create a robust mock for the Ghostscript service to allow developing the UI without the actual binary interaction.
3.  **Playwright-Electron**: Configure Playwright for Electron to enable the "Smoke Test" E2E capability.
