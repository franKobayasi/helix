#!/usr/bin/env node
/**
 * Helix CLI - Quick Setup & Framework Detection
 * Usage: npx @franKobayasi/helix
 */

const fs = require('fs');
const path = require('path');

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

function log(msg, color = RESET) {
  console.log(`${color}${msg}${RESET}`);
}

function checkGit() {
  try {
    require('child_process').execSync('git --version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

function getHelixAgentContent(helixRelativePath) {
  return `# Agent

> 本專案使用 **Helix** 框架進行 agent-driven 開發。

---

## Helix Framework

### Slash Command

所有 Helix 命令皆以 \`/helix:\` 開頭：

| Command | 說明 |
|---------|------|
| \`/helix:dev <需求>\` | 觸發開發流程，自動推進 |
| \`/helix:status\` | 查看當前進度 |
| \`/helix:resume\` | 從斷點恢復 |
| \`/helix:spec\` | Spec 階段 |
| \`/helix:plan\` | Plan 階段 |
| \`/helix:implement\` | 實作階段 |
| \`/helix:verify\` | 整合驗證 |
| \`/helix:review\` | 程式碼審查 |

### 啟動方式

當使用者輸入 \`/helix:dev <需求描述>\` 時，自動執行：

1. **Phase 1: Spec** — 載入 \`${helixRelativePath}/agents/spec-agent.md\` 與 \`${helixRelativePath}/agents/review-agent.md\`，驅動 Spec-Review 對抗式迴圈
2. **Phase 2: Plan** — 載入 \`${helixRelativePath}/agents/plan-agent.md\` 與 \`${helixRelativePath}/agents/review-agent.md\`（Plan Review 模式）
3. **Phase 3: Implement** — 依 Task 類型載入 \`${helixRelativePath}/agents/frontend-agent.md\` 或 \`${helixRelativePath}/agents/backend-agent.md\`，搭配 \`${helixRelativePath}/agents/qa-agent.md\` 進行 TDD + 即時驗證
4. **Phase 4: Integration Verify** — 載入 \`${helixRelativePath}/agents/qa-agent.md\`（整合驗證模式）
5. **Phase 5: Review & Handoff** — 載入 \`${helixRelativePath}/agents/review-agent.md\`，最終程式碼審查與交付準備

流程自動推進，僅在 \`spec-clarification\`、\`design-risk\`、\`constraint\` 時暫停詢問。

### Agent 定義檔

所有 agent 定義位於 \`${helixRelativePath}/agents/\`：

| Agent | 檔案 | 職責 |
|-------|------|------|
| Spec Agent | \`spec-agent.md\` | 需求轉化為技術規格 |
| Review Agent | \`review-agent.md\` | 規格/計畫/程式碼審查（多模式） |
| Plan Agent | \`plan-agent.md\` | Spec 拆解為 Task |
| Frontend Agent | \`frontend-agent.md\` | 前端實作 |
| Backend Agent | \`backend-agent.md\` | 後端實作 |
| QA Agent | \`qa-agent.md\` | 測試撰寫 + 驗證 + 整合驗證（多模式） |

### 產出目錄

所有產出文件放在工作區根目錄的 \`.helix-dev/.spec/{YYYYMMDD}-{slug}/\` 中。

### 繼續進行 (Resume)

當使用者輸入 \`/helix:resume\` 時：

1. 掃描 \`.helix-dev/.spec/\` 下的 folder，找到最近更新的 \`progress.md\`
2. 根據 YAML frontmatter 中的 \`current_phase\` 和 \`current_step\` 判斷當前位置
3. 讀取對應階段的產出檔案以重建上下文
4. 從斷點處繼續執行
`;
}

function getClaudeMdContent(helixRelativePath) {
  return `# Project Context

本專案使用 **Helix** 框架進行 agent-driven 開發。

---

## Helix Framework

### 啟動方式

輸入 `/helix:dev <需求描述>` 即可啟動 Helix 開發流程，流程會自動推進。

| Command | 說明 |
|---------|------|
| \`/helix:dev <需求>\` | 觸發開發流程（自動推進） |
| \`/helix:status\` | 查看當前進度 |
| \`/helix:resume\` | 從斷點恢復 |
| \`/helix:spec\` | Spec 階段 |
| \`/helix:plan\` | Plan 階段 |
| \`/helix:implement\` | 實作階段 |
| \`/helix:verify\` | 整合驗證 |
| \`/helix:review\` | 程式碼審查 |

詳見 \`${helixRelativePath}/AGENT.md\`。
`;
}

function main() {
  console.log(`
${CYAN}╔═══════════════════════════════════════════════╗
║        Helix — Agent Development CLI        ║
╚═══════════════════════════════════════════════╝${RESET}
`);

  if (!checkGit()) {
    log('❌ Git is required but not installed.', RED);
    process.exit(1);
  }

  const rootDir = process.cwd();
  // Where this Helix package is installed (from node_modules or git clone)
  const helixFrameworkDir = path.resolve(__dirname, '..');
  const helixRelativePath = path.relative(rootDir, helixFrameworkDir);

  log('🔍 Checking project setup...', CYAN);
  console.log('');

  let createdAgent = false;
  let enhancedAgent = false;
  let createdClaude = false;
  let enhancedClaude = false;

  // Handle AGENT.md
  const agentPath = path.join(rootDir, 'AGENT.md');
  if (fs.existsSync(agentPath)) {
    const content = fs.readFileSync(agentPath, 'utf8');
    if (content.includes('## Helix Framework')) {
      log('✓ AGENT.md already has Helix Framework section', GREEN);
    } else {
      fs.appendFileSync(agentPath, `\n\n---\n\n## Helix Framework\n\n本專案使用 **Helix** 框架進行 agent-driven 開發。\n\n詳見 \`${helixRelativePath}/AGENT.md\`。\n`);
      enhancedAgent = true;
      log('✓ AGENT.md enhanced with Helix reference', GREEN);
    }
  } else {
    // Create new AGENT.md with Helix as primary content
    fs.writeFileSync(agentPath, getHelixAgentContent(helixRelativePath));
    createdAgent = true;
    log('✓ AGENT.md created with Helix Framework', GREEN);
  }

  // Handle CLAUDE.md
  const claudePath = path.join(rootDir, 'CLAUDE.md');
  if (fs.existsSync(claudePath)) {
    const content = fs.readFileSync(claudePath, 'utf8');
    if (content.includes('## Helix Framework')) {
      log('✓ CLAUDE.md already has Helix Framework section', GREEN);
    } else {
      fs.appendFileSync(claudePath, `\n\n---\n\n## Helix Framework\n\n本專案使用 **Helix** 框架。詳見 \`${helixRelativePath}/AGENT.md\`。\n\n啟動方式：說「start helix」或「start:helix」\n`);
      enhancedClaude = true;
      log('✓ CLAUDE.md enhanced with Helix reference', GREEN);
    }
  } else {
    // Create new CLAUDE.md with Helix context
    fs.writeFileSync(claudePath, getClaudeMdContent(helixRelativePath));
    createdClaude = true;
    log('✓ CLAUDE.md created with Helix Framework', GREEN);
  }

  console.log('');

  // Create Helix directory structure
  log('📁 Creating Helix directory structure...', CYAN);

  const dirs = [
    '.helix',
    'memory/project',
    'memory/domain',
    'memory/global',
    'skills/bundled',
    'skills/generated',
    'skills/imported',
    '.worktrees'
  ];

  dirs.forEach(dir => {
    const dirPath = path.join(rootDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
  log('   ✓ Directory structure ready', GREEN);

  // Create config.yaml
  const configPath = path.join(rootDir, '.helix/config.yaml');
  if (!fs.existsSync(configPath)) {
    const configContent = `# Helix Project Configuration

project:
  name: "${path.basename(rootDir)}"
  root: "${rootDir}"
  language: "typescript"
  framework: ""

tech_stack:
  frontend:
    framework: ""
    language: ""
    testing: ""
  backend:
    framework: ""
    language: ""
    testing: ""
    database: ""
`;
    fs.writeFileSync(configPath, configContent);
    log('   ✓ .helix/config.yaml created', GREEN);
  }

  // Update .gitignore
  const gitignorePath = path.join(rootDir, '.gitignore');
  const helixIgnore = `
# Helix
.helix-dev/
.worktrees/
`;
  if (fs.existsSync(gitignorePath)) {
    const content = fs.readFileSync(gitignorePath, 'utf8');
    if (!content.includes('.helix-dev/')) {
      fs.appendFileSync(gitignorePath, helixIgnore);
      log('   ✓ .gitignore updated', GREEN);
    }
  }

  console.log('');
  log('✅ Helix setup complete!', GREEN);
  console.log('');

  // Summary
  log('Summary:', BOLD);
  if (createdAgent) {
    log('   • AGENT.md created with full Helix Framework', GREEN);
  } else if (enhancedAgent) {
    log('   • AGENT.md enhanced with Helix', GREEN);
  } else {
    log('   • AGENT.md already has Helix', YELLOW);
  }

  if (createdClaude) {
    log('   • CLAUDE.md created with Helix context', GREEN);
  } else if (enhancedClaude) {
    log('   • CLAUDE.md enhanced with Helix', GREEN);
  } else {
    log('   • CLAUDE.md already has Helix', YELLOW);
  }

  console.log('');
  log('Next steps:', BOLD);
  console.log('   1. Review .helix/config.yaml');
  console.log('   2. Say "start:helix" to begin development flow');
  console.log('');
}

main();