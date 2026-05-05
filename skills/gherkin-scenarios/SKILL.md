# Gherkin Scenarios SKILL

> 用於 Acceptance Scenarios（§2.8）的撰寫。定義 Gherkin 格式規則、禁用詞、Coverage Gate 檢查、TDD 轉換方式。

---

## 目的

確保 spec.md §2.8 的 Acceptance Scenarios 完整覆蓋所有功能點，且每個 Requirement 具備 ≥1 happy + ≥1 error/edge scenario，讓 Review Agent Pass 1 可以 gate 這個硬性條件。

---

## Gherkin 格式標準

### 基本結構

```
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
```

### 關鍵字定義

| 關鍵字 | 含義 | 使用時機 |
|--------|------|---------|
| GIVEN | 前置條件 | 系統處於什麼狀態 |
| WHEN | 觸發動作 | 使用者做了什麼 / 系統發生什麼 |
| THEN | 預期結果 | 系統應該怎麼響應 |
| AND | 附加結果 | 額外的預期行為 |

---

## 禁用詞清單

以下詞彙**禁止**出現在 Gherkin Scenario 中：

| 禁用詞 | 原因 | 替代 |
|--------|------|------|
| 「可能」 | 不確定結果 | 明確說明什麼情況 |
| 「如果」 | 模糊條件 | 具體的 GIVEN |
| 「然後」 | 與 THEN 混淆 | 使用 AND |
| 「場景大綱」 | 複雜度過高 | 拆成多個 Scenario |
| 「例子」 | 與 Scenario 混淆 | 使用具體的 Scenario |
| 「假設」 | 語意不清 | 使用 GIVEN |
| 「應該」 | 測試語言，非規格語言 | 使用 SHALL / WILL |

---

## Coverage Gate（硬性檢查）

### 規則

每個 Requirement **必須**具備：
- ≥1 happy-path scenario
- ≥1 error-or-edge-case scenario

若任一 Requirement 未滿足，Review Agent Pass 1 判 **FAIL**，不進入 Pass 2。

### 覆蓋表格式

```markdown
| Requirement | Happy Path | Error/Edge | 狀態 |
|-------------|-----------|------------|------|
| REQ-1: [功能] | ✅ Scenario-1 | ✅ Scenario-2 | ✅ |
| REQ-2: [功能] | ❌ 缺少 | — | ❌ FAIL |
```

### 判定邏輯

| 狀況 | 判定 |
|------|------|
| 所有 Req 有 happy + error/edge | ✅ PASS |
| 任一 Req 缺少 happy 或 error/edge | ❌ FAIL |

---

## 跨區塊一致性檢查

### 檢查規則

1. **Scope 一致性**：Scenario 中的行為不能超出 §4 不在範圍內
2. **資料一致性**：GIVEN 中的初始狀態必須與 §2.2 資料模型一致
3. **錯誤碼一致性**：Scenario 中的錯誤行為必須與 §2.6 錯誤處理一致
4. **API 一致性**：Scenario 中引用的 API 必須在 §2.3 有定義

### 一致性 Issue 格式

```markdown
### [blocker] Consistency Issue: [標題]

**位置**：§2.8 [Scenario 名稱]
**問題**：Scenario 引用了 [X]，但 [Y] 中未定義
**建議**：在 [Y] 中新增 [X] 的定義
```

---

## TDD 轉換範例

### Scenario → Test Case

```gherkin
##### Scenario: Create user with valid input

- GIVEN valid email "test@example.com" and name "Test User"
- WHEN POST /api/users is called with {email, name}
- THEN response status is 201
- AND response body contains {id, email, name}
```

```typescript
// 轉換為測試
it('should create user with valid input', async () => {
  const res = await request(app)
    .post('/api/users')
    .send({ email: 'test@example.com', name: 'Test User' })

  expect(res.status).toBe(201)
  expect(res.body).toMatchObject({
    id: expect.any(String),
    email: 'test@example.com',
    name: 'Test User'
  })
})
```

### Error Scenario → Test Case

```gherkin
##### Scenario: Reject invalid email format

- GIVEN invalid email "not-an-email"
- WHEN POST /api/users is called
- THEN response status is 400
- AND response body contains {error: "ValidationError"}
```

```typescript
it('should reject invalid email format', async () => {
  const res = await request(app)
    .post('/api/users')
    .send({ email: 'not-an-email', name: 'Test' })

  expect(res.status).toBe(400)
  expect(res.body).toMatchObject({
    error: 'ValidationError'
  })
})
```

---

## 常見錯誤

### 錯誤 1：只寫 Happy Path

```gherkin
# ❌ 錯誤：只有 happy path
- GIVEN valid input
- WHEN API is called
- THEN success response
```

```gherkin
# ✅ 正確：包含 error scenario
- GIVEN valid input
- WHEN API is called
- THEN success response

- GIVEN invalid input
- WHEN API is called
- THEN error response with 400
```

### 錯誤 2：模糊的 GIVEN

```gherkin
# ❌ 錯誤：GIVEN 太模糊
- GIVEN the system is ready
- WHEN user submits form
- THEN success
```

```gherkin
# ✅ 正確：GIVEN 具體
- GIVEN user is authenticated with token "abc123"
- AND form has field "email" with value "test@example.com"
- WHEN user submits the form
- THEN response status is 200
```

### 錯誤 3：複雜的 Scenario Outline

```gherkin
# ❌ 錯誤：場景大綱太複雜
Scenario Outline: multiple inputs
  Given <user> is <state>
  When they <action> with <param>
  Then result is <result>
```

```gherkin
# ✅ 正確：拆成多個 Scenario
Scenario: valid user submits form
  Given user is authenticated
  When they submit form with valid data
  Then success response

Scenario: guest submits form
  Given user is not authenticated
  When they submit form
  Then error response with 401
```

---

## 反模式（避免）

- ❌ 只寫 happy path → ✅ 每個 Requirement 必須有 happy + error/edge
- ❌ 使用禁用詞 → ✅ 嚴格遵守禁用詞清單
- ❌ Scenario 超出 Spec scope → ✅ 檢查 §4 不在範圍內
- ❌ 引用未定義的 API 或欄位 → ✅ 確保一致性檢查通過