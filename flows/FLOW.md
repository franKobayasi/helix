# Helix Development Flow

> Progressive disclosure: only the current phase's context is revealed.

---

## Cross-Cutting Principles

以下原則適用於所有階段、所有 Agent。各 Agent 定義檔與 Phase 細節頁中引用此處規則。

### Verification Gate — 驗證閘門

**完成聲明必須附帶新鮮的驗證證據。**

任何 Agent 在使用完成語言（「done」、「complete」、「通過」、「ready」）之前，必須：

1. **IDENTIFY** — 此 Task 的驗證指令是什麼？
2. **RUN** — 在當前訊息中執行指令
3. **READ** — 讀取完整輸出
4. **VERIFY** — 確認輸出顯示成功
5. **THEN** — 才能使用完成語言

順序規則：驗證輸出 → 分析 → 結論。不可倒置。

禁止模式：

| 禁止 | 原因 |
|------|------|
| 「我剛才已經驗證過了」 | 證據過時，重新跑 |
| 「測試之前通過了」 | 之後可能有變動，重新跑 |
| 「應該可以」 | 「應該」不是「確認」 |
| 結論出現在驗證輸出之前 | 必須先有證據再有結論 |

### Decision Classification — 決策分類

所有實作決策依以下分類處理，減少不必要的人類中斷：

| 類型 | 判定標準 | 處理方式 | 記錄 |
|------|---------|---------|------|
| **Mechanical** | 多個等效方案，無實質差異 | 跟隨既有 pattern，自行決定 | 不記錄、不提問 |
| **Taste** | 兩個合理方案，需擇一 | 自行決定 | 記錄到 `decisions.md` |
| **User Challenge** | 不可逆變更 / 根本性方向差異 | **停下來問人** | 阻塞直到回答 |

**Mechanical Rules（自動套用）：**
- 命名風格 → 跟隨同模組慣例；無慣例則跟語言社群標準
- 架構 pattern → 新程式碼跟隨同模組的既有 pattern
- 依賴 → 用專案已有的；不為一次性使用加新依賴
- 錯誤處理 → 跟隨同模組既有模式；無模式則用 typed error
- 測試 → 跟隨既有結構、位置、命名、assertion 風格

**Taste 記錄格式：**
```markdown
### Decision: [標題]
**Options**: A) [方案] vs B) [方案]
**Chose**: [A or B]
**Rationale**: [1-2 句——為什麼對這個專案更好]
**Reversibility**: [easy / medium / hard]
```

**User Challenge 觸發條件（必須問人）：**
- 不可逆的基礎設施變更（DB migration、API 契約變更）
- 兩個方案的長期影響顯著不同
- 安全性或合規性風險
- 無既有 pattern 且影響 3+ 檔案的架構決策

### Escalation Protocol — 升級協議

任何 Task 最多 **3 次嘗試**，之後升級。

| 嘗試 | 行動 |
|------|------|
| 第 1 次失敗 | 診斷 root cause，調整策略重試 |
| 第 2 次失敗 | 質疑假設，用**根本不同**的策略重試 |
| 第 3 次失敗 | **停止重試**，升級處理 |

**Status Protocol — 每個 Task/Agent 必須以下列四種狀態之一結束：**

| 狀態 | 含義 | 下一步 |
|------|------|--------|
| `DONE` | 所有 AC 通過、測試通過、已 commit | 進入下一步 |
| `DONE_WITH_CONCERNS` | 完成但有已知問題 | 記錄 concerns，繼續但注意 |
| `NEEDS_CONTEXT` | 缺特定資訊（**必須**說缺什麼） | 補充後重新派遣 |
| `BLOCKED` | 無法完成（**必須**說原因 + 嘗試過什麼） | 依 critical path 判斷 |

**BLOCKED 升級流程：**
1. 記錄 3 次嘗試（策略 + 失敗原因）
2. 判斷是否在 critical path 上：
   - **是** → 嘗試拆解為更小的 sub-task；拆解也失敗 → 停下來報告人
   - **否** → 標記 BLOCKED，繼續其他 Task，在最終報告列出
3. 記錄格式：
   ```
   ### BLOCKED: [Task 名稱]
   - Attempt 1: [策略] → [失敗原因]
   - Attempt 2: [策略] → [失敗原因]
   - Attempt 3: [策略] → [失敗原因]
   ```

**Fresh Context Rule — 重試時使用新鮮上下文：**
- 重試使用**新的 Agent**（不繼承前次的推理）
- 新 Agent 收到：task spec + 當前程式碼 + 具體失敗原因
- 新 Agent **不**收到：前一個 Agent 的推理過程或自我評估

### Voice & Tone — 溝通標準

所有 Agent 產出遵循 `standards/voice-tone.md`。核心要求：
- 具體取代模糊（有檔案名、行號、數字）
- 驗證後再下結論（不說「應該可以」）
- 短段落、真實引用、可操作的建議

---

## Scope Classification — 範圍分類

> **設計來源**：基於 5 維度評分的分流機制，避免小改動強走完整流程。

### 分類維度

| 維度 | 0 (低) | 1 (中) | 2 (高) |
|------|--------|--------|--------|
| **Files affected** | 1 個檔案 | 2-5 個檔案 | 6+ 個檔案 |
| **Ambiguity** | 做什麼很清楚 | 需要一些詮釋 | 有根本性的設計問題 |
| **Risk** | 易回滾 | 中等影響範圍 | Migration / API 變更 / 共享狀態 |
| **Novelty** | 有既有 pattern 可跟 | 部分先例 | 無既有 pattern |
| **Dependencies** | 無 | 同模組內 | 跨模組或外部 |

### 分數 → 分類 → Pipeline

| 總分 | 分類 | Pipeline |
|------|------|---------|
| 0-2 | **Lightweight** | 跳過 Spec/Plan/Review，直接 Implement + QA |
| 3-5 | **Standard** | 完整 5 階段 |
| 6-10 | **Deep** | 完整 5 階段，Spec 階段需要更深入的釐清 |

### 分類規則

- 不確定時，**往上分類**（Standard 優於 Lightweight，Deep 優於 Standard）
- 看起來 Lightweight 但碰到共用程式碼 → Standard
- 看起來 Standard 但需要 migration → Deep
- Orchestrator **宣告分類 + rationale，不問人確認**（避免 vague「你覺得呢」）

### Lightweight 分支

若分類為 Lightweight，直接進入 Implement 階段，跳過：
- Phase 1: Spec
- Phase 2: Plan
- Phase 5: Review & Handoff

---

## Flow Overview

```
需求輸入
  │
  ▼
Scope Classification ── lightweight? ──▶ [快速通道] Implement → QA → PR
  │
  ▼ (Standard/Deep)
Phase 1: Spec              →  spec.md, review-report.md, decisions.md
  Spec Agent ↔ Review Agent（對抗式迴圈，3 輪上限）
  │
  ▼
Phase 2: Plan              →  plan.md, task-{NNN}.md × N
  Plan Agent ↔ Review Agent（Plan Review，2 輪上限）
  │
  ▼
Phase 3: Implement         →  程式碼, 測試, task-{NNN}-verification.md × N
  每 Task：TDD（QA+Dev）→ 實作（Dev）→ 驗收（QA）
  Task 隔離於獨立 worktree，驗收通過後合入整合分支
  │
  ▼
Phase 4: Integration Verify →  verification-report.md
  QA Agent：煙霧測試 → Spec 追溯 → 整合測試 → 回歸
  │
  ▼
Phase 5: Review & Handoff  →  code-review-report.md, PR 描述, solution.md
  Review Agent 程式碼審查 → 交付準備 → 人最終確認 → 知識沈澱
```

---

## Phase Index

| Phase | 目標 | 關鍵角色 | 主要產出 | 迴圈上限 | 細節檔案 |
|-------|------|---------|---------|---------|---------|
| 1. Spec | 收斂無矛盾的技術規格 | Spec / Review Agent | `spec.md`, `decisions.md`, `review-report.md` | 3 輪 | `flows/02-spec.md` |
| 2. Plan | 拆解為可並行的 Task | Plan / Review Agent | `plan.md`, `task-{NNN}.md` | 2 輪 | `flows/03-plan.md` |
| 3. Implement | TDD 實作 + 即時驗收 | Frontend / Backend / QA Agent | 程式碼, 測試, `task-{NNN}-verification.md` | Task QA 2 輪 | `flows/05-implement.md` |
| 4. Integration Verify | 整合驗證 + 回歸保護 | QA Agent（整合模式） | `verification-report.md` | 修復 2 輪 | `flows/06-qa.md` |
| 5. Review & Handoff | 程式碼審查 + 交付 | Review Agent | `code-review-report.md`, PR 描述, `solution.md` | 審查 2 輪 | `flows/07-pr.md` |

---

## Command Syntax

觸發下一階段的命令：

```
start:helix             → 初始化 Helix 流程
scope:classify          → Scope Classification（Lightweight/Standard/Deep）
spec:understand         → Stage A: 需求理解摘要（人確認閘）
spec:develop            → Stage B: 技術方案
plan:develop            → Plan 拆解
task:breakdown          → Task 拆分
implement:start         → 開始實作（TDD + 即時驗收）
qa:start                → QA 驗收（Task Verification）
verify:integration      → 整合驗證（Integration Verification）
review:code             → 程式碼審查
handoff:prepare         → 交付準備
update:memory           → 更新 Memory 和 SKILL
resume                  → 從斷點恢復
```

---

## Phase Context Loading Rules

### Rule: Progressive Disclosure Only

At each phase, **only load context relevant to that phase**:

```
Spec Phase:
→ Load: Requirement doc, existing architecture, decisions.md §0
→ NOT Load: Implementation details, coding style (yet)

Plan Phase:
→ Load: Spec doc, tech constraints, dependencies
→ NOT Load: Task breakdown, code structure (yet)

Implement Phase:
→ Load: Task doc, relevant SKILL, current module code
→ NOT Load: Other tasks' code, unrelated modules
```

### Rule: No Backward Context Loading

Each phase should be reviewable independently.
Future context does not leak backward.

---

## Phase Entry Conditions

每個 phase 需要明確的開發者確認才能進入下一階段：

```
Scope Classify ── Orchestrator 宣告分類 ──▶ Spec (Standard/Deep) 或 Implement (Lightweight)
Spec          ── Review Agent sign-off + 人確認 ──▶ Plan
Plan          ── Review Agent sign-off + 人確認 ──▶ Implement
Implement     ── 所有 Task QA 通過 ──▶ Integration Verify
Integration   ── QA 通過，無 blocker ──▶ Review & Handoff
Review        ── 人最終確認 ──▶ Update → Done
```

---

## Output Directory

所有產出檔案集中存放於工作區根目錄下：

```
.helix-dev/
└── .spec/
    └── {YYYYMMDD}-{slug}/       ← 每次開發一個 folder
        ├── progress.md           ← 流程狀態追蹤
        ├── spec.md
        ├── decisions.md
        ├── review-report.md
        ├── plan.md
        ├── task-001.md ... task-NNN.md
        ├── task-001-verification.md ... task-NNN-verification.md
        ├── verification-report.md
        └── code-review-report.md
```

### 初始化

流程啟動時，Orchestrator：
1. 依需求產生 folder 名稱（格式：`{YYYYMMDD}-{slug}`）
2. 向使用者確認 folder 名稱
3. 建立目錄並從 `templates/progress-template.md` 初始化 `progress.md`

---

## State Persistence & Resume Protocol

### 設計目的

開發流程可能因 context window 達上限而需要中斷。`progress.md` 作為流程狀態的 **single source of truth**，確保 Orchestrator 在任何時間點都能從斷點恢復。

### Checkpoint 規則

Orchestrator **必須**在以下時機更新 `progress.md`：

1. **Agent 呼叫前** — 更新 `current_step`，記錄即將執行的動作
2. **Agent 呼叫後** — 記錄產出物、更新狀態
3. **人類回答後** — 清除待決問題、記錄決策
4. **迭代結束** — 更新迭代計數、追加迭代記錄
5. **Task 狀態變更**（Phase 3）— 更新 Task 狀態表
6. **階段轉換** — 標記當前階段 completed，更新 `current_phase`

更新方式為差量更新（只改 YAML frontmatter + 對應區塊），不整檔重寫。

### State Enum

`progress.md` YAML frontmatter 中 `current_step` 的可用值：

| Phase | Step | 說明 |
|-------|------|------|
| 1 | `phase1.scope-classified` | Scope classification 完成 |
| 1 | `phase1.understanding-draft` | Spec Agent 產出需求理解摘要中 |
| 1 | `phase1.understanding-confirm` | 等待人確認需求理解 |
| 1 | `phase1.spec-draft` | Spec Agent 產出技術方案中 |
| 1 | `phase1.review.pass1` | Pass 1 Coverage Review 執行中 |
| 1 | `phase1.review.pass2` | Pass 2 Design Review 執行中 |
| 1 | `phase1.review.devil` | Devil's Advocate Pass 執行中 |
| 1 | `phase1.merge-questions` | Orchestrator 合併問題中 |
| 1 | `phase1.human-qa` | 等待人類回答 |
| 1 | `phase1.completed` | Phase 1 完成 |
| 2 | `phase2.plan-draft` | Plan Agent 拆解中 |
| 2 | `phase2.review` | Review Agent 審查中 |
| 2 | `phase2.human-qa` | 等待人類確認 |
| 2 | `phase2.completed` | Phase 2 完成 |
| 3 | `phase3.env-setup` | 建立 worktree 環境 |
| 3 | `phase3.tdd` | TDD 測試撰寫中 |
| 3 | `phase3.implement` | Dev Agent 實作中 |
| 3 | `phase3.qa-verify` | QA Agent 驗收中 |
| 3 | `phase3.qa-fix` | 修復 QA 問題中 |
| 3 | `phase3.batch-merge` | 批次合併中 |
| 3 | `phase3.completed` | 所有 Task 完成 |
| 4 | `phase4.verify` | 整合驗證中 |
| 4 | `phase4.fix-loop` | 修復整合問題中 |
| 4 | `phase4.completed` | Phase 4 完成 |
| 5 | `phase5.code-review` | 程式碼審查中 |
| 5 | `phase5.review-fix` | 修復審查問題中 |
| 5 | `phase5.handoff-prep` | 交付準備中 |
| 5 | `phase5.completed` | 流程完成 |

### Resume Protocol

當使用者說「continue」、「resume」或「繼續」時，Orchestrator 執行以下步驟：

1. **讀取狀態** — 讀 `progress.md`，解析 YAML frontmatter 中的 `current_phase`、`current_step`、`status`
   - 若檔案不存在 → 沒有進行中的流程，提示使用者
   - 若 `status == "completed"` → 流程已結束，告知使用者
2. **讀取產出物** — 依 `current_phase` 讀取對應階段的關鍵檔案
3. **載入 Phase 細節** — 依 `current_phase` 讀取 `flows/0N-*.md`，重建流程細節上下文
4. **驗證一致性** — 確認 progress.md 記載的檔案實際存在、Task 狀態與檔案 header 吻合
5. **讀取續做備註** — 讀 progress.md「續做備註」段落，恢復自由格式上下文
6. **從斷點繼續** — 向使用者宣告：「恢復 [功能名稱]，Phase [N]，步驟 [描述]」，然後執行 `current_step` 對應的動作

### Edge Cases

| 情境 | 處理方式 |
|------|---------|
| 迭代中途中斷 | 從 `current_step` 重做當前步驟（agent 產出為冪等） |
| blocked-on-human | 重新呈現「待決問題」段落 |
| Phase 3 多 Task 並行 | 依 Task 狀態表逐一恢復，IN_PROGRESS 的 Task 從記錄的子步驟繼續 |
| progress.md 與實際檔案不一致 | 報告差異，由使用者決定信任 progress.md 或從檔案重建 |

---

## Orchestrator 讀取策略

為控制 context 負擔，Orchestrator 依需要載入檔案，**不預先全部讀取**：

| 時機 | 必讀 | 條件讀 |
|------|------|--------|
| 流程啟動 | 本檔（`FLOW.md`） + `templates/progress-template.md` | `agents/spec-agent.md`, `agents/review-agent.md`, `templates/spec-template.md`, `templates/decisions-template.md`, `templates/review-report-template.md` |
| 進入 Phase 1 | `flows/02-spec.md` + `agents/spec-agent.md` | `skills/brainstorm/SKILL.md`, `skills/gherkin-scenarios/SKILL.md`（呼叫對應 Agent 時附上） |
| 進入 Phase 2 | `flows/03-plan.md` + `agents/plan-agent.md` | `templates/plan-template.md`, `templates/task-template.md` |
| 進入 Phase 3 | `flows/05-implement.md` + `agents/{frontend,backend,qa}-agent.md` + `standards/{frontend,backend}-testing.md` | 依 Task 類型僅讀需要的那份 standards |
| 進入 Phase 4 | `flows/06-qa.md` + `agents/qa-agent.md`（整合模式） | — |
| 進入 Phase 5 | `flows/07-pr.md` + `agents/review-agent.md` + `templates/solution-template.md` | — |
| Resume | 本檔 + `progress.md` + 對應階段的 flows + 產出檔案 | — |

進入新 Phase 時可配合清理上一階段的詳細上下文，只保留：骨架（本檔）+ `progress.md` + 當前 Phase 細節 + 該 Phase 的 agent / template。

---

## Flow Files

| 檔案 | 說明 |
|------|------|
| `flows/01-req-spec.md` | 需求輸入 + Scope Classification |
| `flows/02-spec.md` | 技術規格（含 Stage A/B 機制） |
| `flows/03-plan.md` | Task 拆解 + 依賴圖 |
| `flows/04-task.md` | Task 管理細節 |
| `flows/05-implement.md` | TDD + 即時驗收 + Worktree |
| `flows/06-qa.md` | 整合驗證 |
| `flows/07-pr.md` | PR 準備 + 知識沈澱 |
| `flows/08-update.md` | Memory/SKILL 更新 |

---

## Global Context (Available in All Phases)

這些檔案在所有 phase 都可使用：

```
├── AGENT.md              # 當前角色或 Orchestrator 的 entry point
├── .helix/config.yaml    # 專案配置
└── memory/global/        # 跨專案知識（永久）
```