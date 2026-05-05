#!/usr/bin/env node
/**
 * Helix CLI - Quick Setup Tool
 * Usage: npx franKobayasi/helix
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

function log(msg, color = RESET) {
  console.log(`${color}${msg}${RESET}`);
}

function checkGit() {
  try {
    execSync('git --version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

function createDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    return true;
  }
  return false;
}

function createFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  return false;
}

function main() {
  console.log(`
${CYAN}╔═══════════════════════════════════════════════╗
║        Helix — Agent Development CLI        ║
╚═══════════════════════════════════════════════╝${RESET}
`);

  // Check git
  if (!checkGit()) {
    log('❌ Git is required but not installed.', RED);
    process.exit(1);
  }

  const projectRoot = process.cwd();
  log('📁 Creating directory structure...', CYAN);

  // Create directories
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

  dirs.forEach(dir => createDir(dir));
  log('   ✓ Directories created', GREEN);

  // Create config.yaml
  const configPath = path.join(projectRoot, '.helix/config.yaml');
  const configContent = `# Helix Project Configuration
# Update this file with your project details

project:
  name: "${path.basename(projectRoot)}"
  root: "${projectRoot}"
  language: "typescript"
  framework: "react"

tech_stack:
  frontend:
    framework: "react"
    language: "typescript"
    testing: "jest"
    styling: "css-modules"
  backend:
    framework: "express"
    language: "typescript"
    testing: "jest"
    database: "postgresql"

flow:
  output_dir: ".helix-dev/.spec"
  worktree_root: ".worktrees"
`;

  if (createFile(configPath, configContent)) {
    log('   ✓ .helix/config.yaml created', GREEN);
  } else {
    log('   ⚠ .helix/config.yaml already exists, skipping', YELLOW);
  }

  // Create .gitignore entry
  const gitignorePath = path.join(projectRoot, '.gitignore');
  const helixIgnore = `
# Helix
.helix-dev/
.worktrees/
`;

  if (fs.existsSync(gitignorePath)) {
    const content = fs.readFileSync(gitignorePath, 'utf8');
    if (!content.includes('.helix-dev/')) {
      fs.appendFileSync(gitignorePath, helixIgnore);
      log('   ✓ Added Helix entries to .gitignore', GREEN);
    }
  }

  console.log(`
${GREEN}✅ Helix initialization complete!${RESET}

Next steps:
  ${CYAN}1.${RESET} Review and update ${YELLOW}.helix/config.yaml${RESET}
  ${CYAN}2.${RESET} Start development flow: ${YELLOW}start:helix${RESET}

Files created:
  .helix/config.yaml
  memory/{project,domain,global}/
  skills/{bundled,generated,imported}/
  .worktrees/
`);
}

main();