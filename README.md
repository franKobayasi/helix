# Helix — Agent Development Environment

> Build smarter. Learn faster. Ship better.

---

## What is Helix?

Helix is a framework for creating **Autonomous Development Environments** that grow with you. It provides structured development workflows with quality gates, knowledge persistence, and intelligent agent coordination.

```
You describe what you want.
Helix builds the conversation.
Memory accumulates automatically.
Knowledge compounds over time.
```

---

## Quick Start

### One-line Setup (npx)

```bash
npx github:frankobayasi/helix
```

This will automatically create the Helix directory structure, config file, and register the Helix skill in your current project.

### Manual Setup

```bash
cd /path/to/your/project
./helix/scripts/init.sh
```

### 2. 啟動開發流程

在 Claude Code 中說：

```
/helix dev <需求描述>
```

### 3. 流程自動運行

Helix 會自動：
1. **Scope Classification** — 評估需求複雜度
2. **Spec Review Loop** — 需求理解 → 技術規格 → 審查（3 輪上限）
3. **Plan Review Loop** — Task 拆解 → 審查（2 輪上限）
4. **TDD Implementation** — 每個 Task 獨立 worktree，TDD + 即時 QA 驗收
5. **Integration Verify** — 整合測試 + Spec 追溯 + 回歸保護
6. **Review & Handoff** — 程式碼審查 + 知識沈澱

### 4. 中斷與恢復

說 `resume` 從中斷處繼續：

```
resume
```

---

## Flow Overview

```
需求輸入
  │
  ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 1: Spec                                             │
│  ┌─────────┐    ┌──────────┐    ┌────────────────┐        │
│  │ Stage A │ → │ Stage B  │ → │ Review (3 Pass)│        │
│  │ 需求理解 │    │ 技術方案  │    │ Coverage/Design│        │
│  └─────────┘    └──────────┘    │ /Devil's Adv.  │        │
│                                  └────────────────┘        │
└─────────────────────────────────────────────────────────────┘
  │ Pass
  ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 2: Plan                                             │
│  ┌────────────┐    ┌────────────┐                           │
│  │ Task 拆解  │ → │ Plan Review│ → task-001.md ...         │
│  └────────────┘    └────────────┘                           │
└─────────────────────────────────────────────────────────────┘
  │ Pass
  ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 3: Implement                                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 每個 Task:                                            │   │
│  │   TDD (QA+Dev) → 實作 (Dev) → 驗收 (QA)             │   │
│  │   獨立 worktree → 合併整合分支 → 移除 worktree      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
  │ All Tasks Done
  ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 4: Integration Verify                                │
│  煙霧測試 → Spec 追溯 → 跨 Task 整合 → 回歸測試             │
└─────────────────────────────────────────────────────────────┘
  │ Pass
  ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 5: Review & Handoff                                  │
│  程式碼審查 → 交付準備 → 知識沈澱 (solution.md)            │
└─────────────────────────────────────────────────────────────┘
```

### Scope Classification（分流機制）

根據 5 維度評分自動分類：

| 總分 | 類型 | Pipeline |
|------|------|---------|
| 0-2 | **Lightweight** | 跳過 Spec/Plan，直接 Implement + QA |
| 3-5 | **Standard** | 完整 5 階段 |
| 6-10 | **Deep** | 完整 5 階段，Spec 需要更深度釐清 |

---

## Key Concepts

### Verification Gate — 驗證閘門

**完成聲明必須附帶新鮮的驗證證據。**

```
❌ 禁止：「我剛才驗證過了」
✅ 正確：貼出完整的測試輸出，然後說「全部通過」
```

### Status Protocol — 狀態協議

每個 Task/Agent 以四種狀態之一結束：

| 狀態 | 意義 | 下一步 |
|------|------|--------|
| `DONE` | 所有 AC 通過、測試通過 | 進入下一步 |
| `DONE_WITH_CONCERNS` | 完成但有已知問題 | 記錄 concerns，繼續 |
| `NEEDS_CONTEXT` | 缺特定資訊 | 補充後重新派遣 |
| `BLOCKED` | 無法完成 | 依 critical path 判斷 |

### Decision Classification — 決策分類

| 類型 | 處理方式 |
|------|---------|
| **Mechanical** | 自行處理（跟隨 pattern） |
| **Taste** | 自行決定，記錄到 `decisions.md` |
| **User Challenge** | 停下來問人 |

### Worktree Contract

每次開始工作前執行：

```bash
pwd          # 確認路徑
git branch   # 確認分支
```

不符立即回報 `BLOCKED`。

### Spec Review Isolation

QA Agent 驗收時**不看** Dev Agent 的自驗報告，獨立形成判斷。

---

## Slash Command

所有 Helix 命令皆以 `/helix ` 開頭（巢狀格式）：

| Command | 說明 |
|---------|------|
| `/helix dev <需求>` | 觸發 Helix 開發流程，自動推進 |
| `/helix scope` | Scope Classification |
| `/helix spec` | Spec 階段（需求 → 技術規格） |
| `/helix plan` | Plan 階段（拆解為 Task） |
| `/helix implement` | 實作階段（TDD + QA 驗收） |
| `/helix qa` | QA 驗收 |
| `/helix verify` | 整合驗證 |
| `/helix review` | 程式碼審查 |
| `/helix handoff` | 交付準備 |
| `/helix status` | 查看當前進度 |
| `/helix resume` | 從斷點恢復 |
| `/helix memory` | 更新 Memory 和 SKILL |

### 自動推進

使用 `/helix dev <需求描述>` 啟動後，流程會自動推進各階段，僅在需要人類決策時暂停詢問。

---

## Output Directory

所有產出存放在：

```
.helix-dev/.spec/{YYYYMMDD}-{slug}/
├── progress.md              # 流程狀態追蹤
├── spec.md                  # 技術規格
├── decisions.md              # 決策記錄
├── review-report.md          # 審查報告
├── plan.md                   # Task 清單 + 依賴圖
├── task-001.md ...           # 各 Task 規格
├── task-001-verification.md ..# QA 驗收報告
├── verification-report.md    # 整合驗證報告
├── code-review-report.md     # 程式碼審查報告
└── solution.md               # 知識沈澱
```

---

## Agents

| Agent | 職責 | 檔案 |
|-------|------|------|
| **Spec Agent** | 需求 → 技術規格（兩階段產出） | `agents/spec-agent.md` |
| **Plan Agent** | Spec → 可並行 Task | `agents/plan-agent.md` |
| **Frontend Agent** | 前端實作（TDD） | `agents/frontend-agent.md` |
| **Backend Agent** | 後端實作（TDD） | `agents/backend-agent.md` |
| **QA Agent** | 測試撰寫 + 驗收（3 模式） | `agents/qa-agent.md` |
| **Review Agent** | 規格/計畫審查（2 模式） | `agents/review-agent.md` |
| **Devils Advocate** | 獨立對抗式審查 | `agents/devils-advocate-agent.md` |

---

## SKILLs

可複用的知識單元：

| SKILL | 用途 |
|-------|------|
| **brainstorm** | 6 維清晰度評分 + forcing question |
| **gherkin-scenarios** | Gherkin 撰寫規則 + Coverage Gate |
| **evidence-classification** | 審查 evidence 分類 |

---

## Project Structure

```
helix/
├── AGENT.md                    # Main entry point
├── .helix/config.yaml          # Project configuration
├── flows/                      # 8 phase definitions
│   ├── FLOW.md                 # Global skeleton + rules
│   ├── 01-req-spec.md          # Phase 1 detail
│   └── ...
├── agents/                      # 7 agent definitions
├── skills/                      # 3 bundled SKILLs
├── standards/                   # Testing + voice standards
├── templates/                   # 7 output templates
├── memory/                      # Knowledge hierarchy
│   ├── project/                 # 單一專案
│   ├── domain/                  # 主題領域
│   └── global/                   # 跨專案
└── scripts/                      # Utility scripts
```

---

## Core Principles

1. **Document-First** — 文件定義開發流程，腳本為輔
2. **Verification Gate** — 完成聲明必須附帶驗證證據
3. **Progressive Disclosure** — 只載入當前階段需要的上下文
4. **Memory Accumulates** — 每個階段貢獻知識
5. **SKILL Reuse** — 技能複用，不要重複做

---

## Comparison with harness-dev

| 面向 | Helix | harness-dev |
|------|-------|-------------|
| 架構 | Document-First + SKILL + Memory | 純流程框架 |
| 分流 | Scope Classification (Lightweight/Standard/Deep) | 無 |
| 知識沈澱 | Phase 8: Memory/SKILL Update | 無 |
| 輸出目錄 | `.helix-dev/.spec/` | `.harness-dev/.spec/` |
| 分支命名 | `hx/{slug}/...` | `hd/{slug}/...` |

---

## Getting Started

### 初始化新專案

```bash
# 進入你的專案目錄
cd /path/to/your/project

# 複製 Helix 框架（或作為 submodule）
git clone https://github.com/your-org/helix ./helix-framework

# 初始化
./helix-framework/scripts/init.sh

# 配置專案
vim .helix/config.yaml
```

### 基本使用

1. **開始新功能**：
   ```
   start:helix
   ```

2. **回應問題**：Helix 會在需要時提出選項題，回覆 A/B/C/D/S

3. **確認進度**：查看 `.helix-dev/.spec/{folder}/progress.md`

4. **恢復流程**：
   ```
   resume
   ```

---

## Inspiration

Helix draws from multiple sources:

- **Hermes Agent** — closed learning loops, auto-generating skills
- **OpenClaw** — SOUL.md pattern, workspace memory architecture
- **Harness Engineering** — quality gates, feedback-driven reliability
- **DevCps/ADE Research** — structured development environments

The name "Helix" reflects the core principle: **knowledge spirals upward**, each iteration building on what was learned before.

---

## License

MIT
