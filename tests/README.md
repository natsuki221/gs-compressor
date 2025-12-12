# Test Framework

This project uses a dual-testing strategy:

- **Vitest**: For Unit and Component testing (Renderer/Main logic).
- **Playwright**: For End-to-End (E2E) testing of the packaged Electron application.

## Prerequisites

- Node.js 20+
- `npm install` completed

## Running Tests

### Unit Tests (Vitest)

Runs tests for utility functions, hooks, and React components.

```bash
npm run test
# or
npm run test:unit
```

### E2E Tests (Playwright)

Builds the application and launches it via Playwright's `_electron` executable.

```bash
npm run test:e2e
```

_Note: This command builds the app first to ensure the Main process code is up-to-date._

## Directory Structure

- `tests/e2e/`: Playwright test specifications.
- `tests/support/fixtures/`: Playwright fixtures (Factores, Electron App).
- `src/**/*.test.ts`: Vitest unit tests (co-located with code).

## Fixtures & Factories

We use the **Data Factory** pattern to generate test data.

- `FileFactory`: Generates dummy PDF files with valid headers for testing compression workflows.

## Environment Variables

Copy `.env.example` to `.env` if you need to override default settings (e.g. for CI).
