# Spec: [功能名稱]

> 狀態：Draft | In Review | Final
> 版本：v1
> 最後更新：[日期]
> 階段標記：`<!-- STAGE: A / awaiting-human-confirmation -->` 或 `<!-- STAGE: B / draft | rev-{N} -->`（由 Spec Agent 填入，對應 Flow Phase 1 Step 1a/1b）

---

> 📋 **首輪人確認範圍（Step 1a）**：§1 + §4 + §5 中 `spec-clarification` 疑問。
> 人確認後才由 Spec Agent 在 Step 1b 補上 §2、§3、§5 的設計層級疑問。

## 1. 需求理解

### 1.1 背景與動機

[這個功能/修改要解決什麼問題？為什麼現在需要做？]

### 1.2 目標使用者與場景

[誰會使用？在什麼情境下？]

### 1.3 成功定義

[怎樣算完成？關鍵衡量指標是什麼？]

---

## 2. 技術方案

### 2.0 方案選項與選擇（強制，至少 2 方案）

> **目的**：強制探索 alternatives，避免 Spec Agent 一槍定案沒被挑戰。Taste 級決策（見 `FLOW.md` § Decision Classification）自然落到本區塊，後續由 Review Agent Pass 2 的 YAGNI 維度對照此處 rationale。
>
> 規則：至少 2 個方案；若 Stage A scope classification 為 Lightweight 可單方案，但仍須列「為何不拆方案」一句說明。

#### 方案比較

| 面向 | 方案 A：[名稱] | 方案 B：[名稱] |
|------|----------------|----------------|
| **核心作法** | [一句話描述] | [一句話描述] |
| **實作成本** | [人時 / 複雜度] | [人時 / 複雜度] |
| **可維護性** | [高 / 中 / 低 + 原因] | [高 / 中 / 低 + 原因] |
| **既有 pattern 相容性** | [是 / 否 + 引用 codebase-ref] | [是 / 否 + 引用 codebase-ref] |
| **可逆性** | [easy / medium / hard] | [easy / medium / hard] |
| **主要風險** | [1-2 項] | [1-2 項] |

#### 推薦方案：[A 或 B]

**選擇理由**（2-3 句）：[為什麼對本專案 / 本需求更好]

**為何不選另一方案**（1-2 句）：[關鍵 trade-off — 避免空話如「較不適合」]

**Reversibility**：easy / medium / hard

---

### 2.1 架構概覽

[高層級的技術方案描述。如需要可附架構圖。]

### 2.2 資料模型

[新增或修改的資料結構。包含欄位名稱、型別、必填/選填、預設值、約束。]

```
// 範例格式
Model/Table: [名稱]
├── field_name: type (required|optional, default: value)
├── ...
```

### 2.3 API 設計

[新增或修改的 API endpoint。]

```
[METHOD] /api/path

Request:
{
  "field": "type — 說明"
}

Response (200):
{
  "field": "type — 說明"
}

Errors:
- 400: [情境說明]
- 404: [情境說明]
- 500: [情境說明]
```

### 2.4 前端變更

[元件結構、狀態管理、使用者互動流程。如不涉及前端可移除此區塊。]

### 2.5 整合方式

[與既有系統的串接方式、事件流、資料流。]

### 2.6 錯誤處理

[各環節的錯誤情境與處理策略。]

| 情境 | 處理方式 | 使用者可見行為 |
|------|----------|--------------|
| [情境描述] | [技術處理] | [使用者看到什麼] |

### 2.7 效能考量

[資料量預估、並發情境、快取策略、查詢效能。如無特殊效能需求可移除此區塊。]

### 2.8 Acceptance Scenarios（Gherkin 格式）

> 撰寫規則、禁用詞、TDD 轉換方式的**唯一來源**：`skills/gherkin-scenarios/SKILL.md`
> 本節只提供骨架範例。Spec Agent 撰寫前必須先讀該 skill。
>
> 硬性要求（由 Review Agent Pass 1 Gherkin Gate 檢查）：每個 Requirement ≥1 happy + ≥1 error/edge。

#### Requirement: [需求標題]

The system SHALL [一句話描述系統必須做什麼能力].

##### Scenario: [happy-path 標題]

- GIVEN [前置條件 — 已登入使用者 / 合法輸入 / 系統狀態]
- WHEN [觸發 — API 呼叫 / CLI 指令 / 事件]
- THEN [預期結果 — 系統回傳 / 建立 / 發布什麼]
- AND [附加結果，如有]

##### Scenario: [error-or-edge-case 標題]

- GIVEN [錯誤條件 — 非法輸入 / 缺資源 / 並發存取]
- WHEN [動作]
- THEN [錯誤處理行為 — 錯誤碼 / 訊息 / 回滾]

#### Requirement: [下一個需求標題]

The system SHALL [下一個能力].

##### Scenario: ...

---

> 完整撰寫規則見 `skills/gherkin-scenarios/SKILL.md`。禁用詞清單、跨區塊一致性檢查、TDD 轉換範例皆在該 skill 中集中維護。

---

## 3. 影響範圍

### 3.1 需修改的模組/檔案

| 模組/檔案 | 修改類型 | 說明 |
|-----------|---------|------|
| [路徑] | 新增 / 修改 / 刪除 | [簡述變更內容] |

### 3.2 受影響的既有功能

| 功能 | 影響方式 | 風險程度 |
|------|---------|---------|
| [功能名稱] | [如何被影響] | 高 / 中 / 低 |

### 3.3 測試影響

- 需要新增的測試：[列出]
- 需要修改的測試：[列出]
- 需要確認未受影響的測試：[列出]

---

## 4. 不在範圍內

[明確列出不包含在本次 Spec 中的事項，避免範圍蔓延。]

- [不做的事 1]
- [不做的事 2]

---

## 5. Open Questions

[資訊不足、需要人確認的問題。收斂後此區塊應為空。]

### OQ-1: [問題標題]

**問題**：[具體描述]
**假設**：[目前的假設，如有]
**假設風險**：[假設錯誤的影響]
**分類**：spec-clarification | design-risk | constraint