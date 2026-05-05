# Voice & Tone Standards

> 這是 Helix 框架的溝通標準。所有 Agent 產出必須遵循這些標準。

---

## 核心原則

1. **具體取代模糊**：有檔案名、行號、數字
2. **驗證後再下結論**：不說「應該可以」
3. **短段落、真實引用**：每段不超過 5 行
4. **可操作的建議**：每個問題附上具體修復方向

---

## 語言規則

### ✅ Good

```markdown
**位置**：spec.md:42
**問題**：`cache` 欄位在 API response 中未定義，但 §2.3 的步驟 3 引用了它
**影響**：前端無法正確快取響應資料
**建議**：在 §2.3 的 Response schema 中新增 `cache: boolean` 欄位
```

### ❌ Bad

```markdown
**問題**：這部分的設計有點問題

**建議**：需要更多考慮
```

---

## 禁用詞

以下詞彙在正式產出中禁止使用：

| 禁用詞 | 替代 |
|--------|------|
| 「應該」 | 「確認」/「已驗證」 |
| 「可能」 | 「觀察到」/「證據顯示」 |
| 「我覺得」 | 「根據 evidence」/「codebase-ref 顯示」 |
| 「大概」 | 「95% confidence」/「根據 X 推估」 |
| 「很不清楚」 | 具體描述「哪裡不清楚」 |
| 「需要更多細節」 | 具體指出「缺少什麼細節」 |

---

## 引用格式

### 檔案引用

```markdown
`src/services/user.ts:42` — 引用特定行
`src/services/user.ts` — 引用整個檔案
`spec.md §2.3` — 引用特定 section
```

### Evidence 引用

```markdown
| evidence_type | 值 |
|--------------|-----|
| `codebase-ref` | `src/services/user.ts:42` |
| `executed-command` | `npm test -- --coverage` |
| `reasoning-only` | [推論，evidence level 最低] |
```

---

## 問答格式

### 強制選項題（Forcing Question）

```
[{feature-name}] Question {N}/~{估計總題數} — Clarity: {completeness}%

CONTEXT: {1 句重建上下文 — 目前在釐清哪個維度}

{forcing question — 先說 YOUR 的建議立場，再問}

  A) {推薦選項 — 附理由}
  B) {替代選項}
  C) {另一個替代，如適用}
  D) Skip — 你決定就好
  S) Stop — 剩下的先不管，進入合成
```

### 回答處理

| 回應 | 處理 |
|------|------|
| A/B/C | 納入答案、重評維度分數 |
| D (Skip) | 記錄 YOUR 建議為決策、重評、繼續 |
| S (Stop) | 所有剩餘維度記錄 best-guess 為決策，進入下一步 |
| 自由回答 | 納入、重評、繼續 |

---

## 報告格式

### Issue 格式

```markdown
### [SEVERITY] Issue 標題

**位置**：{檔案}:{行號} 或 {section}
**問題**：具體描述發現了什麼問題
**原因**：為什麼這是一個問題（影響是什麼）
**建議**：建議的解決方向（如果有的話）
**Evidence**：`{type}` — {pointer}
```

### Verdict 格式

```markdown
## {TaskName} Verification

### Status: DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED

### 統計
- 測試：[N] passed / [M] failed
- Linter：[N] errors / [M] warnings
- AC Coverage：[N] covered / [M] partial / [K] missing

### 失敗項目（如有）
| 項目 | 類型 | 說明 | 建議修復方式 |
|------|------|------|------------|
```

---

## 反模式（避免）

- ❌ 模糊描述：說「這部分需要更多考慮」而不是「§2.3 缺少 X 欄位」
- ❌ 無 evidence 的結論：「應該可以」而不是「已驗證通過」
- ❌ 過長的段落：每段超過 5 行就應該拆分
- ❌ 假設讀者知道：永遠提供必要的上下文