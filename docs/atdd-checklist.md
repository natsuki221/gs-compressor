# ATDD Checklist - Epics 2 & 3

**Status**: RED Phase (Tests Created, Implementation Pending)

## Overview

This checklist defines the acceptance tests generated for Epic 2 (File Management) and Epic 3 (Compression Core). Developers should use this to guide the implementation.

## Generated Tests

- `tests/e2e/epic-2-file-management.spec.ts` (File Queue, Drag & Drop)
- `tests/e2e/epic-3-compression.spec.ts` (Compression Mode, Execution)

## Implementation Guidance

### Required Data Test IDs (`data-testid`)

Implement these attributes in your React components to make the tests pass.

| Component         | Test ID                | Description                                 |
| :---------------- | :--------------------- | :------------------------------------------ |
| **Drop Zone**     | `drop-zone`            | The main area accepting file drops          |
| **Queue Item**    | `queue-item`           | The container for a single file in the list |
| **File Size**     | `file-size`            | Display of file size (e.g. "1.2 MB")        |
| **Clear Queue**   | `clear-queue-button`   | Button to remove all files                  |
| **Mode Selector** | `mode-selector`        | Dropdown/Trigger for compression modes      |
| **Mode Option**   | `mode-option-ai`       | The "AI Mode" selection item                |
| **Compress Btn**  | `compress-button`      | The primary action button                   |
| **Progress**      | `processing-indicator` | Visible during compression                  |
| **Completed**     | `status-completed`     | Visible after success                       |
| **Result Size**   | `compressed-size`      | Display of new size                         |

### Implementation Checklist

#### Epic 2: File Management

- [ ] Implement `DropZone` component with `onDrop` handler.
- [ ] **Crucial**: Ensure `onDrop` handles `event.dataTransfer.files` correctly from Electron.
- [ ] Implement `QueueList` component with Zustand store integration.
- [ ] Add `data-testid="drop-zone"` to the drop area wrapper.
- [ ] Add `data-testid="queue-item"` to list items.

#### Epic 3: Compression Core

- [ ] Implement `GhostscriptService` in Main process.
- [ ] Wire up IPC for `compress-file`.
- [ ] Implement `ModeSelector` UI component.
- [ ] Ensure `data-testid="mode-selector"` is on the trigger.

## How to Run Tests

```bash
# Verify currently failing tests
npm run test:e2e

# Run specific epic
npm run test:e2e -- epic-2
```

## Next Steps

1. **Developer**: Pick a test (e.g., FR-FM-01).
2. **Developer**: Implement the UI and logic.
3. **Developer**: Run the test until it passes (GREEN).
4. **Developer**: Refactor and move to the next test.
