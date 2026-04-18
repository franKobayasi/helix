# Phase 03: Plan

## Objective

Transform the approved specification into an actionable implementation plan with timeline, milestones, and dependencies.

## Input

- Approved spec document (`spec/YYYY-MM-DD-[slug].md`)
- Project constraints (timeline, resources)

## Output

`plan/YYYY-MM-DD-[slug].md`

```
---
title: [Plan Title]
date: YYYY-MM-DD
spec_ref: [spec-doc-id]
status: draft
---

## Overview
[High-level summary of implementation approach]

## Milestones

### M1: [Milestone Name] — [Target Date]
**Goal**: [What we expect to achieve]
**Deliverables**:
- [ ] Deliverable 1
- [ ] Deliverable 2

### M2: ...

## Implementation Approach

### [Module/Subsystem Name]
**Responsibility**: [What this handles]
**Dependencies**: [External services, other modules]
**Implementation Notes**:
- [Key consideration 1]
- [Key consideration 2]

## Dependency Graph

```
[Module A] ──calls──▶ [Module B]
      │
      └──depends on──▶ [External: Service X]
```

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| [Risk] | [H/M/L] | [H/M/L] | [Plan] |

## Resource Allocation

| Resource | Allocation | Period |
|---|---|---|
| [Role/Person] | [% or hours] | [Sprint/Date range] |

## Verification Points

| Milestone | Verification Method |
|---|---|
| M1 | [Demo/Review/Testing] |

## Status Transitions

- `draft` → `review`
- `review` → `approved`
- `approved` → `tasks_created` (after task breakdown)
```

## Context Loaded at This Phase

Only these files are relevant:

```
03-plan.md (this file)
├── spec/[approved-doc].md (source spec)
├── requirements/[ref].md (original requirements)
└── .helix/memory/project/ (past project patterns)
```

## Phase-Specific Memory Access

```
Memory Scope: PROJECT level
- Load: past project patterns, previous implementations (not current)
- NOT: individual task details, code structure
```

## Completion Checkpoints

Before moving to Task, confirm:

- [ ] All milestones are defined with clear deliverables
- [ ] Dependencies are mapped
- [ ] Risks are identified with mitigation plans
- [ ] Developer has reviewed and approved plan

## Trigger Next Phase

```
Command: task:breakdown
Condition: Developer approves plan
Output: Creates tasks/YYYY-MM-DD-[slug].md
```

---

## Agent Behavior in This Phase

**Role**: Project Planner

**Tasks**:
1. Break spec into logical milestones
2. Identify cross-module dependencies
3. Assess risks and plan mitigations
4. Allocate resources and timeline
5. Define verification points

**Do NOT**:
- Break down to individual tasks (that's Task phase)
- Write code or implementation details
- Load detailed task context