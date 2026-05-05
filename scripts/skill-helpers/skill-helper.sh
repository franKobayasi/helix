#!/bin/bash
# SKILL 執行輔助腳本

set -e

SKILL_NAME="${1:-}"
SKILL_PATH="${2:-}"

if [ -z "$SKILL_NAME" ]; then
  echo "Usage: skill-helper.sh <skill-name> [skill-path]"
  echo ""
  echo "Available bundled skills:"
  ls -la skills/brainstorm/ 2>/dev/null || echo "  (none)"
  ls -la skills/gherkin-scenarios/ 2>/dev/null || echo "  (none)"
  ls -la skills/evidence-classification/ 2>/dev/null || echo "  (none)"
  exit 1
fi

# 根據 skill 名稱決定路徑
case "$SKILL_NAME" in
  brainstorm)
    SKILL_FILE="skills/brainstorm/SKILL.md"
    ;;
  gherkin-scenarios)
    SKILL_FILE="skills/gherkin-scenarios/SKILL.md"
    ;;
  evidence-classification)
    SKILL_FILE="skills/evidence-classification/SKILL.md"
    ;;
  *)
    SKILL_FILE="${SKILL_PATH:-$SKILL_NAME/SKILL.md}"
    ;;
esac

if [ ! -f "$SKILL_FILE" ]; then
  echo "❌ SKILL not found: $SKILL_FILE"
  exit 1
fi

echo "📖 Loading SKILL: $SKILL_NAME"
echo "---"
cat "$SKILL_FILE"
echo "---"
echo "✅ SKILL loaded: $SKILL_FILE"