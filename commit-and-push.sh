#!/bin/bash
# Git Commit Commands for CI/CD Setup

# Stage all changes
git add .github/workflows/ci.yml
git add vitest.config.ts
git add .gitignore
git add README.md
git add playwright.config.ts
git add src/main/ipc/handlers.ts
git add src/renderer/src/components/DragDropZone.tsx
git add tests/support/fixtures/index.ts

# Stage prettier formatting changes
git add src/main/index.ts
git add src/main/services/ghostscript.ts
git add src/main/services/pathResolver.ts
git add src/preload/index.ts
git add src/renderer/src/components/ErrorBoundary.tsx
git add src/renderer/src/components/ui/dialog.tsx
git add src/renderer/src/components/ui/sonner.tsx
git add src/renderer/src/features/settings/components/SettingsDialog.tsx

# Commit with detailed message
git commit -F .git-commit-message.txt

# Push to GitHub
git push origin main

echo "✅ Changes committed and pushed to GitHub!"
echo "🔍 Check CI status at: https://github.com/natsuki221/gs-compressor/actions"
