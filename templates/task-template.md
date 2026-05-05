# Task {NNN}: [標題]

> 狀態：not-started | in-progress | done | blocked
> Task：[NNN]
> 批次：[N]
> Agent：[agent-name]

---

## 基本資訊

| 欄位 | 值 |
|------|---|
| Task ID | task-{NNN} |
| 分支 | `hx/{slug}/t{NNN}` |
| Worktree | `.worktrees/{slug}/t{NNN}/` |
| 批次 | [N] |
| 負責 Agent | [agent-name] |
| 依賴 | [task-XXX (hard/soft) 或無] |
| 介面契約 | [提供/消費的介面] |

---

## 背景

[一句話說明這個 Task 要做什麼]

---

## 實作需求

### 功能描述

[具體描述要實作的功能，足够讓 agent 直接開始寫程式碼]

### 技術約束

- [約束 1]
- [約束 2]

### 介面契約

**提供**：
```
[API 或函式簽名]
```

**消費**：
```
[依賴的 API 或函式]
```

---

## Acceptance Criteria (AC)

> 每個 AC 必須是 Given/When/Then 格式，可自動化驗證

### AC-1: [標題]

**Given** [前置條件]
**When** [觸發動作]
**Then** [預期結果]

### AC-2: [標題]

**Given** [前置條件]
**When** [觸發動作]
**Then** [預期結果]

---

## 不在範圍內

[明確列出這個 Task 不做的事情，避免 agent 越界]

- [不做的事 1]
- [不做的事 2]

---

## 參考資料

- 相關 Spec：`spec.md §2.N`
- 既有程式碼：[路徑和簡要說明]
- Design Decisions：`decisions.md §D-NN`

---

## 驗收標準

- [ ] 所有 AC 都有對應的自動化測試
- [ ] 測試在實作前全部失敗（紅燈）
- [ ] 實作完成後所有測試通過（綠燈）
- [ ] Linter 無 error
- [ ] Worktree Contract 驗證通過（pwd + git branch 確認）