# Phase 04: Task

## Objective

Transform the approved plan into detailed, executable task documents with clear definitions of done.

## Input

- Approved plan document (`plan/YYYY-MM-DD-[slug].md`)
- Milestone definitions and dependencies

## Output

`tasks/YYYY-MM-DD-[slug].md`

```
---
title: [Task Doc Title]
date: YYYY-MM-DD
plan_ref: [plan-doc-id]
status: draft
---

## Overview
[High-level summary of tasks]

## Task List

### TASK-001: [Task Title]
**Milestone**: M1
**Estimated Time**: [X hours/days]
**Priority**: [P0/P1/P2]

**Description**:
[What exactly needs to be done]

**Acceptance Criteria**:
- [ ] Criterion 1
- [ ] Criterion 2

**Dependencies**:
- [ ] TASK-XXX (must complete first)
- [ ] External: [Service/Team]

**Files to Modify**:
- [ ] `src/models/user.ts`
- [ ] `tests/unit/user.test.ts`

**SKILL Requirements**:
- skill:typescript-best-practices
- skill:testing-patterns

---

### TASK-002: ...

## Task Execution Order

```
1. TASK-001 (unblock: nothing)
2. TASK-002 (unblock: TASK-001)
3. TASK-003 (unblock: TASK-001, TASK-002)
```

## SKILL Loading Plan

Tasks are grouped by required SKILLs to minimize context switching:

| SKILL | Tasks |
|---|---|
| skill:typescript-best-practices | TASK-001, TASK-003 |
| skill:api-design | TASK-002, TASK-004 |

## Status Transitions

- `draft` → `approved`
- `approved` → `in_progress`
- `in_progress` → `completed`
```

## Context Loaded at This Phase

Only these files are relevant:

```
04-task.md (this file)
├── plan/[approved-doc].md (source plan)
└── .helix/skills/ (relevant SKILLs for upcoming tasks)
```

## Phase-Specific Memory Access

```
Memory Scope: PROJECT level
- Load: existing code structure relevant to tasks
- NOT: full codebase, unrelated modules
```

## Completion Checkpoints

Before moving to Implement, confirm:

- [ ] All tasks have clear acceptance criteria
- [ ] Task order respects dependencies
- [ ] SKILL requirements identified per task
- [ ] Developer has reviewed and approved task list

## Trigger Next Phase

```
Command: implement:start
Condition: Developer approves task breakdown
Output: Implementation begins with first unblocked task
```

---

## Agent Behavior in This Phase

**Role**: Task Planner

**Tasks**:
1. Break plan milestones into individual tasks
2. Define clear acceptance criteria for each task
3. Identify dependencies and execution order
4. Map tasks to required SKILLs
5. Group tasks to minimize context switching

**Do NOT**:
- Begin implementation (that's Implement phase)
- Load full codebase (only task-relevant files)
- Skip acceptance criteria definition