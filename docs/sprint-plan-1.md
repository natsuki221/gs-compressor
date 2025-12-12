# Sprint 1 Plan: Foundation & Ghostscript Integration

**Sprint Goal:** Establish the functional "Walking Skeleton" of the application by initializing the Electron/React architecture and successfully integrating the bundled Ghostscript binary in a secure IPC environment.

**Duration:** 2 Weeks (Estimated)
**Start Date:** 2025-12-12

## Selected Stories (Priority Order)

### 1. Story 1.1: Project Initialization & Architecture

- **Goal:** Initialize repo with `electron-vite`, React 19, TS, and basic folder structure.
- **Why:** Foundation for all future work.
- **Tasks:**
  - Init project with `npm create @quick-start/electron`
  - Clean up default template
  - Setup directory structure per `architecture.md`
  - Config ESLint/Prettier

### 2. Story 1.2: Ghostscript Binary Bundling

- **Goal:** Bundle `gs` binary for macOS (x64/arm64) and ensure it's packaged.
- **Why:** The core engine must be portable.
- **Tasks:**
  - Download/Compile `gs` binaries
  - configurations `electron-builder` `extraResources`
  - Verify binary existence in dev and build modes

### 3. Story 1.3: Secure IPC Bridge

- **Goal:** Create type-safe, isolated communication between Renderer and Main.
- **Why:** Security requirement (Context Isolation).
- **Tasks:**
  - contextBridge in `preload/index.ts`
  - `ipcMain.handle` in `main/`
  - Shared TypeScript interfaces

## Risks

- **Binary Permissions:** macOS Gatekeeper might block `gs`. May need `chmod +x` logic.
- **Architecture Match:** Ensure `electron-vite` template is cleaned up to match our specific folder structure.

## Definition of Done

- Repo initialized
- `npm run dev` works
- `npm run build` produces a valid .app
- `gs` binary is verified executable
