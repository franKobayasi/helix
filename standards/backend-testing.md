# 後端測試規範

> 本文件定義後端 Task 的測試撰寫標準與驗收規範。

---

## 核心原則

1. **測試行為，而非實作**：測試應該描述「API 回傳什麼」，而不是「程式碼怎麼寫」
2. **assertion 必須具體**：杜絕 `.toBeTruthy()`、`.toBeDefined()` 等寬鬆斷言
3. **隔離依賴**：使用 mock/fixture 隔離外部依賴（DB、外部服務）
4. **不可逆操作需要 Transaction**：測試中的寫入操作必須包在 transaction 中，測試後 rollback

---

## 測試類型與範圍

### 1. 單元測試（Unit Tests）

**對象**：
- Service layer 邏輯
- 工具函式（validation、transformation）
- Business rules

**覆蓋要求**：
- 正常流程
- 邊界條件（空值、最大值、特殊字元）
- 錯誤處理路徑

### 2. API 測試（API Tests）

**對象**：
- Endpoint 的 request/response 驗證
- HTTP status code
- Error response 格式
- 驗證規則（input validation）

**覆蓋要求**：
- 成功響應（200/201）
- 驗證錯誤（400）
- 未授權（401）
- 禁止（403）
- 找不到（404）
- 伺服器錯誤（500）

### 3. 整合測試（Integration Tests）

**對象**：
- 資料庫操作（CRUD）
- 外部服務互動（mock 或 test containers）
- Transaction 行為

**覆蓋要求**：
- Happy path 操作
- 衝突處理（並發、deadlock）
- Rollback 行為
- Migration 正確性

---

## 測試檔案結構

```
src/
├── services/
│   └── __tests__/
│       └── UserService.test.ts
├── controllers/
│   └── __tests__/
│       └── UserController.test.ts
├── models/
│   └── __tests__/
│       └── User.test.ts
└── utils/
    └── __tests__/
        └── validation.test.ts
```

---

## 測試撰寫標準

### 命名規範

```typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid input', async () => { ... })
    it('should throw ValidationError for invalid email', async () => { ... })
    it('should throw ConflictError for duplicate email', async () => { ... })
  })
})
```

### API 測試範例

```typescript
describe('POST /api/users', () => {
  it('should create user and return 201', async () => {
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

  it('should return 400 for missing required fields', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com' }) // missing name

    expect(res.status).toBe(400)
    expect(res.body).toMatchObject({
      error: 'ValidationError',
      message: expect.any(String)
    })
  })
})
```

### Database Tests

```typescript
describe('UserRepository', () => {
  let db: TestDatabase

  beforeEach(async () => {
    db = await TestDatabase.create()
  })

  afterEach(async () => {
    await db.cleanup()
  })

  it('should create user and persist to database', async () => {
    const user = await db.getRepository(User).create({
      email: 'test@example.com',
      name: 'Test'
    })

    const saved = await db.getRepository(User).save(user)
    const found = await db.getRepository(User).findOne(saved.id)

    expect(found).toMatchObject({
      id: saved.id,
      email: 'test@example.com'
    })
  })
})
```

---

## 驗收標準

### 覆蓋率要求

| 類型 | 最低覆蓋率 |
|------|-----------|
| Service layer | 95% |
| Controllers | 90% |
| Models | 80% |
| Utils | 100% |

### Critical Paths

以下路徑**必須**有測試覆蓋：
- 所有 API endpoints
- 所有 CRUD 操作
- 所有驗證規則
- 所有錯誤處理路徑
- Authentication / Authorization

---

## 反模式（避免）

- ❌ `expect(result).toBeTruthy()` — 太寬鬆，應該驗證具體欄位
- ❌ 直接測試真實資料庫 — 使用 transaction rollback 或 test containers
- ❌ 未 mock 外部服務 — 使用 nock 或 msw
- ❌ 測試內部實作細節 — 應該測 public API
- ❌ Hardcoded timestamps — 使用 mock date
- ❌ 測試中的 sleep — 使用 ready promise 或 health check