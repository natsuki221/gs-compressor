# Story 1.1: Project Initialization & Architecture Setup

**Status:** ready-for-dev

## Story

**As a** Developer,
**I want** to initialize the project with a robust, type-safe Electron + React structure,
**so that** future features can be built on a secure, performing, and maintainable foundation.

## Acceptance Criteria

### AC1: Project Initialization

- **Given** an empty or fresh project directory
- **When** I run the initialization command `npm create @quick-start/electron . -- --template react`
- **Then** a basic Electron-React project structure is created
- **And** `package.json` scripts are available for dev, build, and linting

### AC2: React 19 Upgrade

- **Given** the initialized project
- **When** I check `package.json` dependencies
- **Then** `react` and `react-dom` are upgraded to version `^19.2.0` (or latest stable 19.x)
- **And** the application runs without errors in the latest Electron renderer

### AC3: Architecture & Directory Structure

- **Given** the `src` directory
- **When** I inspect the file structure
- **Then** it matches the defined Architecture:
  - `src/main/` for Main Process
  - `src/preload/` for Context Bridge
  - `src/renderer/` for React UI
  - `src/renderer/features/` created for feature-slice logic
  - `src/shared/` created for shared types/constants

### AC4: Tooling & Configuration

- **Given** the development environment
- **When** I run `npm run lint` and `npm run type-check` (if applicable)
- **Then** no errors are reported
- **And** `electron-builder.yml` is present for packaging configuration

## Basic Tasks

- [ ] **Initialize Project**
  - [ ] Run `npm create @quick-start/electron . -- --template react`
  - [ ] Verify basic execution with `npm run dev`

- [ ] **Upgrade Dependencies**
  - [ ] Install `react@latest` and `react-dom@latest` (ensure v19+)
  - [ ] Update `electron-vite` config if needed for React 19 compatibility
  - [ ] Install `tailwindcss`, `postcss`, `autoprefixer`
  - [ ] Initialize Tailwind config

- [ ] **Structure & cleanup**
  - [ ] Create `src/shared/types.ts`
  - [ ] Create `src/renderer/features` directory
  - [ ] Create `src/renderer/components/ui` directory (for Radix)
  - [ ] Clean up default template boilerplate (remove demo IPCs if any)

- [ ] **Configuration**
  - [ ] Configure `electron-builder.yml` (basic setup)
  - [ ] Verify `tsconfig.json` settings (strict mode)

## Dev Notes

### Architecture Guidelines

- **Strict Separation**: Keep `main`, `preload`, `renderer` distinct. No `remote` module.
- **React 19**: This is a strict security requirement. Ensure no legacy dependencies block this uprade.
- **Styling**: Use TailwindCSS. Avoid CSS Modules unless strictly necessary for isolation.

### Project Structure

- `src/renderer/features/` is the home for domain logic.
- `src/shared/` is the ONLY place for types shared between Main and Renderer.

### Testing Standards

- (Deferred to later story, but keep code testable)

## Dev Agent Record

### Context Reference

- `docs/architecture.md` (Core Architecture)
- `docs/epics.md` (Story Source)

### Agent Model Used

- Claude-3-5-Sonnet (Planning Phase)
