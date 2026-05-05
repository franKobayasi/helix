# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-05-06

### Added

- **AGENT.md** - Main entry point with Helix Framework orchestration
- **.helix/config.yaml** - Project configuration
- **7 Agent definitions** (`agents/`) - spec, plan, frontend, backend, qa, review, devils-advocate
- **3 Bundled SKILLs** (`skills/`) - brainstorm, gherkin-scenarios, evidence-classification
- **3 Standards** (`standards/`) - frontend-testing, backend-testing, voice-tone
- **7 Output templates** (`templates/`) - spec, plan, task, progress, review-report, decisions, solution
- **3-tier Memory hierarchy** (`memory/`) - project, domain, global
- **Utility scripts** (`scripts/`) - init.sh, skill-helpers
- **Node.js CLI** (`bin/helix.js`) - npx setup tool

### Features

- **Scope Classification** - Lightweight/Standard/Deep pipeline routing
- **Two-stage Spec** - Stage A (understanding) + Stage B (technical design)
- **Dual-pass Review** - Coverage Review + Design Review
- **Independent Devil's Advocate** - Separate adversarial review agent
- **Verification Gate** - No claims without fresh evidence
- **4 Status Protocol** - DONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED
- **Escalation Protocol** - 3-strike rule with fresh context retry
- **TDD with Worktree** - Isolated task development
- **Spec Review Isolation** - QA verification without Dev self-review
- **Resume Protocol** - Interrupt recovery via progress.md

### Framework Integration

- Document-First architecture
- Progressive disclosure loading
- Knowledge persistence (project/domain/global)
- SKILL system (bundled/generated/imported)

## [0.0.1] - 2026-04-18

### Added

- Initial project setup
- v1 README with framework description