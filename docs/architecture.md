---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7]
inputDocuments:
  - '/Users/lintzujeng/Documents/Coding/Javascript/github.com/natsuki221/gs-compressor/docs/prd.md'
workflowType: 'architecture'
lastStep: 7
project_name: 'gs-compressor'
user_name: 'natsuki'
date: '2025-12-11'
---

# 架構決策文件 (Architecture Decision Document)

_本文檔通過一步步的探索協作建立。隨著我們共同完成每個架構決策，章節將會被追加。_

## 專案脈絡分析 (Project Context Analysis)

### 需求概覽 (Requirements Overview)

**Functional Requirements:**

- **核心引擎**: 必須封裝並管理 `gs` (Ghostscript) 二進位檔的生命週期。架構需處理子程序 (Child Process) 的生成、監控與標準輸入/輸出串流 (stdio) 解析。
- **場景預設 (Scenario Presets)**: 架構需將高階用戶意圖 (AI/Print/Transfer) 映射為複雜的 Ghostscript 命令列參數。這暗示需要一個彈性的「策略模式」或「配置工廠」。
- **批量處理**: 需實作佇列管理 (Queue Management)，確保在處理大量檔案時 UI 不會凍結 (Non-blocking I/O)，並能優雅處理單一檔案失敗。

**Non-Functional Requirements:**

- **隱私 (Local Execution)**: **嚴格限制**。架構必須確保沒有任何遙測或雲端依賴。更新檢查需被動觸發。
- **效能 (Startup < 2s)**: Electron 主程序 (Main Process) 必須輕量化。需採用延遲載入 (Lazy Loading) 或 Vite 的優化建構。
- **可靠性 (Crash < 5%)**: 需有強健的錯誤邊界 (Error Boundaries) 和重試/恢復機制。Ghostscript 的崩潰不應導致整個 App 關閉。

**Scale & Complexity:**

- **Primary Domain**: Desktop / System Utility
- **Complexity Level**: **Medium** (涉及原生二進位檔整合與跨平台 IPC)
- **Estimated Components**: ~4-5 個核心模組 (UI, Queue Manager, Engine Adapter, IPC Bridge, File System Handler)

### 技術限制與依賴 (Technical Constraints & Dependencies)

- **Electron IPC**: 前端 (Renderer) 與後端 (Main) 的通訊必須透過 `contextBridge` 進行安全隔離。
- **Ghostscript Bundling**: 需針對 macOS (x64/arm64) 管理不同的二進位檔路徑與權限 (`chmod +x`)。
- **Sandbox**: macOS App Sandbox 可能限制檔案系統存取，需妥善處理 "Open With" 與 Drag & Drop 的檔案權限。

### 識別出的跨切面關注點 (Cross-Cutting Concerns Identified)

1.  **錯誤處理與日誌**: 在離線環境下，如何收集有用的除錯資訊 (在此案中可能僅寫入本地 log 檔供用戶查看)。
2.  **狀態同步**: 檔案佇列狀態在 UI 與 Main Process 之間的即時同步。
3.  **安全性**: 防止惡意 PDF 透過 Ghostscript 漏洞攻擊主機 (雖然由 GS 負責，但 App 層需做基本參數位生)。

## 初始模板評估 (Starter Template Evaluation)

### 主要技術領域 (Primary Technology Domain)

**桌面應用程式 (Electron)** 基於專案需求分析。

### 考慮的初始選項 (Starter Options Considered)

1.  **Electron Forge + Vite**: 官方 Electron 推薦。功能全面，但歷史上 Vite 整合較為複雜。
2.  **electron-vite (create-electron)**: 專為 Electron + Vite 設計的建構工具。提供更快的建構速度、更簡單的配置，並優化了 Main/Preload/Renderer 進程的處理。強烈推薦用於現代 "Vite-first" Electron App。
3.  **社群樣板 (Community Boilerplates)** (如 electron-react-boilerplate): 通常過於臃腫或固執己見。

### 選擇的模板: electron-vite (React Template)

**選擇理由:**
我們選擇 `electron-vite` 是因為它完美符合我們對現代、高效能且「未來就緒」堆疊的需求。它簡化了多進程熱重載 (HMR) 和打包的複雜設定，這對於我們的「啟動時間 < 2s」NFR 至關重要。它本質上將 Electron 視為 Vite 生態系統中的一等公民。

**初始化指令:**

```bash
npm create @quick-start/electron . -- --template react
```

**模板提供的架構決策:**

**語言與執行環境:**

- **React**: 預先配置。
- **TypeScript**: 開箱即用支援 (我們將使用 TS 進行類型安全)。

**樣式解決方案:**

- **CSS/Less/Sass**: 內建支援。我們將在此基礎上添加 TailwindCSS。

**建構工具:**

- **Vite**: 處理 Main 和 Renderer 進程的 HMR 和打包。
- **electron-builder**: 預先配置用於打包 (dmg/app)。

**測試框架:**

- 模板未強制執行，需要單獨設置 (推薦 Vitest)。

**程式碼組織:**

- `src/main`: 主進程程式碼。
- `src/preload`: 預載入腳本。
- `src/renderer`: React UI。

**開發體驗:**

- 並發執行 main/renderer。
- 快速 HMR。
- 類型安全的 IPC 橋接模式 (若使用額外插件或手動設定)。

## 核心架構決策 (Core Architectural Decisions)

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**

- **Frontend Framework**: React v19.2+ (Strict Security Requirement).
- **State Management**: Zustand (Renderer process only).
- **IPC Pattern**: Context Isolation with strict `invoke`/`handle` barriers.
- **Ghostscript Integration**: Standard input/output stream management via Node.js `spawn`.

**Important Decisions (Shape Architecture):**

- **UI Library**: Radix UI Primitives + TailwindCSS.
- **Build System**: electron-vite (Vite-based).

**Deferred Decisions (Post-MVP):**

- **Auto-Updater Implementation**: Deferred until code signing infrastructure is ready.
- **Windows Support**: Deferred to Phase 2.

### Data Architecture

- **Persistence Strategy**: In-Memory (Volatile).
  - **Rationale**: Privacy-first approach. We intentionally do NOT persist file lists or metadata to disk db. If the app closes, state is wiped.
  - **Provided by Starter**: No (Custom implementation).
- **State Management**: **Zustand**.
  - **Rationale**: Minimal boilerplate, excellent hook support, sufficient for managing a list of ~50 files and their progress states.
  - **Version**: Latest Stable (v5+).

### Authentication & Security

- **IPC Security**: **Context Isolation (Strict)**.
  - **Decision**: Renderer never accesses Node.js directly.
  - **Pattern**: Preload script exposes specific API methods (e.g., `compressFile(path, options)`).
- **Data Sovereignty**: **Offline Enforcement**.
  - **Decision**: Network requests blocked at CSP level (except for potential future update checks).

### API & Communication Patterns

- **IPC Communication Protocols**:
  - **Action**: `ipcRenderer.invoke` (Renderer) -> `ipcMain.handle` (Main). Used for "Start Compression", "Cancel".
  - **Event**: `webContents.send` (Main) -> `ipcRenderer.on` (Renderer). Used for "Progress Update", "Compression Complete".
- **Type Sharing**: Shared TypeScript Interfaces for IPC payloads to ensure contract validity between processes.

### Frontend Architecture

- **Framework Version**: **React v19.2+**.
  - **Rationale**: **Hard Security Requirement** (CVE-2025-55182 compliance). We must ensure all dependencies are compatible with React 19.
- **Component Library**: **Radix UI**.
  - **Rationale**: Headless components allow us to implement our specific "Future-Ready" design without fighting opinionated styles.
- **Styling**: **TailwindCSS**.

### Infrastructure & Deployment

- **Build System**: **electron-vite**.
  - **Rationale**: Best performance for HMR and build times.
- **Packaging**: **electron-builder**.
  - **Target**: `dmg` (macOS).
  - **Artifacts**: Native binaries (Ghostscript) included via `extraResources`.

### Decision Impact Analysis

**Implementation Sequence:**

1.  Initialize project with `electron-vite`.
2.  **IMMEDIATE**: Upgrade React to v19.2+ and verify compatibility.
3.  Set up IPC Bridge and Type definitions.
4.  Implement State Manager (Zustand).
5.  Integrate Ghostscript binary.

**Cross-Component Dependencies:**

- React 19 might require newer versions of `electron-vite` plugins or specific configuration for Fast Refresh to work correctly.

## Implementation Patterns & Consistency Rules

### 定義的模式類別 (Pattern Categories Defined)

**識別出的關鍵衝突點:**
4 個 AI 代理可能做出不同選擇的領域 (IPC, 結構, 狀態, 錯誤處理)。

### 命名模式 (Naming Patterns)

**IPC 頻道:**

- **規則**: `namespace:action` (kebab-case)。
- **範例**: `compression:start`, `app:quit`, `settings:update`。

**代碼命名慣例:**

- **元件**: `PascalCase` (如 `QueueItem.tsx`)。
- **Hooks**: `camelCase` (如 `useCompression.ts`)。
- **類型**: `PascalCase` (如 `CompressionJob`)。

### 結構模式 (Structure Patterns)

**專案組織:**

- **Feature-Slices**: `src/renderer/features/{featureName}` 包含該功能的所有邏輯、元件和狀態。
- **Shared UI**: `src/renderer/components/ui` 用於通用設計系統元件。

### 通訊模式 (Communication Patterns)

**IPC 結果模式:**

- **規則**: 所有 Main Process 處理程序返回 `{ success: boolean, data?: T, error?: string }`。
- **理由**: 避免在 Renderer 中陷入 try-catch 地獄；使錯誤成為明確的類型值。

**狀態管理模式:**

- **Store 模式**: 單一功能 = 單一 Store (或 Slice)。
- **Selector 模式**: 始終使用原子選擇器 `state => state.value`。

### 流程模式 (Process Patterns)

**錯誤處理模式:**

- **操作錯誤**: 非致命 (如「檔案損毀」) -> Toast 通知。
- **系統錯誤**: 致命 (如「Ghostscript 二進位檔遺失」) -> Modal 對話框 / 錯誤畫面。

### 強制指南 (Enforcement Guidelines)

**所有 AI 代理必須:**

1.  在實作邏輯之前，於 `src/shared/types.ts` 定義所有 IPC 介面。
2.  使用 `features` 資料夾結構進行領域邏輯開發。
3.  絕不在 Renderer 元件中直接導入 `electron` (使用 `window.electronAPI`)。

## 專案結構與邊界 (Project Structure & Boundaries)

### 完整專案目錄結構 (Complete Project Directory Structure)

```
gs-compressor/
├── .github/workflows/       # CI/CD (建構與發布)
├── resources/               # 額外資源 (Ghostscript 二進位檔)
│   ├── bin/
│   │   ├── mac-x64/gs   # 手動下載
│   │   └── mac-arm64/gs # 手動下載
├── src/
│   ├── main/                # [Main Process] Node.js 上下文
│   │   ├── index.ts         # 入口點
│   │   ├── services/
│   │   │   ├── ghostscript.ts  # 子程序管理器
│   │   │   └── file-system.ts  # 檔案系統操作
│   │   └── ipc/
│   │       └── handlers.ts     # ipcMain.handle 設定
│   ├── preload/             # [Preload Script] Context Bridge
│   │   ├── index.ts
│   │   └── index.d.ts       # window.electronAPI 的類型定義
│   ├── renderer/            # [Renderer Process] React + Vite
│   │   ├── index.html
│   │   ├── src/
│   │   │   ├── app.tsx
│   │   │   ├── main.tsx
│   │   │   ├── components/
│   │   │   │   └── ui/      # 共用 Shadcn/Radix 元件
│   │   │   ├── features/
│   │   │   │   ├── queue/   # 佇列功能 (列表, 項目, Store)
│   │   │   │   └── settings/# 設定功能 (壓縮等級)
│   │   │   └── layouts/     # App 殼層 (Shell)
│   ├── shared/              # [Shared Code] 純 Types/Utils
│   │   ├── types.ts         # IPC 介面
│   │   └── constants.ts     # 錯誤碼, 預設值定義
├── electron-builder.yml     # 打包配置
├── package.json
├── tsconfig.json
└── vite.config.ts           # electron-vite 配置
```

### 架構邊界與整合 (Architectural Boundaries & Integration)

**API 邊界 (Context Bridge):**

- `window.electronAPI.compressFile(path, options)` -> `main/services/ghostscript.ts`
- `window.electronAPI.cancelCompression(jobId)` -> `main/services/ghostscript.ts`
- `window.electronAPI.onProgress((event) => void)` -> renderer 監聽器

**需求映射:**

- **Epic: 佇列管理**: `src/renderer/features/queue/` + `src/renderer/store/useQueueStore.ts`
- **Epic: 核心引擎**: `src/main/services/ghostscript.ts` (在此生成 `gs` 進程)
- **NFR: 本地隱私**: 無網路代碼目錄；`resources/` 包含嚴格的本地依賴。

## 架構驗證結果 (Architecture Validation Results)

### 一致性驗證 (Coherence Validation) ✅

**決策相容性:**
堆疊 (Electron + Vite + React 19 + Zustand) 是一致的。選擇 `electron-vite` 解決了特定的「主進程熱重載」痛點，而 `contextBridge` 確保了嚴格的安全性。透過確保我們不使用過時模式來實現 React 19 合規性。

**模式一致性:**
IPC 模式 (`namespace:action`) 與目錄結構 (`src/features`) 保持一致。

**結構對齊:**
結構明確分離了 `main`、`preload` 和 `renderer`，這強制執行了 Context Isolation 決策。

### 需求覆蓋驗證 (Requirements Coverage Validation) ✅

**Epic/Feature 覆蓋:**

- **佇列管理**: 由 `features/queue` 和 `useQueueStore` 覆蓋。
- **設定/預設**: 由 `features/settings` 覆蓋。
- **批量處理**: 由 `main/services/ghostscript.ts` 覆蓋 (支援非同步佇列)。

**功能需求覆蓋:**

- **檔案拖放**: 由 `electron-vite` 靜態資產處理支援。
- **原生選單**: 由 `main/index.ts` 選單模板支援。

**非功能需求覆蓋:**

- **效能**: Vite 優化 renderer bundle。
- **隱私**: 確認離線架構。
- **可靠性**: 定義了錯誤處理邊界。

### 實作準備度驗證 (Implementation Readiness Validation) ✅

**決策完整性:**
關鍵決策 (React 19, Zustand, IPC) 已定。自動更新被正確延遲。

**結構完整性:**
目錄樹具體且非通用。`resources/bin` 對於外部二進位檔至關重要且已存在。

**模式完整性:**
IPC 和命名模式被嚴格定義以防止「義大利麵條式代碼」。

### 差距分析結果 (Gap Analysis Results)

**次要差距:**

- **代碼簽名**: 設置尚未詳細說明 (已延遲)。
- **特定 Ghostscript 標誌**: "AI vs Print" 預設值的實際命令列參數需要在實作層 (Service layer) 定義。

### 架構完整性檢查清單 (Architecture Completeness Checklist)

**✅ 需求分析**

- [x] 專案脈絡已徹底分析
- [x] 規模和複雜度已評估
- [x] 技術限制已識別
- [x] 跨切面關注點已映射

**✅ 架構決策**

- [x] 關鍵決策已記錄並附帶版本
- [x] 技術堆疊已完全指定
- [x] 整合模式已定義
- [x] 效能考量已解決

**✅ 實作模式**

- [x] 命名慣例已建立
- [x] 結構模式已定義
- [x] 通訊模式已指定
- [x] 流程模式已記錄

**✅ 專案結構**

- [x] 完整目錄結構已定義
- [x] 元件邊界已建立
- [x] 整合點已映射
- [x] 需求至結構的映射已完成

### 架構準備度評估 (Architecture Readiness Assessment)

**整體狀態:** 準備好實作 (READY FOR IMPLEMENTATION)

**信心水準:** 高

**關鍵優勢:**

- 嚴格的 IPC 安全邊界。
- 基於功能的資料夾結構防止巨大的 "components" 資料夾。
- 現代建構工具鏈 (`electron-vite`) 提供最佳 DX。

**未來增強領域:**

- 自動更新基礎設施。
- Windows/Linux 交叉編譯管道。

### 實作交接 (Implementation Handoff)

**AI 代理指南:**

- 嚴格遵守所有記錄的架構決策
- 在所有元件中一致地使用實作模式
- 尊重專案結構和邊界
- 所有架構問題請參考本文檔

**首要實作優先級:**
使用以下指令初始化專案: `npm create @quick-start/electron . -- --template react`

### 架構驗證日誌 (Architecture Validation Log)

**2025-12-13 | v2.0.0-pre | Status: PASSED**

**驗證摘要:**
對 Fusion Pro Layout 與 v2.0.0-pre 代碼庫進行了全面的 Reality Check。實作與架構高度一致。

**正式化的架構決策:**

1.  **策略模式 (Strategy Pattern)**: 正式認可 `compressionStrategies.ts` 為處理多樣化 Ghostscript 參數的標準模式。這取代了原先較為僵化的配置想法。
2.  **UI 模組化**: 確認 `QueueItem` 與 `QueueList` 在新佈局中的可重用性，這驗證了我們對元件粒度的初步決策是正確的。

**待解決的架構項目 (Open Items):**

1.  **PDF 預覽渲染**: 需在下一階段決定具體技術 (pdf.js vs native)。
2.  **macOS 代碼簽名**: 需在發布管道中解決 `gs` 二進位檔的簽名問題。
