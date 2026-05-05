# Plan: [功能名稱]

> 狀態：Draft | In Review | Final
> 版本：v1
> 最後更新：[日期]

---

## Task 清單

| Task | 標題 | 依賴 | 批次 | Agent | 分支 |
|------|------|------|------|-------|------|
| task-001 | [標題] | — | 1 | agent-a | hx/{slug}/t001 |
| task-002 | [標題] | — | 1 | agent-b | hx/{slug}/t002 |
| task-003 | [標題] | task-001 (soft) | 1 | agent-c | hx/{slug}/t003 |
| task-004 | [標題] | task-001 (hard), task-002 (hard) | 2 | agent-a | hx/{slug}/t004 |

---

## 依賴圖

```
task-001 ──soft──▶ task-003
    │
    │hard
    ▼
task-004 ◀──hard── task-002
```

---

## 介面契約

列出 Task 之間共享的介面定義，確保並行開發時各方對齊。

### Shared Types

```typescript
// 共用的型別定義
interface User {
  id: string
  email: string
  name: string
}

interface CreateUserRequest {
  email: string
  name: string
}
```

### API Contracts

| Task | 提供 | 消費 |
|------|------|------|
| task-001 | `POST /api/users` | — |
| task-002 | — | `POST /api/users` |
| task-003 | `GET /api/users/:id` | `POST /api/users` |

---

## 執行批次

- **Batch 1**（並行）：task-001, task-002, task-003
- **Batch 2**（等待 Batch 1）：task-004

---

## Decisions Made

| 編號 | 決策 | 理由 |
|------|------|------|
| D-001 | [決策內容] | [為什麼這樣做] |

---

## 執行順序說明

[說明為什麼這樣安排批次和依賴]

---

## Spec 追溯表

| Spec 功能點 | 承接 Task | 說明 |
|------------|----------|------|
| [功能點 1] | task-001 | [如何承接] |
| [功能點 2] | task-002 | [如何承接] |