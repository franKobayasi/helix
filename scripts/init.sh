#!/bin/bash
# Helix 環境初始化腳本

set -e

echo "=== Helix Environment Initialization ==="

# 檢查必要工具
command -v git >/dev/null 2>&1 || { echo "❌ Git is required but not installed." >&2; exit 1; }

# 初始化目錄結構
echo "📁 Creating directory structure..."
mkdir -p .helix
mkdir -p memory/{project,domain,global}
mkdir -p skills/{bundled,generated,imported}
mkdir -p .worktrees

# 檢查 config.yaml 是否存在
if [ ! -f .helix/config.yaml ]; then
  echo "⚠️  No config.yaml found. Creating default..."
  cat > .helix/config.yaml << 'EOF'
# Helix 專案配置
# 請根據實際專案修改

project:
  name: "[專案名稱]"
  root: "$(pwd)"
  language: "[主要語言]"
  framework: "[主要框架]"

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
EOF
  echo "✅ Default config.yaml created at .helix/config.yaml"
else
  echo "✅ config.yaml already exists"
fi

# 初始化 git hooks（如需要）
# echo "🔧 Setting up git hooks..."
# mkdir -p .git/hooks

echo ""
echo "=== Helix Initialization Complete ==="
echo ""
echo "Next steps:"
echo "  1. Review and update .helix/config.yaml"
echo "  2. Run 'helix start' to begin a development flow"
echo ""