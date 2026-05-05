# 前端測試規範

> 本文件定義前端 Task 的測試撰寫標準與驗收規範。

---

## 核心原則

1. **測試行為，而非實作**：測試應該描述「使用者看到什麼」，而不是「程式碼怎麼寫」
2. **assertion 必須具體**：杜絕 `.toBeTruthy()`、`.toBeDefined()` 等寬鬆斷言
3. **覆蓋所有路徑**：happy path + error path + edge case
4. **隔離依賴**：使用 mock 隔離外部依賴，確保測試的穩定性

---

## 測試類型與範圍

### 1. 單元測試（Unit Tests）

**對象**：
- 元件渲染（snapshot + behavior）
- Hooks 邏輯（useState、useEffect、useCallback、useMemo）
- 工具函式（pure functions、utilities）

**覆蓋要求**：
- 所有 props 組合的渲染結果
- 所有狀態組合的行為
- 所有 edge cases（空值、邊界值）
- 錯誤邊界（ErrorBoundary）

### 2. 互動測試（Interaction Tests）

**對象**：
- 使用者操作流程（點擊、輸入、拖曳）
- 表單提交與驗證
- 導航與路由

**覆蓋要求**：
- Happy path 操作
- 錯誤输入與驗證
- Loading 狀態
- Error 狀態
- 空狀態

### 3. API 測試（API Tests）

**對象**：
- API 呼叫（fetch、axios）
- 錯誤處理（網路錯誤、timeout、4xx、5xx）
- Request/Response 格式

**覆蓋要求**：
- 成功響應
- 錯誤響應（4xx、5xx）
- Timeout 處理
- 空資料響應

### 4. 整合測試（Integration Tests）

**對象**：
- 多元件協作
- Context / Redux 狀態流
- 路由與頁面導航

**覆蓋要求**：
- 完整的使用者流程
- 跨元件狀態同步
- 路由參數傳遞

---

## 測試檔案結構

```
src/
├── components/
│   └── __tests__/
│       ├── ComponentName.test.tsx
│       └── ComponentName.test.tsx.snap
├── hooks/
│   └── __tests__/
│       └── useCustomHook.test.ts
├── services/
│   └── __tests__/
│       └── api.test.ts
└── utils/
    └── __tests__/
        └── format.test.ts
```

---

## 測試撰寫標準

### 命名規範

```typescript
// 檔案：{ComponentName}.test.tsx
// 描述：[操作] — [預期結果]

describe('ComponentName', () => {
  describe('rendering', () => {
    it('should render default state', () => { ... })
    it('should render loading state', () => { ... })
    it('should render error state', () => { ... })
  })

  describe('interaction', () => {
    it('should call onClick when button is clicked', () => { ... })
    it('should show validation error when input is empty', () => { ... })
  })
})
```

### Good vs Bad Assertions

| Bad | Good |
|-----|------|
| `expect(result).toBeTruthy()` | `expect(result).toEqual({ id: '123', name: 'Test' })` |
| `expect(data).toBeDefined()` | `expect(data).toEqual(expect.arrayContaining([expect.objectContaining({ id: expect.any(String) })]))` |
| `expect(items.length).toBeGreaterThan(0)` | `expect(items).toHaveLength(3)` |

### Mock 規範

```typescript
// 使用 mock 而非 stub
const mockOnClick = jest.fn()

// 乾淨的 mock reset
afterEach(() => {
  jest.clearAllMocks()
})
```

### async/await 測試

```typescript
it('should fetch data successfully', async () => {
  render(<Component />)

  await waitFor(() => {
    expect(screen.getByText('Success')).toBeInTheDocument()
  })
})

it('should handle error gracefully', async () => {
  server.use(
    rest.get('/api/data', (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ error: 'Server Error' }))
    })
  )

  render(<Component />)

  await waitFor(() => {
    expect(screen.getByRole('alert')).toHaveTextContent('Server Error')
  })
})
```

---

## 驗收標準

### 覆蓋率要求

| 類型 | 最低覆蓋率 |
|------|-----------|
| 元件 | 90% |
| Hooks | 95% |
| Services | 90% |
| Utils | 100% |

### Critical Paths

以下路徑**必須**有測試覆蓋：
- 使用者登入 / 登出流程
- 關鍵業務操作（建立、修改、刪除）
- 錯誤恢復流程
- 認證與授權檢查

---

## 反模式（避免）

- ❌ `expect(result).toBeTruthy()` — 太寬鬆
- ❌ 只測 happy path — 必須包含 error 和 edge cases
- ❌ 測試內部實作細節 — 應該測行為
- ❌ 使用 `setTimeout` 做等待 — 用 `waitFor` 或 `findBy`
- ❌ 未隔離外部依賴 — 使用 MSW 或 jest.mock