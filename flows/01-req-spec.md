# Phase 01: Requirement & Specification

> 本階段包含需求理解、Scope Classification、與技術規格產出。上游為需求輸入，下游為 Phase 2: Plan。

---

## 目標

1. 對需求进行 Scope Classification，決定要走完整流程還是快速通道
2. 將需求轉化為明確、完整、無矛盾的技術規格

---

## 核心原則

- **問題左移**：主動發現規格遺漏、衝突、設計缺陷，而非在實作中踩到
- **需求理解先確認**：技術方案設計前，先讓人確認需求理解（§1 + §4）。理解若歪，後續全錯
- **對抗式審查**：由獨立的 Review Agent 挑戰 Spec Agent 的方案，避免自己審自己
- **人只回答真正需要決策的問題**：Agent 之間能自行解決的技術細節不應打擾人

---

## 流程細節

### Step 0b: Scope Classification（強制，決定 pipeline 形狀）

> **設計來源**：移植自 harness-dev 的 scope classification，避免小改動強走完整五階段流程。

Orchestrator 對需求評分 5 個維度（0-2 分）：

| 維度 | 0 (低) | 1 (中) | 2 (高) |
|------|--------|--------|--------|
| **Files affected** | 1 個檔案 | 2-5 個檔案 | 6+ 個檔案 |
| **Ambiguity** | 做什麼很清楚 | 需要一些詮釋 | 有根本性的設計問題 |
| **Risk** | 易回滾 | 中等影響範圍 | Migration / API 變更 / 共享狀態 |
| **Novelty** | 有既有 pattern 可跟 | 部分先例 | 無既有 pattern |
| **Dependencies** | 無 | 同模組內 | 跨模組或外部 |

**總分 → 分類**：

| 總分 | 分類 | Pipeline |
|------|------|---------|
| 0-2 | **Lightweight** | 直接進入 Phase 3 Implement（跳過 Phase 1、2、5） |
| 3-5 | **Standard** | 完整 5 階段 |
| 6-10 | **Deep** | 完整 5 階段，Stage A 需要更深入的釐清（4-8 題） |

**分類規則**：
- 不確定時，**往上分類**
- Orchestrator **宣告分類 + rationale，不問人確認**

**Lightweight 分支**：

若分類為 Lightweight，Orchestrator 直接告知人：

```
Scope: Lightweight (score: {N}/10)
理由: {一句話解釋}
建議 pipeline: 直接 Phase 3 Implement（跳過 Spec / Plan / Review）

是否接受此路線？
  A) 接受 — 進入 Phase 3
  B) 否，走完整流程 — 升級為 Standard
```

> 📌 **Checkpoint**: `progress.md` — `current_step: phase1.scope-classified`，記錄 `scope: classification / score / factors / pipeline`

---

### Stage A: 需求理解摘要（人確認閘）

**目的**：在投入技術方案設計前，先讓人確認 Spec Agent 對需求的理解正確。

**設計參考**：基於 `skills/brainstorm/SKILL.md` 的 6 維清晰度評分 + 強制選項題 + forcing question 機制。

**輸入**：需求描述（PRD / Story / 口頭描述）+ 相關程式碼上下文 + Prior Art（如有）
**產出**：`spec.md` 的 §1 需求理解 + §4 不在範圍內 + 需求層級的 Open Questions（僅 `spec-clarification` 分類）

Spec Agent **只產出** §1（背景與動機 / 目標使用者 / 成功定義）、§4（不在範圍內）、與需求層級的疑問。**不進入** §2 技術方案、§3 影響範圍、§5 設計層級 Open Questions。

#### Step 1a-1: 清晰度評分（Clarity Dimensions）

Spec Agent 收到需求後，先對 6 個維度評分（0 = 清楚、1 = 部分、2 = 不清楚）：

| 維度 | 0 清楚 | 1 部分 | 2 不清楚 |
|------|--------|--------|----------|
| **使用者與需求** | 誰用、多常用、為何在意皆明確 | 使用者已知，動機模糊 | 不知誰要、為何要 |
| **範圍邊界** | in/out 明確 | 在內清楚、在外模糊 | 可能是好多種事 |
| **行為與規則** | 業務邏輯無歧義 | happy path 清楚、邊界模糊 | 核心行為有多種解讀 |
| **錯誤與邊界** | 失敗模式與處理已定義 | 部分錯誤有考慮、仍有缺口 | 還沒想過錯誤處理 |
| **資料與狀態** | 資料模型、來源、變更清楚 | 部分理解 | 不清楚涉及哪些資料 |
| **整合與依賴** | 外部接點已知 | 部分已知、部分需調查 | 不清楚影響哪些系統 |

**完整度 %** = 評為 0 的維度數 ÷ 6 × 100%。初始 completeness 決定需問多少題（Standard 通常 2-5 題，Deep 案 4-8 題）。

#### Step 1a-2: 釐清迴圈（Iterative Clarification Loop）

**While** completeness < 100% AND 使用者未選 `S`（停止）：

1. 挑**分數最高**的維度，選該維度**最影響後續**的單一疑問
2. 用 **AskUserQuestion** 格式發問（強制選項題 + 重建上下文）：

```
[{feature-name}] Question {N}/~{估計總題數} — Clarity: {completeness}%

CONTEXT: {1 句重建上下文 — 目前在釐清哪個維度}

{Forcing question — 先說 YOUR 的建議立場，再問}

  A) {推薦選項 — 附理由}
  B) {替代選項}
  C) {另一個替代，如適用}
  D) Skip — 你決定就好
  S) Stop — 剩下的先不管，進入合成
```

3. 依回應處理：
   - **A/B/C** → 納入答案、重評該維度分數
   - **D** Skip → 記錄 YOUR 建議為決策、重評、繼續
   - **S** Stop → 所有剩餘維度記錄 best-guess 為決策，進入 Step 1a-3
   - **Anti-vagueness check**：回答本身模糊（「彈性點」、「好好處理」）→ 推回一次用 forcing question；仍模糊則記錄 YOUR 解讀後繼續

**規則**：
- **一次一題**
- **永遠 take a position**
- **不問能從 codebase 讀出來的事**
- **不問瑣事**
- **典型題數**：2-5 題；够清楚就停

#### Step 1a-3: 分段摘要呈現與確認（三段）

completeness 達 100% 或使用者選 S 後，Orchestrator **依序**呈現三段，每段獨立確認：

**Segment 1 of 3：問題與目標使用者**

```markdown
## 需求理解確認 1/3：問題與目標使用者

### 解決的問題
[§1.1 一句話]

### 目標使用者與場景
[§1.2 一句話]

---
A) 正確，進入下一段
B) 修改這一段 — 說明哪裡要調整
C) 方向性錯誤（整個理解歪了）— 重啟 Step 1a-1
```

**Segment 2 of 3：成功定義**

```markdown
## 需求理解確認 2/3：成功定義

### 成功定義
[§1.3 關鍵指標]

---
A) 正確，進入下一段
B) 修改這一段
C) 方向性錯誤 — 重啟 Step 1a-1
```

**Segment 3 of 3：不在範圍內 + 釐清記錄 + 最終批准**

```markdown
## 需求理解確認 3/3：邊界與記錄

### 不在範圍內
- [§4 項目]

### 釐清迴圈記錄
- Q1: [問題] → [答案]
...

### 本階段自我檢核
- [ ] 無 placeholder / TBD / XXX
- [ ] 與原始需求無矛盾
- [ ] 無範圍蔓延

RECOMMENDATION: APPROVE（理由：completeness 100% / 主要疑問已解 / 無範圍蔓延）

A) 批准，進入技術設計（Step 1b）
B) 修改 §4 或釐清記錄
C) 中止
```

> 📌 **Checkpoint**: `progress.md` — `current_step: phase1.understanding-confirm`（等待人確認時 `status: blocked-on-human`）

---

### Stage B: Spec Agent 產出技術方案

**前置條件**：Step 1a 人已確認需求理解（`decisions.md` §0 有確認記錄）。

**輸入**：已確認的 §1 + §4 + `decisions.md` §0 + 相關程式碼上下文
**產出**：`spec.md` 的 §2 技術方案 + §3 影響範圍 + §5 Open Questions（設計層級，`design-risk` / `constraint` 分類）

#### Step 1b-1: 方案比較（§2.0，強制）

在進入單一方案的細節設計前，先填 §2.0：

1. 列**至少 2 個方案**（A/B，必要時 C）
2. 填方案比較表：核心作法 / 實作成本 / 可維護性 / 既有 pattern 相容性 / 可逆性 / 主要風險
3. 宣告推薦方案 + 2-3 句選擇理由 + 1-2 句「為何不選另一方案」

#### Step 1b-2: 展開技術方案（§2.1 - §2.8）

- §2.1 架構概覽
- §2.2 資料模型
- §2.3 API 設計
- §2.4 前端變更（如適用）
- §2.5 整合方式
- §2.6 錯誤處理
- §2.7 效能考量（如適用）
- §2.8 Acceptance Scenarios（Gherkin 格式）— 見 `skills/gherkin-scenarios/SKILL.md`

#### Step 1b-3: 影響範圍標記（§3）

#### Step 1b-4: Open Questions（§5）— 設計層級

> 📌 **Checkpoint**: `progress.md` — `current_step: phase1.spec-draft`，記錄 spec.md 版本

---

### Step 2: Review Agent 審查（雙 Pass 架構）

> **設計來源**：基於 harness-dev 的雙 Pass + isolated context，避免單一 context 審查時被 Spec Agent 的推理脈絡感染。

Review Agent 以兩個 Pass 系統性審查 spec.md，**每個 Pass 由獨立的 fresh Agent 實例執行**。

#### Pass 1 — Coverage Review（輸入隔離）

**輸入**（隔離）：原始需求描述 + `spec.md` + `decisions.md` §0
**禁止輸入**：Spec Agent 的推理過程、Stage A 釐清問答歷史、上輪 review-report、專案架構文件

**審查維度**：需求覆蓋度、邊界條件（含 Gherkin Scenarios 檢查）、Open Questions

**Pass 1 未全綠（有 blocker 或 warning）** → **不執行 Pass 2**，直接進入 Step 3 合併問題

> 📌 **Checkpoint**: `progress.md` — `current_step: phase1.review.pass1`

#### Pass 2 — Design Review（完整輸入）

**前置條件**：Pass 1 全綠

**輸入**：完整 `spec.md` + 完整 `decisions.md` + 程式碼上下文（實際 grep / 讀檔）+（修訂輪）上輪 `review-report.md`

**審查維度**：設計一致性（至少 2 個 codebase-ref 佐證）、影響範圍（實際 `ls` / `grep` / 讀檔）、可實作性、YAGNI 過度設計檢查

> 📌 **Checkpoint**: `progress.md` — `current_step: phase1.review.pass2`

#### Devil's Advocate Pass（獨立 Agent，Sign-off 前強制）

**前置條件**：Pass 1 + Pass 2 皆全綠

由 Orchestrator spawn 獨立的 fresh Devil's Advocate Agent（`agents/devils-advocate-agent.md`），只拿 `spec.md` + `decisions.md` §0（嚴格隔離），提出 3 個尖銳問題。

**判定**：
- 3 題皆能從 spec.md 直接找到答案 → pass，進入 sign-off
- 任一題無答 → 列為 warning，Spec Agent 下輪修訂補上

> 📌 **Checkpoint**: `progress.md` — `current_step: phase1.review.devil`

---

### Step 3: Orchestrator 合併問題

Orchestrator 將 Spec Agent 的 Open Questions 和 Review Agent 的 Review Report 合併：
1. **去重**：移除重複問題
2. **分類**：spec-clarification / design-risk / constraint
3. **過濾**：Agent 能自行解決的不拋給人
4. **一次性拋出**

> 📌 **Checkpoint**: `progress.md` — `current_step: phase1.human-qa`，`status: blocked-on-human`，寫入待決問題

---

### Step 4: 人回答問題

人針對問題清單逐一回答或批次回答。Orchestrator 將回答記錄到 `decisions.md`。

> 📌 **Checkpoint**: `progress.md` — `current_step: phase1.spec-draft`，`status: in-progress`，迭代 +1，清除待決問題

---

### Step 5: Spec Agent 修訂

根據人的回答和 Review Agent 的反饋修訂規格。記錄設計決策到 `decisions.md`，清楚標記本輪修改的部分（使用 `[REV-{N}]` 標記）。

---

### Step 6: Review Agent 差異審查（雙 Pass 差異版）

第二輪起的雙 Pass 執行規則：
- **Pass 1 差異**：只看本輪修改的 §2 / §3 / §5 區塊 + 檢查上輪 unresolved issue 是否被解決
- **Pass 2 差異**：只在 Pass 1 本輪無新 blocker/warning 時執行

---

### Step 7: 收斂判定

收斂條件（滿足任一即可進入下一階段）：

- **Review Agent Sign-off**：Pass 1 + Pass 2 + Devil's Advocate 皆綠，且無未解決的 blocker/warning（非 reasoning-only）
- **迴圈上限**：已達 3 輪 Spec-Review 迴圈
- **人主動確認**：人隨時可以覆寫 Review Agent 的判斷

> 📌 **Checkpoint**: `progress.md` — `current_step: phase1.completed`，Phase 1 狀態 = completed

---

## 產出物

| 檔案 | 說明 | 模板 |
|------|------|------|
| `spec.md` | 技術規格文件（最終版） | `templates/spec-template.md` |
| `review-report.md` | 審查報告 | `templates/review-report-template.md` |
| `decisions.md` | 關鍵決策、風險接受、規格變更記錄 | `templates/decisions-template.md` |

## 階段轉換條件

進入 Phase 2: Plan 的前置條件：

- [ ] Step 1a 需求理解已被人確認（`decisions.md` §0 至少有一筆 U-{N} 記錄）
- [ ] Pass 1 Coverage Review 全綠
- [ ] **Pass 1 Gherkin Gate 全綠**：§2.8 每個 Requirement 具備 ≥1 happy + ≥1 error/edge scenario
- [ ] Pass 2 Design Review 全綠（含至少 2 個 codebase-ref 佐證）
- [ ] Devil's Advocate Pass 全通過（3 題皆有 spec 答案，或已回寫 spec）
- [ ] 所有 blocker 級別問題已解決（含 evidence，非 reasoning-only）
- [ ] 剩餘 warning 級別問題已被人確認為「可接受風險」

---

## 參與角色

| 角色 | 定義檔 | 職責 |
|------|--------|------|
| Orchestrator | （主 agent） | 驅動 Spec-Review 迴圈、合併問題、與人互動 |
| Spec Agent | `agents/spec-agent.md` | 根據需求產出技術規格，標記不確定性 |
| Review Agent | `agents/review-agent.md` | 審查技術規格，挑戰設計決策 |
| Devils Advocate Agent | `agents/devils-advocate-agent.md` | 獨立對抗式審查（由 Orchestrator spawn） |

---

## Context Loaded at This Phase

```
01-req-spec.md (this file)
├── .helix/config.yaml (tech stack)
├── agents/spec-agent.md
├── agents/review-agent.md
├── agents/devils-advocate-agent.md
├── skills/brainstorm/SKILL.md
├── skills/gherkin-scenarios/SKILL.md
├── skills/evidence-classification/SKILL.md
└── memory/project/ (existing architecture, past decisions)
```

## Phase-Specific Memory Access

```
Memory Scope: PROJECT level
- Load: project goal, existing documentation, past AD decisions
- NOT: task details, implementation specifics, future phases
```