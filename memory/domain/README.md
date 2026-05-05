# Domain Memory

> 主題特定的模式庫。記錄某個技術領域或業務領域的通用知識，可跨專案複用。

---

## 使用方式

當某個領域的知識累積到一定程度時，應該从 project/ 中提取到這裡。

## 內容結構

```
domain/
├── frontend/          # 前端相關的模式（如 React 效能優化）
├── backend/           # 後端相關的模式（如 API 設計）
├── database/          # 資料庫相關的模式
├── auth/              # 認證/授權相關的模式
├── performance/       # 效能優化相關的模式
└── README.md          # 本檔案
```

## 主題分類建議

| 主題 | 內容範例 |
|------|---------|
| frontend | React/Vue 元件模式、狀態管理、效能優化 |
| backend | API 設計、錯誤處理、服務層結構 |
| database | Schema 設計、migration 策略、查詢優化 |
| auth | 認證流程、JWT 使用、授權模型 |
| testing | 測試策略、mock 技巧、TDD 流程 |

## 維護原則

- domain/ 記憶是永久性的，會隨時間累積
- 每個新專案應該先檢查 domain/ 看是否有相關模式
- 如果某個 pattern 被多個專案引用，應該提升到 domain/