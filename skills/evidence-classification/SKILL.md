# Evidence Classification SKILL

> 用於 Review Agent 的 issue 產出。定義 evidence 類型、等級、格式要求，確保每條 issue 都有充分的證據支撐。

---

## 目的

避免 Review Agent 產出「reasoning-only」的 issue（只有推論，無實際證據）。所有 blocker/warning 級別的 issue 必須有非 reasoning-only 的 evidence，否則自動降級為 observation，不能 block sign-off。

---

## Evidence 類型

| Type | 說明 | 等級 |
|------|------|------|
| `codebase-ref` | 實際程式碼引用（檔案:行號） | 高 |
| `executed-command` | 實際執行的命令及輸出 | 高 |
| `spec-ref` | Spec 內部引用（§2.3 API 定義） | 中 |
| `prior-art` | 既有 pattern 或慣例引用 | 中 |
| `user-clarification` | 人的明確回答或確認 | 高 |
| `reasoning-only` | 純推論，無實際證據 | 低 |

---

## Evidence 等級與效力

| Evidence Type | 可以 block sign-off? | 可以成為 blocker/warning? |
|---------------|---------------------|--------------------------|
| `codebase-ref` | ✅ 是 | ✅ 是 |
| `executed-command` | ✅ 是 | ✅ 是 |
| `spec-ref` | ⚠️ 需配合其他 evidence | ⚠️ 需配合其他 evidence |
| `prior-art` | ❌ 否（只是慣例） | ⚠️ 僅作為 warning |
| `user-clarification` | ✅ 是 | ✅ 是 |
| `reasoning-only` | ❌ 否 | ❌ 否（自動降為 observation） |

---

## Issue 格式規範

每條 issue 必須包含：

```markdown
### [SEVERITY] Issue 標題

**位置**：spec.md §2.3 或 src/services/user.ts:42
**問題**：具體描述發現了什麼問題
**原因**：為什麼這是一個問題（影響是什麼）
**建議**：建議的解決方向（如果有的話）
**Evidence**：`{type}` — {pointer}
```

### Example

```markdown
### [blocker] cache 欄位未定義

**位置**：spec.md §2.3 Response Schema
**問題**：`cache` 欄位在 API response 中未定義，但 §2.3 的步驟 3 引用了它
**原因**：前端無法正確快取響應資料，會導致實作時需要回头补定义
**建議**：在 §2.3 的 Response schema 中新增 `cache: boolean` 欄位
**Evidence**：`spec-ref` — §2.3 步驟 3 引用了 `cache` 欄位，但 Schema 中未定義
```

---

## 降級規則

### reasoning-only 自動降級

若 issue 的 evidence_type 全為 `reasoning-only`，自動降級為 `observation`：

```markdown
### [observation] 設計可能不是最優

**問題**：方案 A 使用快取，方案 B 不使用
**原因**：快取可能增加複雜度

<!-- 此 issue 為 reasoning-only，降級為 observation，不 block sign-off -->
```

### 組合 evidence

若 issue 只有 `spec-ref` 或 `prior-art`，需要至少 2 個 evidence 才能成為 warning：

```markdown
### [warning] API 命名不一致

**位置**：spec.md §2.3
**問題**：createUser 和 create_new_user 兩種命名風格
**Evidence**：
- `spec-ref` — §2.3.1 使用 createUser
- `prior-art` — src/services/user.ts 使用 createUser 風格

<!-- 需要至少 2 個 evidence 才能成為 warning -->
```

---

## Review Report Evidence Summary

在 review-report 的 sign-off 區塊，必須包含 Evidence 分布統計：

```markdown
### Evidence Summary

| Type | Count |
|------|-------|
| `codebase-ref` | 5 |
| `executed-command` | 2 |
| `spec-ref` | 3 |
| `prior-art` | 1 |
| `reasoning-only` | 4 (降級為 observation) |

**Blocker/Warning 有效性**：所有 blocker/warning 皆有非 reasoning-only evidence
```

---

## Sign-off 判定規則

### 有效的 blocker/warning

以下條件**同時滿足**時，blocker/warning 才能有效：
- 有非 `reasoning-only` 的 evidence
- 證據指向具體位置（檔案:行號 或 §section）
- 問題描述清晰、可操作

### 無效的 blocker/warning（降級）

以下情況自動降級為 observation：
- evidence 全為 `reasoning-only`
- 問題描述模糊（「這部分可能需要更多考慮」）
- 無具體位置指向

### Sign-off 条件

```
✅ APPROVED — 所有 blocker/warning 皆有非 reasoning-only evidence
❌ NOT APPROVED — 有 blocker/warning 為 reasoning-only（降為 observation 但仍阻擋）
```

---

## 反模式（避免）

- ❌ reasoning-only 的 issue → ✅ 每條 issue 必須有實際證據
- ❌ 模糊的問題描述 → ✅ 具體說明「哪裡有問題」和「為什麼」
- ❌ 無具體位置的 issue → ✅ 必須指向檔案:行號 或 §section
- ❌ 單一 evidence 就 block → ✅ 需根據 evidence 等級判斷是否足够