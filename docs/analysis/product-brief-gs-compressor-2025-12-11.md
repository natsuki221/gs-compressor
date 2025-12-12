stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments:

- '/Users/lintzujeng/Documents/Coding/Javascript/github.com/natsuki221/gs-compressor/original_design/ui/code.html'
- '/Users/lintzujeng/Documents/Coding/Javascript/github.com/natsuki221/gs-compressor/original_design/ui/screen.png'
  workflowType: 'product-brief'
  lastStep: 5
  project_name: 'gs-compressor'
  user_name: 'natsuki'
  date: '2025-12-11'

---

# Product Brief: gs-compressor

**Date:** 2025-12-11
**Author:** natsuki

---

## Executive Summary

gs-compressor (PDF Compressor Pro) 是一個專為學生、個人開發者及注重隱私的用戶設計的**離線優先 (Offline-First)** PDF 批量壓縮工具。

不同於市面上充斥廣告且有隱私疑慮的線上工具，我們提供一個安全、免費且無需上傳檔案的本地解決方案。產品核心特色在於**「場景導向 (Scenario-Based)」的智慧壓縮策略**，針對現代工作流（如上傳 AI 模型、老舊印表機列印、弱網環境傳輸）提供一鍵優化的設定檔，同時為進階用戶保留完整的參數控制權。

---

## Core Vision

### Problem Statement

用戶在處理大型 PDF 文件時，常因檔案過大而面臨「傳輸失敗」或「處理緩慢」的挫折，特別是在三個關鍵場景：

1.  **AI 協作受阻**：檔案超過 LLM (如 ChatGPT/Claude) 的 Context Window 或上傳限制。
2.  **硬體設備限制**：檔案過大導致辦公室老舊印表機無法處理（記憶體不足）。
3.  **網路環境受限**：在網速較慢的環境下，大檔傳輸極度耗時。

此外，現有的線上免費工具往往強迫用戶將機密文件上傳至雲端伺服器，引發嚴重的**隱私安全隱憂**。

### Problem Impact

- **工作效率低落**：用戶被迫花時間尋找替代工具或手動分割檔案。
- **隱私風險**：被迫將合約、財報或個人作品集上傳至不可信的第三方伺服器。
- **協作中斷**：無法順利使用 AI 輔助工作，或無法即時列印重要文件。

### Why Existing Solutions Fall Short

- **線上工具 (Online Converters)**：隱私風險高、受網速限制、有檔案數量或大小上限。
- **傳統付費軟體 (Acrobat etc.)**：價格昂貴、功能臃腫且啟動緩慢，對學生和個人開發者負擔過重。
- **現有開源工具**：介面簡陋 (CLI 為主)，參數設定過於技術性 (如 DPI/Quality)，缺乏對現代場景（如 AI）的針對性優化。

### Proposed Solution

打造一款**「隱私至上、場景驅動」的現代化桌面壓縮工具**：

1.  **純本地運作**：所有處理皆在本地完成，確保數據絕對安全（隱私 100%）。
2.  **場景化一鍵優化**：
    - **AI 模式**：極致壓縮文字層，優化 Token 佔用，確保 LLM 可讀取。
    - **列印模式**：優化光柵化內容，相容低記憶體印表機。
    - **傳輸模式**：平衡畫質與大小，適合 Email/IM 傳輸。
3.  **漸進式揭露 (Progressive Disclosure)**：預設提供簡單的場景選項，進階參數（DPI, 壓縮率, Metadata）收納於折疊選單中，滿足專家需求。

### Key Differentiators

1.  **隱私安全性 (Privacy & Security)**：完全離線可用，是處理敏感資料的唯一選擇。
2.  **場景導向設計 (Scenario-First UX)**：直接解決「為什麼要壓縮」的問題，而非只提供冷冰冰的參數。
3.  **免費與開源友好**：專注服務學生與個人開發者社群，無浮水印、無廣告。

---

## Target Users

### Primary Users: The High-Stakes Submitter (Student/Job Seeker)

- **Persona Name**: Alex (22歲, 應屆畢業生/設計系學生)
- **Context**: 正處於水深火熱的畢業季或求職期，手上有精心排版後的論文 (PDF) 或設計作品集 (Portfolio)。
- **Motivation**: 必須將這些檔案上傳到學校系統或求職網站，但這些系統往往有嚴格的檔案大小限制 (如 < 5MB)。
- **Core Pain Point**: **「排版焦慮」**。非常恐懼壓縮軟體會弄亂原本完美的排版（圖片位移、字型跑掉、邊距改變）。這對 Alex 來說是**絕對不可接受**的，比壓縮率不夠好還嚴重。
- **Success Vision**: 檔案成功縮小到限制內，打開檢查時，**每一頁看起來都跟原本一模一樣**。

### Secondary Users: The Privacy-Conscious Developer

- **Persona Name**: Sam (28歲, 全端工程師/開源愛好者)
- **Context**: 經常需要處理包含敏感資訊的技術文件，或者是單純欣賞高品質的開源軟體。
- **Motivation**: 尋找一個乾淨、快速、且**程式碼寫得好**的工具。可能會因為這個專案是開源的且架構漂亮而使用，甚至貢獻程式碼。
- **Core Pain Point**: 討厭為了做一件簡單的事（壓縮）而去使用充滿廣告或需要上傳檔案的線上服務。

### User Journey

1.  **Discovery**: 在 GitHub Trending 或技術論壇看到 "gs-compressor" 的介紹，被「離線優先」與「排版無損」的承諾吸引。
2.  **Onboarding**: 下載後直接打開 (No Installation/Portable 偏好)，介面乾淨無廣告。
3.  **Core Interaction**:
    - 拖放 (Drag & Drop) 一份 50MB 的作品集 PDF。
    - 選擇「AI 上傳模式」或「傳輸模式」。
    - **關鍵時刻**: 透過預覽功能 (Preview) 快速檢查，確認排版沒有跑掉。
4.  **Success Moment**: 按下壓縮，看到檔案變成 4.8MB，且打開後排版完美無缺。
5.  **Long-term**: 成為電腦中的常駐工具，並將此 GitHub Repo 加入 Star。

---

## Success Metrics

### User Success Indicators

最核心的成功指標只有一個：**「信任 (Trust)」**。
當用戶在趕時間時，敢毫不猶豫地把最重要的檔案拖進 gs-compressor，並且**不打開預覽就直接用**，這就是我們追求的極致成功。

具體展現為：

1.  **Zero "Layout Anxiety"**: 用戶不再擔心排版跑掉。
2.  **Task Completion Speed**: 從打開軟體到獲得壓縮檔，流程極度流暢，沒有多餘的干擾。

### Business Objectives (Project Goals)

作為一個作品集與開源專案，我們的目標是展現**高品質的軟體工藝**：

1.  **Organic Growth**: 依靠用戶口耳相傳而來的自然成長。
2.  **Community Reputation**: 在開發者社群中建立「高品質、純粹、好用」的口碑。

### Key Performance Indicators (KPIs)

既然是開源專案，我們關注以下幾個反映「品質」與「喜愛」的指標：

- **GitHub Stars & Forks**: 作為社群認可度與程式碼品質的直接反饋。
- **Retention (Long-term Install)**: 用戶下載後沒有刪除，而是成為電腦裡的常駐工具。
- **Positive Feedback Loop**: Issues 區多為功能許願或改進建議，而非嚴重的 Crash 或排版錯誤回報。

---

## MVP Scope

### Core Features (The "Must-Haves")

1.  **Smart Batch Engine (核心引擎)**
    - 整合 Ghostscript 技術，支援**批量 (Batch)** 導入與處理 PDF。
    - 確保 "Layout Fidelity"（排版忠實度），這是我們的核心承諾。
    - **離線優先**：所有運算皆在本地完成。

2.  **Scenario-Based Presets (場景化預設)**
    - **AI Mode**: 針對 Context Window 優化 (極致壓縮文字/向量)。
    - **Print Mode**: 針對列印優化 (光柵化處理/色彩空間)。
    - **Transfer Mode**: 一般傳輸平衡模式。

3.  **Trust-Building UI**
    - **Progressive Disclosure**: 將 DPI、壓縮率等複雜參數收納於 "Advanced" 區域。
    - **Size Preview**: 明確顯示壓縮前後的大小差異與壓縮比 (例如 "-65%")。

### Out of Scope for MVP (The "Nice-to-Haves")

- **PDF 編輯/轉檔功能**：如 PDF 轉圖片、合併 PDF、浮水印添加、OCR。我們專注於「壓縮」。
- **雲端備份/同步**：保持純粹的本地工具定位。
- **複雜的色彩管理 (ICC Profiles)**：MVP 先以 SRGB/Grayscale 為主。

### MVP Success Criteria

- **功能驗證**：用戶能成功拖入 10 個文件並一次完成壓縮，且無 Crash。
- **品質驗證**：AI Mode 產出的檔案能成功上傳至主流 LLM (Claude/ChatGPT) 且內容可被正確讀取。

### Future Vision

從一個單純的壓縮工具，演變成 **"The Swiss Army Knife for Local PDF Workflow"**。
未來可能加入更多「場景化」功能，例如「為 Kindle 優化」、「為 E-ink 平板優化」等，始終保持離線與隱私的初衷。

<!-- Content will be appended sequentially through collaborative workflow steps -->
