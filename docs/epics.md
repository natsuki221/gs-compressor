---
stepsCompleted: [1, 2]
inputDocuments:
  [
    '/Users/lintzujeng/Documents/Coding/Javascript/github.com/natsuki221/gs-compressor/docs/prd.md',
    '/Users/lintzujeng/Documents/Coding/Javascript/github.com/natsuki221/gs-compressor/docs/architecture.md'
  ]
---

# gs-compressor - 史詩與故事拆解 (Epic Breakdown)

## 概述 (Overview)

本文檔提供了 gs-compressor 的完整史詩 (Epic) 和用戶故事 (User Story) 拆解，將 PRD、UX 設計（若存在）和架構文件中的需求轉化為可實作的故事。

## 需求清單 (Requirements Inventory)

### 功能性需求 (Functional Requirements)

**File Management (FM)**

- FR-FM-01: 用戶可以拖放 (Drag & Drop) 單個 PDF 檔案進入應用程式視窗。
- FR-FM-02: 用戶可以同時拖放多個 PDF 檔案 (批量處理)。
- FR-FM-03: 用戶可以檢視佇列中的檔案列表及其原始大小。
- FR-FM-04: 用戶可以清空檔案佇列以重新開始。
- FR-FM-05: 系統必須拒絕非 PDF 格式的檔案，並給予視覺提示 (例如震動或錯誤訊息)。

**Compression Core (CE)**

- FR-CE-01: 用戶可以選擇 "AI Mode" 以應用積極的優化設定 (針對 LLM Context Limits)。
- FR-CE-02: 用戶可以選擇 "Print Mode" 以應用排版忠實度優先的設定 (光柵化安全)。
- FR-CE-03: 用戶可以選擇 "Transfer Mode" 進行平衡壓縮 (預設)。
- FR-CE-04: 系統必須允許用戶在放入檔案後、開始壓縮前更改場景預設。
- FR-CE-05: 系統必須在沙盒 (sandboxed) 子程序中執行打包的 Ghostscript執行檔。
- FR-CE-06: 在 Print/Transfer 模式下，系統配置必須優先保證「零排版位移」而非最大壓縮率。

**App Experience (UX)**

- FR-UX-01: 在壓縮進行中，用戶可以看到「處理中」的進度指示器。
- FR-UX-02: 壓縮完成後，用戶可以立即看到「壓縮後」的檔案大小。
- FR-UX-03: 用戶可以看到縮減百分比 (例如 "-45%")。
- FR-UX-04: 用戶可以點擊「在 Finder 中顯示 (Reveal in Finder)」以定位檔案。
- FR-UX-05: 用戶可以看到「進階設定」開關 (UI 鷹架)，懸停時顯示 "Coming Soon" 提示。
- FR-UX-06: 當 GitHub 有新版本釋出時，用戶會收到 App 內的被動通知。

**System Integration (SI)**

- FR-SI-01: 用戶可以在 Finder 中右鍵點擊 PDF 檔案並選擇 "Open With > gs-compressor"。
- FR-SI-02: 透過 "Open With" 開啟時，系統必須快速啟動 (< 2s)。
- FR-SI-03: 應用程式必須在無須用戶額外安裝 Ghostscript 的情況下執行 (Bundled Logic)。

### 非功能性需求 (Non-Functional Requirements)

**Privacy & Security (SEC)**

- NFR-SEC-01 (Data Sovereignty): 應用程式必須在完全無網路連線的環境下運作，除更新檢查外，不得發起任何對外 HTTP/Socket 請求。
- NFR-SEC-02 (Local Execution): 所有的 PDF 處理 (Ghostscript 執行) 必須僅在用戶本機設備上進行。
- NFR-SEC-03 (Isolation): 子程序 (Child Process) 權限必須被嚴格限制，僅能讀寫用戶拖放的特定檔案路徑。

**Performance (PERF)**

- NFR-PERF-01 (Startup Time): 應用程式冷啟動 (Cold Boot) 時間應低於 2 秒 (在 M1 MacBook Air 基準下)。
- NFR-PERF-02 (Processing Speed): 單個標準文件 (< 10MB) 的壓縮處理時間應低於 5 秒。
- NFR-PERF-03 (UI Response): UI 互動必須在 100ms 內給予視覺反饋。

**Reliability (REL)**

- NFR-REL-01 (Stability Target): 在處理支援範圍內 (單檔 < 100MB) 的 PDF 時，崩潰率應控制在 < 5% 以內。
- NFR-REL-02 (Graceful Failure): 遇到無法處理的加密或損壞 PDF 時，必須顯示友善錯誤訊息。

**Compatibility (COMP)**

- NFR-COMP-01 (macOS Support): 必須支援 macOS 12 (Monterey) 及以上版本。
- NFR-COMP-02 (Architecture): 必須提供 Universal Binary (同時支援 Intel x64 與 Apple Silicon arm64)。

### 額外需求 (Additional Requirements)

**技術架構 (Technical Architecture)**

- **初始模板**: 必須使用 `npm create @quick-start/electron . -- --template react` 初始化。
- **Ghostscript 打包**: 二進位檔 (mac-x64, mac-arm64) 必須打包在 `resources/bin` 中，並透過 Node.js `spawn` 管理，需處理 `chmod +x` 權限。
- **前端堆疊**: React v19.2+, Radix UI (Primitives), TailwindCSS, Zustand (State Management)。
- **IPC 安全**: 使用 `contextBridge` 實施嚴格的 Context Isolation，採用 `invoke`/`handle` 模式，並共用 TypeScript 介面 (`src/shared/types.ts`)。
- **持久化**: 僅限記憶體 (In-Memory)，不使用硬碟資料庫 (No disk DB)。
- **建構系統**: 使用 `electron-vite` 進行建構與 HMR。

**使用者體驗 (User Experience - 推斷)**

- **拖放 (Drag & Drop)**: 支援原生作業系統檔案拖放區域。
- **視覺回饋**: 透過 IPC 事件進行即時進度更新。
- **通知**: 操作錯誤 (非致命) 使用 Toast 通知。
- **錯誤處理**: 致命系統錯誤 (例如二進位檔遺失) 使用 Modal/錯誤畫面。

### 功能需求覆蓋地圖 (FR Coverage Map)

| Requirement ID               | Covered By Epic                     |
| :--------------------------- | :---------------------------------- |
| FR-FM-01, FR-FM-02           | Epic-2: 檔案管理與佇列系統          |
| FR-FM-03, FR-FM-04           | Epic-2: 檔案管理與佇列系統          |
| FR-FM-05                     | Epic-2: 檔案管理與佇列系統          |
| FR-CE-01, FR-CE-02, FR-CE-03 | Epic-3: 壓縮核心功能                |
| FR-CE-04                     | Epic-3: 壓縮核心功能                |
| FR-CE-05, FR-CE-06           | Epic-3: 壓縮核心功能 (主程序)       |
| FR-UX-01, FR-UX-02, FR-UX-03 | Epic-4: 用戶體驗優化                |
| FR-UX-04, FR-UX-05, FR-UX-06 | Epic-4: 用戶體驗優化                |
| FR-SI-01, FR-SI-02           | Epic-5: 系統整合與發布              |
| FR-SI-03                     | Epic-1: 基礎架構與 Ghostscript 整合 |

## 史詩清單 (Epic List)

### Epic-1: 基礎架構與 Ghostscript 整合 (Infrastructure & Ghostscript Integration)

**目標**: 建立穩固的 Electron+React 基礎，並確保 Ghostscript 二進位檔在主程序中被正確管理與執行。這是專案的基石。

- **Story 1.1: 專案初始化與架構搭建**
  - **描述**: 使用 `electron-vite` 初始化專案，升級 React 至 v19.2+，並設定 TypeScript、ESLint 與 Prettier。
  - **驗收標準**:
    - 專案可成功執行 `npm run dev` 並顯示 React v19 歡迎畫面。
    - 目錄結構符合 `architecture.md` 定義 (features, shared, main/services 等)。
    - `electron-builder` 配置存在。
- **Story 1.2: Ghostscript 二進位檔打包**
  - **描述**: 下載並放置 macOS (x64 及 arm64) 的 `gs` 二進位檔至 `resources/bin`，並配置建構腳本以確保其包含在最終 App 中。
  - **驗收標準**:
    - `npm run build` 後產生的 .app 包內包含 `Contents/Resources/bin` 及 `gs` 檔案。
    - 開發模式下主程序可解析到 `resources/bin/mac-${arch}/gs` 路徑。
- **Story 1.3: 實作安全 IPC 橋接 (Secure IPC Bridge)**
  - **描述**: 設定 `preload/index.ts` 與 `main/ipc/handlers.ts`，建立符合 Context Isolation 的通訊管道。
  - **驗收標準**:
    - Renderer 無法直接存取 Node.js API。
    - 定義並實作了 `window.electronAPI` 介面。
    - 可以從 Renderer 發送 Ping 並從 Main 收到 Pong (測試用)。

### Epic-2: 檔案管理與佇列系統 (File Management & Queue System)

**目標**: 讓用戶能夠輕鬆將檔案帶入 App，並以清晰的 UI 管理待處理的檔案列表。

- **Story 2.1: 實作拖放區域 (Drag & Drop Zone)**
  - **描述**: 在 Renderer 層實作全視窗或指定區域的拖放監聽，解析拖入的檔案路徑。
  - **驗收標準**:
    - 拖放 PDF 檔案時，應用程式能取得檔案絕對路徑。
    - 拖放非 PDF 檔案時，顯示錯誤震動或 Toast 提示 (FR-FM-05)。
    - 支援同時拖放多個檔案。
- **Story 2.2: 檔案佇列列表 UI (File Queue UI)**
  - **描述**: 使用 Radix UI 建立檔案列表視圖，顯示檔名、原始大小與狀態 (待處理/處理中/完成)。
  - **驗收標準**:
    - 列表能正確渲染 Zustand Store 中的檔案資料。
    - 顯示檔案大小 (如 "1.2 MB")。
    - UI 響應迅速 (<100ms)。
- **Story 2.3: 佇列狀態管理 (Zustand Store)**
  - **描述**: 實作 `useQueueStore`，管理檔案物件陣列、當前選取的壓縮模式等狀態。
  - **驗收標準**:
    - 支援 `addFiles`, `removeFile`, `clearQueue` 操作。
    - 狀態變更時 UI 即時更新。
    - **隱私檢核**: 確保沒有將狀態寫入 localStorage 或硬碟。

### Epic-3: 壓縮核心功能 (Compression Core Features)

**目標**: 實作實際的壓縮邏輯，將 UI 意圖轉化為 Ghostscript 指令。

- **Story 3.1: Ghostscript 子程序管理器**
  - **描述**: 在 Main Process (`services/ghostscript.ts`) 實作 `spawn` 邏輯，呼叫 bundled `gs`。
  - **驗收標準**:
    - 能成功啟動 `gs` 並對指定 PDF 進行操作。
    - 能正確處理不同架構 (x64/arm64) 的二進位檔路徑。
    - 能捕獲 stdout/stderr 用於除錯日誌。
- **Story 3.2: 實作壓縮策略模式 (Compression Strategies)**
  - **描述**: 將 "AI Mode", "Print Mode", "Transfer Mode" 映射為具體的 `gs` 參數陣列。
  - **驗收標準**:
    - **AI Mode**: 使用 `dPDFSETTINGS=/screen` 或更激進參數，並將文字轉曲線 (若需)。
    - **Print Mode**: 使用 `dPDFSETTINGS=/prepress`，確保字型嵌入。
    - **Transfer Mode**: 使用 `dPDFSETTINGS=/ebook` (預設)。
- **Story 3.3: 壓縮任務執行與錯誤處理**
  - **描述**: 連接 IPC `compressFile` 請求到 Ghostscript 服務，處理成功與失敗案例。
  - **驗收標準**:
    - 成功壓縮後，回傳新檔案路徑與新大小。
    - 若 `gs` 退出代碼非 0，回傳明確錯誤訊息。
    - 若檔案加密或損毀，不導致 App 崩潰 (Graceful Failure)。

### Epic-4: 用戶體驗優化 (User Experience Optimization)

**目標**: 提供流暢、令人放心的互動體驗，解決「排版焦慮」。

- **Story 4.1: 進度回饋與結果顯示**
  - **描述**: 實作即時進度條 (若可行) 或「處理中」狀態，並在完成後顯示結果比較。
  - **驗收標準**:
    - 檔案處理時顯示 Spinner 或進度條。
    - 完成後顯示：原始大小 -> 壓縮後大小 (綠色縮減百分比)。
    - 包含 "Reveal in Finder" 按鈕，點擊後在 Finder 選取檔案。
- **Story 4.2: 未來功能 UI 鷹架 (Feature Scaffolding)**
  - **描述**: 實作「進階設定」開關的 UI，但在 MVP 階段將其設為唯讀或顯示 Tooltip。
  - **驗收標準**:
    - UI 包含 "Advanced Settings" 區塊。
    - 互動時顯示 "Coming Soon" 或類似提示，不阻礙核心流程。
- **Story 4.3: App 內通知系統**
  - **描述**: 實作 Toast Notification 系統，用於顯示非致命錯誤與更新通知。
  - **驗收標準**:
    - 使用 Radix UI Toast 組件。
    - 能從 Main Process 觸發通知 (透過 IPC)。
    - 實作被動更新檢查 (檢查 GitHub API，僅跳通知)。

### Epic-5: 系統整合與發布 (System Integration & Automated Release)

**目標**: 確保 App 像原生 macOS 應用程式一樣運作，並準備好發布。

- **Story 5.1: 系統整合 (Info.plist & Launch)**
  - **描述**: 配置 `electron-builder` 以註冊 PDF 檔案關聯，並優化啟動流程。
  - **驗收標準**:
    - 右鍵點擊 PDF -> Open With 列表出現 gs-compressor。
    - 透過 Open With 啟動時，App 能接收並處理該檔案。
    - 冷啟動時間在 M1 Mac 上 < 2秒。
- **Story 5.2: 最終建構與發布配置**
  - **描述**: 完成 `electron-builder.yml` 設定，生成最終的 `.dmg`。
  - **驗收標準**:
    - `.dmg` 安裝背景圖 (可選)。
    - 應用程式圖示 (Icon) 正確顯示。
    - 雖然是自簽名 (Self-signed)，但在本地信任後可正常執行沙盒化操作。
