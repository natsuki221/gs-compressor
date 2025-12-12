```
---
stepsCompleted: [1, 2, 3, 4, 6, 7, 8, 9, 10, 11]
inputDocuments:
  - '/Users/lintzujeng/Documents/Coding/Javascript/github.com/natsuki221/gs-compressor/docs/analysis/product-brief-gs-compressor-2025-12-11.md'
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 0
workflowType: 'prd'
lastStep: 11
project_name: 'gs-compressor'
user_name: 'natsuki'
date: '2025-12-11'

# 產品需求文件 (PRD) - gs-compressor

**作者:** natsuki
**日期:** 2025-12-11

## 執行摘要 (Executive Summary)

gs-compressor 是一個專為注重隱私的用戶設計的 **「離線優先 (Offline-First)、場景導向 (Scenario-Based)」PDF 壓縮工具**，並堅持專業級的排版忠實度。不同於用隱私換取便利的線上轉檔工具，或是犧牲易用性換取強大功能的 CLI 工具，gs-compressor 透過現代化的拖放介面與安全的本地端應用程式，填補了這兩者之間的空白。

我們的核心承諾是 **「零排版位移 (Zero Layout Shift)」**。我們解決了學生和專業人士的特定焦慮：需要縮減檔案大小以符合上傳限制（例如 AI Context Window, 求職網站），但絕對無法承受精心設計的文件在視覺上被篡改。

### 產品特色 (What Makes This Special)

1.  **零排版位移 (Zero Layout Shift)**: 一項硬性的技術保證，確保壓縮後文件的視覺呈現保持完全一致，必要時優先考慮忠實度而非單純的位元組縮減。
2.  **場景導向預設 (Scenario-Based Presets)**: 我們不詢問用戶技術參數 (DPI/Quality)，而是詢問意圖（例如「AI 準備」、「列印優化」、「Email 傳輸」），並自動應用針對該特定用例的最佳 Ghostscript 配置。
3.  **離線隱私 (Offline Privacy)**: 對隱私疑慮的終極回應。沒有任何檔案會離開用戶的電腦，使其能夠安全地處理財務文件、法律合約和未發布的創意作品。

## 專案分類 (Project Classification)

**技術類型:** Desktop App (桌面應用程式)
**領域:** General Utility / Productivity (一般工具 / 生產力)
**複雜度:** Medium (中等)
**專案背景:** Greenfield (全新專案)

**分類理由:**
本專案是一個專注於本地檔案操作的原生桌面應用程式。雖然領域屬於一般生產力工具，但由於對「排版忠實度」的嚴格要求，需要對底層 Ghostscript 引擎進行精確控制並確保跨平台一致性，因此複雜度被歸類為「中等 (Medium)」。它不完全屬於醫療或金融等高監管領域，但在資料隱私和完整性方面具有「高」重要性。

## 成功標準 (Success Criteria)

### 用戶成功指標 (User Success)

*   **零「排版焦慮」 (Zero "Layout Anxiety")**: 用戶在使用幾次後，信任工具到足以跳過「預覽驗證」步驟。
*   **任務效率 (Task Efficiency)**: 目標線性處理速度為 **每標準檔案 ~5 秒** (例如 5 個檔案約 25 秒)。
*   **無摩擦流程 (Frictionless Flow)**: 「拖放 -> 點擊 -> 完成」的工作流，沒有繁瑣的配置疲勞。

### 商業成功指標 (專案目標)

*   *MVP 階段僅關注定性指標*: 專注於建立品質和隱私的聲譽。
*   **社群信任 (Community Trust)**: GitHub Issues 中的正向互動（建設性反饋 vs 憤怒的 Bug 回報）。

### 技術成功指標 (Technical Success)

*   **處理可靠性**: > 95% 成功率 (允許 < 5% 的失敗率，針對格式錯誤/加密的 PDF)。
*   **穩定性邊界**:
    *   支援單檔最大 **100MB**。
    *   支援批量處理總大小最大 **500MB**。
*   **崩潰容忍度 (Crash Tolerance)**: 在支援的檔案類型和大小限制內零崩潰。針對不支援的檔案進行優雅的錯誤處理。

### 可衡量成果 (Measurable Outcomes)

*   **速度基準**: 標準 PDF (< 10MB) 在一般硬體 (如 MacBook Air M1) 上處理時間低於 5 秒。
*   **體積縮減**: AI 模式對純文字重的文件能達到顯著縮減 (目標 > 50%)。

## 產品範疇 (Product Scope)

### MVP - 最簡可行產品 (Minimum Viable Product)

*   **核心引擎**: 基於 Ghostscript 的本地壓縮。
*   **批量處理**: 支援拖放多個檔案 (總計上限 500MB)。
*   **場景預設**: AI (AI 模式)、Print (列印模式)、Transfer (傳輸模式)。
*   **預覽 UI**: 簡單的「壓縮前/後」大小比較。
*   **更新機制**: **App 內通知** (檢查新版本並連結至 GitHub Release；無自動安裝)。

### 成長功能 (Post-MVP)

*   **自動更新器 (Auto-Updater)**: 一鍵下載並安裝 (需要 Code Signing)。
*   **進階引擎**: 自訂 Ghostscript 參數編輯器。
*   **格式擴充**: 圖片轉 PDF、合併 PDF。
*   **OS 整合**: 右鍵選單 / 原生分享清單 (Native Share Sheet)。

### 願景 (Future)

成為本地 PDF 工作流各的可靠「瑞士刀」，未來可能擴展至 E-ink 優化和檔案標準 (PDF/A)。

## 用戶旅程 (User Journeys)

### Journey 1: Alex 與「上傳被拒」的危機 (The High-Stakes Submitter)
**用戶目標:** 上傳一份視覺內容豐富的論文 PDF 到 ChatGPT 進行校對。
**痛點:** 檔案高達 45MB；ChatGPT 限制 20MB。之前的工具破壞了他的排版。

凌晨 2 點，Alex 精疲力竭，但需要將他的最終設計論文上傳到 ChatGPT 進行邏輯檢查。檔案有 45MB。他試了一個免費的線上壓縮工具，但輸出的檔案讓他精心對齊的 InDesign 圖表發生了位移。恐慌隨之而來。他在 Reddit 搜尋 "lossless PDF compressor" 並發現了 gs-compressor。

他打開 App (無需安裝)。他把論文拖進去。他看到 **"AI Mode"** 並選擇了它，希望它能理解他的需求。他點擊「壓縮」。檔案降到了 6MB (-85%). 他緊張地屏住呼吸，點擊「預覽」。**字體清晰，圖表位置完全正確。** 他鬆了一口氣。他成功上傳到 ChatGPT 並獲得了回饋。他將這個 App 固定在 Dock 上。

### Journey 2: Sam 與資安審計 (The Privacy-Conscious Developer)
**用戶目標:** 壓縮稅務文件以申請房貸。
**痛點:** 拒絕將財務資料上傳到 *任何* 雲端服務。

Sam 需要透過 Email 將報稅單寄給經紀人，但掃描的 PDF 太大。她絕對不會把包含身分證字號的資料上傳到 "free-pdf-tool.com"。她在 GitHub 上發現了 gs-compressor。她欣賞乾淨的 Readme 和 "Offline-First" 標章。

為了驗證，她在打開 App 前甚至 **切斷了 Wifi**。她將敏感文件拖入。App 沒有抱怨連線錯誤。她選擇 **"Transfer Mode"**。使用過程是瞬間完成的。她習慣性地檢查網路監控——**零對外請求**。她充滿信心地寄出 Email，並給了這個儲存庫一顆星，以尊重這個真正尊重她資料的工具。

### Journey 3: Linda 與辦公室英雄 (The Digital Archivist)
**用戶目標:** 數位化並列印 50 份掃描的法律合約。
**痛點:** 辦公室的老舊印表機在處理大檔時會崩潰 (記憶體錯誤)。

Linda 正在掃描 10 年份的合約。掃描器產生了巨大且未優化的 PDF。當她試圖列印一批存檔時，辦公室印表機不斷卡住並顯示「記憶體不足」。她的老闆開始不耐煩了。

她想起了 IT 實習生安裝的工具。她選取所有 50 個檔案並拖入 gs-compressor。她選擇 **"Print Mode"** (她假設這能修復列印問題)。App 飛快地處理：*Compressing 1/50... 50/50 Done*。她將新批次傳送到印表機。印表機立即開始列印，沒有卡紙。她省下了數小時的挫折，在老闆眼中就像個科技魔法師。

### 用戶旅程需求摘要 (User Journey Requirements Summary)

這些旅程驗證了特定的功能需求：

*   **排版忠實度至關重要 (Layout Fidelity)**: (Alex) 壓縮引擎在預設模式下必須優先考慮視覺排版，而非最大壓縮率。
*   **離線驗證 (Offline Verification)**: (Sam) App 必須在完全無網路的情況下 100% 運作，且沒有會阻礙使用的「連線回報」遙測。
*   **批量與穩定性 (Batch & Stability)**: (Linda) UI 必須支援批量選取 (拖放多個檔案)，且引擎必須夠穩定，能連續處理 50+ 個檔案而不崩潰。
*   **場景預設 (Scenario Presets)**: UI 需要清晰、非技術性的標籤 (AI Mode, Print Mode)，從而對應到底層複雜的 Ghostscript 設定。

## 創新與獨特模式 (Innovation & Novel Patterns)

### 偵測到的創新領域 (Detected Innovation Areas)

1.  **意圖優先介面 (Intent-First Interface) (UX 創新)**
    *   **概念**: 透過將技術參數 (DPI, Downsampling) 抽象化為 *用戶意圖* (AI 上傳, 列印, Email)，徹底簡化 PDF 壓縮。
    *   **獨特性**: 大多數工具暴露的是 *機制* (低/中/高品質)。我們暴露的是 *目標*。「AI 模式」是一個針對將文件放入 LLM Context Window 的新興需求而設計的具體創新，這是目前傳統工具所缺乏的。

2.  **信任優先架構 (Trust-First Architecture)**
    *   **概念**: 將「僅離線 (Offline-Only)」和「零排版位移」不僅定位為功能，而是做為主要的產品識別。
    *   **獨特性**: 挑戰主流 SaaS 模式中「免費」等於「收割用戶資料」的現狀。我們將隱私這個通常是「Pro」版的功能平民化。

### 市場脈絡與競爭版圖

*   **vs. 線上轉檔器 (TinyPDF, iLovePDF)**: 它們勝在便利，但敗在隱私和排版信任。我們提供同樣的便利 (Drag & Drop) 但 **0% 隱私風險**。
*   **vs. 專業軟體 (Acrobat)**: 它們功能強大但昂貴且臃腫。我們將特定的「壓縮」功能解構出來。
*   **vs. CLI 工具 (Ghostscript)**: 我們提供 Ghostscript 的強大功能，但無需陡峭的 CLI 學習曲線。

### 驗證方法 (Validation Approach)

*   **「祖母測試」**: 一個沒有技術背景的用戶能否在不詢問「什麼是 DPI？」的情況下成功壓縮檔案以供列印？
*   **「LLM 測試」**: 「AI 模式」是否能穩定產出 Claude/ChatGPT 可以接受並正確解析的檔案，而標準壓縮可能會導致文字識別率下降？

### 風險緩解 (Risk Mitigation)

*   **風險**: 「AI 模式」可能會過度壓縮圖片，導致人類閱讀時模糊。
*   **備案**: 清晰的「場景標籤」以設定預期——如果用戶想要漂亮的圖片，就不應選擇 AI 模式。

## 桌面應用程式需求 (Desktop App Specific Requirements)

### 專案類型概覽
gs-compressor 是一個基於現代 Web 技術 (Electron) 建構的原生 **macOS 桌面應用程式**。它優先考慮「零配置 (Zero Configuration)」，透過打包必要的依賴項，確保下載後立即可以使用。

### 技術架構考量 (Technical Architecture Considerations)

*   **核心堆疊 (Core Stack)**:
    *   **Runtime**: Electron (Main/Renderer process 架構)
    *   **Frontend**: React + Vite (Fast HMR & 易於構建)
    *   **UI Library**: **Radix UI** (Headless, 無障礙基礎元件) + TailwindCSS (假定用於 Radix 樣式)
    *   **State Management**: Zustand 或 React Context (輕量級本地狀態)

*   **引擎整合 (Portable 策略)**:
    *   **Ghostscript Binary**: 針對 macOS (Intel/Apple Silicon) 的預編譯執行檔 **直接打包在 App 資源內** (`extraResources`).
    *   **執行**: Main Process 根據選擇的場景預設值 (Scenario Preset) 生成特定的 `gs` 子程序 (child process)。
    *   **安全性**: `gs` 的執行受到嚴格沙盒限制；僅允許對用戶選擇的路徑進行輸入/輸出。

### 實作考量 (Implementation Considerations)

*   **系統整合**:
    *   **"Open With" (右鍵開啟)**: 在 `Info.plist` 中註冊 App 為 `.pdf` 檔案的處理程式，允許用戶在 Finder 中右鍵點擊檔案並選擇 "Open with gs-compressor"。
    *   **Drag & Drop**: 原生 OS 檔案拖放區域支援。

*   **平台特性 (macOS MVP)**:
    *   **Universal Binary**: 建構目標同時包含 `x64` 和 `arm64` (Apple Silicon)。
    *   **Code Signing**: 需要簽名以進行本地執行而無 macOS 安全警告 (Gatekeeper)。*MVP 開發模式下使用 Self-signed，但需為公證 (notarization) 結構做準備。*

*   **效能目標**:
    *   **啟動時間**: < 2 秒 (冷啟動)。
    *   **記憶體佔用**: 閒置狀態 < 100MB (積極的 Renderer 清理)。

## 專案範疇與分階段開發 (Project Scoping & Phased Development)

### MVP 策略與理念

**MVP 方法 (Approach):** **體驗優先 MVP (Experience MVP)**
我們優先考慮核心「拖放 -> 壓縮 -> 信任」循環的精緻、無崩潰體驗，而不是廣泛的功能集。目標是如此有效地解決「排版焦慮」，讓用戶成為推廣者。

**UI 設計理念:** **"Future-Ready" 鷹架 (Scaffolding)**
即使進階功能在 MVP 功能範圍之外，**UI 佈局將被設計為能容納它們**。
*   *例子:* 佈局將支援分割視圖 (split-view，用於未來的視覺差異比對)，最初用於檔案列表 vs 詳細資訊。
*   *例子:* 「進階設定」開關將會存在，但會被嚴格限制或禁用，並帶有「Coming Soon」提示，以保留路線圖的可見性。

### MVP 功能集 (Phase 1) - 「值得信賴的核心」

**必須具備的能力 (Must-Have Capabilities):**
1.  **核心引擎**: 透過可靠的子程序管理，整合 Bundled Ghostscript binary (macOS)。
2.  **批量工作流**: 支援 50+ 檔案的拖放；順序處理佇列。
3.  **場景預設**:
    *   **AI Mode**: 積極的文字/向量優化。
    *   **Print Mode**: 專注於光柵化/相容性。
    *   **Transfer Mode**: 平衡的預設值。
4.  **信任信號**:
    *   簡單的「前 -> 後」大小顯示 (文字)。
    *   清晰的成功/失敗通知。
5.  **發布**: 簽名的 `.dmg`/`.app` (Ad-hoc 簽名) 附帶安裝說明。

### Post-MVP 功能 (Roadmap)

**Phase 2 (成長與進階用戶):**
*   **進階模式實作**: 解鎖 UI 開關，允許自訂 DPI/Downsampling 能力。
*   **Windows 移植**: 將 Electron App 打包給 Windows。
*   **自動更新器**: 與 GitHub Releases 完整整合，實現一鍵更新。

**Phase 3 (視覺與擴充):**
*   **視覺預覽**: 實作實際的 PDF 渲染，進行並排視覺比較 (填補 UI 佔位符)。
*   **格式擴充**: 圖片轉 PDF 轉換。

### 風險緩解策略

*   **技術風險 (App 體積)**: 打包 Ghostscript 會增加 App 體積。*緩解:* 我們接受這個權衡以換取 "Zero Config" UX。我們將剝離未使用的 GS binaries/docs 以最小化膨脹。
*   **市場風險 (信任)**: 用戶可能不信任新工具。*緩解:* 「僅離線 (Offline-Only)」品牌 + 開源透明度是我們的主要信任錨點。
*   **範疇風險 (功能蔓延)**: 想要添加「再一個設定就好」。*緩解:* 嚴格遵守 MVP 僅限「場景導向」預設。如果它不是 3 個場景之一，就等到 Phase 2。

## 功能需求 (Functional Requirements)

### 1. 檔案管理與批量操作 (File Management)
*   **FR-FM-01**: 用戶可以拖放 (Drag & Drop) 單個 PDF 檔案進入應用程式視窗。
*   **FR-FM-02**: 用戶可以同時拖放多個 PDF 檔案 (批量處理)。
*   **FR-FM-03**: 用戶可以檢視佇列中的檔案列表及其原始大小。
*   **FR-FM-04**: 用戶可以清空檔案佇列以重新開始。
*   **FR-FM-05**: 系統必須拒絕非 PDF 格式的檔案，並給予視覺提示 (例如震動或錯誤訊息)。

### 2. 壓縮引擎與預設場景 (Compression Core)
*   **FR-CE-01**: 用戶可以選擇 **"AI Mode"** 以應用積極的優化設定 (針對 LLM Context Limits)。
*   **FR-CE-02**: 用戶可以選擇 **"Print Mode"** 以應用排版忠實度優先的設定 (光柵化安全)。
*   **FR-CE-03**: 用戶可以選擇 **"Transfer Mode"** 進行平衡壓縮 (預設)。
*   **FR-CE-04**: 系統必須允許用戶在放入檔案後、開始壓縮前更改場景預設。
*   **FR-CE-05**: 系統必須在沙盒 (sandboxed) 子程序中執行打包的 Ghostscript執行檔。
*   **FR-CE-06**: 在 Print/Transfer 模式下，系統配置必須優先保證「零排版位移」而非最大壓縮率。

### 3. App 體驗與信任信號 (App Experience)
*   **FR-UX-01**: 在壓縮進行中，用戶可以看到「處理中」的進度指示器。
*   **FR-UX-02**: 壓縮完成後，用戶可以立即看到「壓縮後」的檔案大小。
*   **FR-UX-03**: 用戶可以看到縮減百分比 (例如 "-45%")。
*   **FR-UX-04**: 用戶可以點擊「在 Finder 中顯示 (Reveal in Finder)」以定位檔案。
*   **FR-UX-05**: 用戶可以看到 **「進階設定」** 開關 (UI 鷹架)，懸停時顯示 "Coming Soon" 提示。
*   **FR-UX-06**: 當 GitHub 有新版本釋出時，用戶會收到 App 內的被動通知。

### 4. 系統整合 (System Integration - macOS)
*   **FR-SI-01**: 用戶可以在 Finder 中右鍵點擊 PDF 檔案並選擇 "Open With > gs-compressor"。
*   **FR-SI-02**: 透過 "Open With" 開啟時，系統必須快速啟動 (< 2s)。
*   **FR-SI-03**: 應用程式必須在無須用戶額外安裝 Ghostscript 的情況下執行 (Bundled Logic)。

## 非功能性需求 (Non-Functional Requirements)

### 1. 隱私與安全性 (Privacy & Security)
*   **NFR-SEC-01 (Data Sovereignty)**: 應用程式必須在完全無網路連線的環境下運作，除更新檢查 (如果是被動觸發) 外，不得發起任何對外 HTTP/Socket 請求。
*   **NFR-SEC-02 (Local Execution)**: 所有的 PDF 處理 (Ghostscript 執行) 必須僅在用戶本機設備上進行，嚴禁將文件資料上傳至任何伺服器。
*   **NFR-SEC-03 (Isolation)**: 子程序 (Child Process) 權限必須被嚴格限制，僅能讀寫用戶拖放的特定檔案路徑。

### 2. 效能 (Performance)
*   **NFR-PERF-01 (Startup Time)**: 應用程式冷啟動 (Cold Boot) 時間應低於 **2 秒** (在 M1 MacBook Air 基準下)。
*   **NFR-PERF-02 (Processing Speed)**: 單個標準文件 (< 10MB) 的壓縮處理時間應低於 **5 秒**。
*   **NFR-PERF-03 (UI Response)**: UI 互動 (按鈕點擊、拖放響應) 必須在 **100ms** 內給予視覺反饋，避免介面凍結感。

### 3. 可靠性 (Reliability)
*   **NFR-REL-01 (Stability Target)**: 在處理支援範圍內 (單檔 < 100MB) 的 PDF 時，崩潰率 (Crash Rate) 應控制在 **< 5%** 以內 (容許偶發性的底層引擎錯誤)。
*   **NFR-REL-02 (Graceful Failure)**: 遇到無法處理的加密或損壞 PDF 時，必須顯示友善錯誤訊息，而不能導致 App 閃退。

### 4. 平台相容性 (Compatibility)
*   **NFR-COMP-01 (macOS Support)**: 必須支援 macOS 12 (Monterey) 及以上版本。
*   **NFR-COMP-02 (Architecture)**: 必須提供 Universal Binary (同時支援 Intel x64 與 Apple Silicon arm64)。


```
