# Project Memory

> 單一專案的知識庫。記錄與當前專案相關的技術決策、架構模式、經驗教訓。

---

## 使用方式

此目錄由 Orchestrator 在每次專案結束時自動更新（透過 Phase 8: Update）。

## 內容結構

```
project/
├── decisions/          # 專案級的設計決策
├── patterns/           # 專案特有的程式碼模式
├── gotchas/           # 專案特有的坑
└── README.md          # 本檔案
```

## 維護原則

- 每個已完成的 feature 都應該有對應的 solution.md 沈澱到此
- 跨 feature 的通用模式移動到 domain/
- 真正的跨專案知識移動到 global/

## 清理原則

- 專案結束後，project/ 記憶可以被歸檔或刪除
- 如果記憶對未來相似專案有參考價值，提取到 domain/ 或 global/