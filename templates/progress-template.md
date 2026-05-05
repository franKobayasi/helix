---
feature: "[功能名稱]"
started: "YYYY-MM-DD"
last_updated: "YYYY-MM-DDTHH:MM"
current_phase: 1
current_step: "phase1.scope-classified"
status: "in-progress"
output_dir: ".helix-dev/.spec/{folder-name}"
scope:
  classification: "Lightweight | Standard | Deep"
  score: 0
  factors:
    files: { score: 0, reason: "" }
    ambiguity: { score: 0, reason: "" }
    risk: { score: 0, reason: "" }
    novelty: { score: 0, reason: "" }
    dependencies: { score: 0, reason: "" }
  pipeline: ["phase1", "phase2", "phase3", "phase4", "phase5"]
---

# Progress: [功能名稱]

---

## Phase 1: Spec

| 欄位 | 值 |
|------|---|
| 狀態 | not-started |
| Scope Classification（Step 0b） | 未執行 / Lightweight / Standard / Deep（score: N/10） |
| Segment 1 確認（問題+使用者） | 未確認 / 已確認（U-{N}.1） |
| Segment 2 確認（成功定義） | 未確認 / 已確認（U-{N}.2） |
| Segment 3 確認（邊界+釐清記錄） | 未確認 / 已確認（U-{N}.3） |
| 需求理解確認輪次 | 0 |
| Step 1a completeness | — % |
| Step 1a 釐清問題數 | 0 |
| 迭代（Stage B 對抗式迴圈） | 0/3 |
| 當前步驟 | — |
| Pass 1 Coverage Review | 未執行 / ✅ PASS / ❌ FAIL |
| Pass 1 Gherkin Gate | 未執行 / ✅ PASS / ❌ FAIL |
| Pass 2 Design Review | 未執行 / ⏭ 跳過 / ✅ PASS / ❌ FAIL |
| Pass 2 YAGNI 審查 | 未執行 / ✅ 無過度設計 / ⚠ N 項 warning |
| Devil's Advocate Pass | 未執行 / ✅ PASS / ⚠ 補 spec |
| 產出物 | — |
| 阻塞 | — |

### 迭代記錄

---

## Phase 2: Plan

| 欄位 | 值 |
|------|---|
| 狀態 | not-started |
| 迭代 | 0/2 |
| 當前步驟 | — |
| 產出物 | — |
| 阻塞 | — |

### 迭代記錄

---

## Phase 3: Implement

| 欄位 | 值 |
|------|---|
| 狀態 | not-started |
| 當前批次 | — |
| 整合分支（主 repo 工作分支） | — |
| 主 repo 原始分支（流程啟動前） | — |
| worktree 根目錄 | `.worktrees/{slug}/` |

### Task 狀態

| Task | 標題 | 批次 | Agent | TDD | 實作 | QA | QA 輪次 | 分支 | worktree | 狀態 |
|------|------|------|-------|-----|------|----|---------|------|----------|------|

### Task 備註

---

## Phase 4: Integration Verify

| 欄位 | 值 |
|------|---|
| 狀態 | not-started |
| 修復輪次 | 0/2 |
| 煙霧測試 | — |
| Spec 追溯 | — |
| 整合測試 | — |
| 回歸測試 | — |

---

## Phase 5: Review & Handoff

| 欄位 | 值 |
|------|---|
| 狀態 | not-started |
| 審查輪次 | 0/2 |
| 程式碼審查 | — |
| 交付準備 | — |
| 人確認 | — |

---

## 待決問題

> 等待人類回答的問題。回答後記錄至 decisions.md 並從此處移除。

（無）

---

## 續做備註

> Orchestrator 留給未來自己的自由格式備註。記錄不適合放在結構化欄位中的上下文，例如：人在對話中提到的偏好但尚未正式回答的問題、實作過程中的發現等。

（無）