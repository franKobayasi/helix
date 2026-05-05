# Review Report: [功能名稱]

> 狀態：[Draft | In Review | Final]
> 版本：v1
> 日期：[YYYY-MM-DD]

---

## Pass 1: Coverage Review

**執行時間**：[ISO timestamp]
**輸入**：spec.md + decisions.md §0（隔離輸入）

### 審查維度

#### 1. 需求覆蓋度

| 需求 | 是否有對應技術規格 | 備註 |
|------|-------------------|------|
| [需求 1] | ✅ / ❌ | [說明] |

#### 2. 邊界條件與錯誤處理

- [ ] 每個 API endpoint 有 error response
- [ ] 每個使用者互動有異常路徑
- [ ] 並發情境有定義
- [ ] 資料邊界有處理

#### 3. Gherkin Gate

**硬性 Gate**：每個 Requirement 必須具備 ≥1 happy + ≥1 error/edge scenario

| Requirement | Happy Path | Error/Edge | 狀態 |
|-------------|-----------|------------|------|
| [Req 1] | ✅ | ✅ | ✅ / ❌ |
| [Req 2] | ✅ | ❌ | ❌ |

#### 4. Open Questions

| OQ | 合理性 | 備註 |
|----|--------|------|
| [OQ-1] | ✅/❌ | [說明] |

### Issue 清單

#### [blocker] Issue 1

**位置**：spec.md §2.N
**問題**：[具體描述]
**原因**：[為什麼是問題]
**建議**：[修復方向]
**Evidence**：`[type]` — [pointer]

#### [warning] Issue 2

...

### Pass 1 結論

✅ PASS / ❌ FAIL

---

## Pass 2: Design Review

**執行時間**：[ISO timestamp]
**輸入**：完整 spec.md + decisions.md + codebase（差異審查）

### 審查維度

#### 4. 設計一致性

[檢查結果]

#### 5. 影響範圍

[檢查結果]

#### 6. 可實作性

[檢查結果]

#### 7. YAGNI 審查

| 元素 | 是否過度設計 | 理由 |
|------|------------|------|
| [元素] | ✅ / ❌ | [理由] |

### Issue 清單

[同 Pass 1 格式]

### Pass 2 結論

✅ PASS / ❌ FAIL

---

## Devil's Advocate Pass

**執行時間**：[ISO timestamp]
**輸入**：spec.md + decisions.md §0（嚴格隔離）

### Questions

#### Question 1: [標題]

**情境**：[具體實作場景]
**Spec 依據**：[spec.md 具體段落]
**可能後果**：
- [後果 1]
- [後果 2]
**Spec 是否有答案**：✅ / ❌

[... Questions 2-3 ...]

### 結論

✅ PASS / ⚠️ {N} 題無答案

---

## Sign-off

### Evidence Summary

| Type | Count |
|------|-------|
| `codebase-ref` | {N} |
| `executed-command` | {M} |
| `reasoning-only` | {K} (降級為 observation) |

### 最終判定

```
✅ APPROVED — [原因]
❌ NOT APPROVED — [原因]
```

**條件確認**：
- [ ] Pass 1 Coverage: ✅
- [ ] Pass 1 Gherkin Gate: ✅
- [ ] Pass 2 Design: ✅
- [ ] Devil's Advocate: ✅
- [ ] 無未解決的 blocker/warning（非 reasoning-only）