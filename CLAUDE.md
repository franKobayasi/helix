# Project Context

本專案使用 **Helix** 框架進行 agent-driven 開發。

---

## Helix Framework

### 啟動方式

輸入 `/helix:dev <需求描述>` 即可啟動 Helix 開發流程，流程會自動推進。

| Command | 說明 |
|---------|------|
| `/helix:dev <需求>` | 觸發開發流程（自動推進） |
| `/helix:status` | 查看當前進度 |
| `/helix:resume` | 從斷點恢復 |
| `/helix:spec` | Spec 階段 |
| `/helix:plan` | Plan 階段 |
| `/helix:implement` | 實作階段 |
| `/helix:verify` | 整合驗證 |
| `/helix:review` | 程式碼審查 |

詳見 `/AGENT.md`。
