---
name: helix
preamble-tier: 2
version: 1.0.0
description: |
  Helix agent-driven development framework. Use to start development flows, check status,
  resume interrupted flows, or trigger specific phases (spec, plan, implement, verify, review).
  Triggers: "start a development flow", "begin a new feature", "I need to build something",
  "/helix dev", "/helix status", "/helix resume", "/helix spec", "/helix plan",
  "/helix implement", "/helix verify", "/helix review"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Agent
  - TaskCreate
  - TaskUpdate
  - TaskList
  - TeamCreate
  - SendMessage
  - AskUserQuestion
---

## Helix Framework

Helix is an agent-driven development framework that provides structured development workflows with quality gates, knowledge persistence, and intelligent agent coordination.

### Available Commands

| Command | Description |
|---------|-------------|
| `/helix dev <requirement>` | Start a new development flow with automatic progression |
| `/helix status` | Show current development progress |
| `/helix resume` | Resume from an interrupted flow |
| `/helix spec` | Trigger Spec phase (requirement → technical specification) |
| `/helix plan` | Trigger Plan phase (spec → tasks) |
| `/helix implement` | Trigger Implementation phase (TDD + QA) |
| `/helix verify` | Trigger Integration Verification phase |
| `/helix review` | Trigger Code Review phase |

### Development Flow Overview

```
Requirement Input
       │
       ▼
┌──────────────────────────────────────────────┐
│ Phase 1: Spec                                 │
│  Requirement Understanding → Technical Spec    │
│  Review Loop (3 passes max)                   │
└──────────────────────────────────────────────┘
       │ Pass
       ▼
┌──────────────────────────────────────────────┐
│ Phase 2: Plan                                 │
│  Task Breakdown → Plan Review                │
└──────────────────────────────────────────────┘
       │ Pass
       ▼
┌──────────────────────────────────────────────┐
│ Phase 3: Implement                            │
│  TDD per Task → QA Verification              │
│  Independent worktree per task                │
└──────────────────────────────────────────────┘
       │ All Tasks Done
       ▼
┌──────────────────────────────────────────────┐
│ Phase 4: Integration Verify                  │
│  Smoke Test → Spec Trace → Regression        │
└──────────────────────────────────────────────┘
       │ Pass
       ▼
┌──────────────────────────────────────────────┐
│ Phase 5: Review & Handoff                     │
│  Code Review → Delivery Prep → Knowledge     │
└──────────────────────────────────────────────┘
```

### Scope Classification

Helix automatically classifies requirements:

| Score | Type | Pipeline |
|-------|------|----------|
| 0-2 | **Lightweight** | Skip Spec/Plan, directly Implement + QA |
| 3-5 | **Standard** | Full 5-phase pipeline |
| 6-10 | **Deep** | Full pipeline, deeper Spec clarification |

### Output Directory

All outputs are stored in `.helix-dev/.spec/{YYYYMMDD}-{slug}/`:
- `progress.md` — Flow state tracking
- `spec.md` — Technical specification
- `decisions.md` — Key decisions and risk acceptance
- `review-report.md` — Review report
- `plan.md` — Task list with dependency graph
- `task-001.md` ... `task-NNN.md` — Individual task specs
- `verification-report.md` — Integration verification report
- `code-review-report.md` — Code review report
- `solution.md` — Knowledge沉淀

### Status Protocol

Each task/agent ends in one of four states:

| State | Meaning | Next Step |
|-------|---------|-----------|
| `DONE` | All AC passed, tests passed | Proceed to next |
| `DONE_WITH_CONCERNS` | Done but with known issues | Record concerns, continue |
| `NEEDS_CONTEXT` | Missing specific info | Supply and re-dispatch |
| `BLOCKED` | Cannot complete | Assess critical path |

### Verification Gate

**Completion claims must include fresh verification evidence.**

```
❌ Forbidden: "I just verified it"
✅ Correct: Paste full test output, then say "all passed"
```

---

## Command Handlers

### /helix dev

When user requests to start a development flow:

1. **Parse the requirement** from the arguments
2. **Run Scope Classification** (5 dimensions, 0-2 each)
3. **Create output directory**: `.helix-dev/.spec/{YYYYMMDD}-{slug}/`
4. **Write initial progress.md** with YAML frontmatter:
   ```yaml
   ---
   current_phase: spec
   current_step: scope-classification
   status: in-progress
   scope: {type}
   score: {N}/10
   ---
   ```
5. **Proceed based on scope**:
   - **Lightweight**: Direct to Phase 3 Implement
   - **Standard/Deep**: Full pipeline with Stage A (requirement understanding) → Stage B (technical spec) → Review → Plan → Implement

6. **Spawn agents as needed** for each phase using the agent definitions in `skills/bundled/helix/agents/`

### /helix status

1. **Find the most recent spec folder**: `ls -t .helix-dev/.spec/ | head -1`
2. **Read progress.md** and display:
   - Current phase and step
   - Status (in-progress, blocked-on-human, completed)
   - Scope classification
   - Last checkpoint timestamp
3. **Show pending questions** if status is `blocked-on-human`

### /helix resume

1. **Find the most recent spec folder** with `status: in-progress`
2. **Read progress.md** YAML frontmatter to determine `current_phase` and `current_step`
3. **Read the relevant phase output files** to reconstruct context
4. **Continue from the checkpoint** using the appropriate agent

### /helix spec

Trigger Phase 1 (Spec) directly:
1. Load `flows/01-req-spec.md` and `agents/spec-agent.md`
2. Run Stage A (requirement understanding) with clarity scoring
3. Run Stage B (technical specification) with plan comparison
4. Run Review Agent (dual-pass + devil's advocate)
5. Collect and present Open Questions to human

### /helix plan

Trigger Phase 2 (Plan) directly:
1. Load `flows/02-plan.md` and `agents/plan-agent.md`
2. Read the completed `spec.md`
3. Generate task breakdown with dependencies
4. Present plan for review

### /helix implement

Trigger Phase 3 (Implement) directly:
1. Load the appropriate agent (`frontend-agent.md` or `backend-agent.md`)
2. For each task: TDD → Implement → QA Verification
3. Use independent git worktree per task
4. Merge to integration branch when all tasks complete

### /helix verify

Trigger Phase 4 (Integration Verify) directly:
1. Load `flows/04-integration-verify.md` and `agents/qa-agent.md`
2. Run smoke tests
3. Trace Spec acceptance scenarios
4. Run cross-task integration tests
5. Run regression tests

### /helix review

Trigger Phase 5 (Review) directly:
1. Load `agents/review-agent.md`
2. Run code review with at least 2 codebase references per concern
3. Generate `code-review-report.md`
4. Present findings and Handoff items

---

## Agent Definitions

| Agent | File | Responsibility |
|-------|------|----------------|
| Spec Agent | `agents/spec-agent.md` | Requirement → Technical specification |
| Plan Agent | `agents/plan-agent.md` | Spec → Parallel tasks |
| Frontend Agent | `agents/frontend-agent.md` | Frontend implementation (TDD) |
| Backend Agent | `agents/backend-agent.md` | Backend implementation (TDD) |
| QA Agent | `agents/qa-agent.md` | Test authoring + verification |
| Review Agent | `agents/review-agent.md` | Spec/Plan/Code review |
| Devil's Advocate | `agents/devils-advocate-agent.md` | Independent adversarial review |

---

## Memory Integration

Helix uses a three-tier memory system:

| Tier | Path | Contents |
|------|------|----------|
| Project | `memory/project/` | Single project knowledge |
| Domain | `memory/domain/` | Subject area expertise |
| Global | `memory/global/` | Cross-project knowledge |

After each phase completion, update the relevant memory tier with key decisions and patterns discovered.

---

## Core Principles

1. **Document-First** — Documents define the flow, scripts辅助
2. **Verification Gate** — Completion claims require fresh evidence
3. **Progressive Disclosure** — Load only what's needed for current phase
4. **Memory Accumulates** — Each phase contributes knowledge
5. **SKILL Reuse** — Reuse skills, don't repeat work