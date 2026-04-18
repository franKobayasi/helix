# Phase 01: Requirement

## Objective

Transform the developer's raw request into a structured, unambiguous requirement document.

## Input

- Raw request from developer (verbal, email, ticket, etc.)
- Project context (if existing project)
- Existing `README.md` or `AGENT.md` (for new projects, just project name)

## Output

`requirements/YYYY-MM-DD-[slug].md`

```
---
title: [Requirement Title]
date: YYYY-MM-DD
author: [Developer]
status: draft
---

## Overview
[2-3 sentences: What are we building? Why does it matter?]

## Goals
[What success looks like — measurable outcomes]

## Non-Goals
[Explicitly out of scope to avoid scope creep]

## User Stories

| As a... | I want to... | So that... |
|---|---|---|
| [Role] | [Action] | [Benefit] |

## Functional Requirements

### Must Have (P0)
- [ ] REQ-001: [Requirement]
- [ ] REQ-002: [Requirement]

### Should Have (P1)
- [ ] REQ-003: [Requirement]

### Nice to Have (P2)
- [ ] REQ-004: [Requirement]

## Constraints

| Constraint | Description |
|---|---|
| Tech stack | [Allowed technologies] |
| Timeline | [Deadline if any] |
| Budget | [Resource limitations] |

## Success Criteria

1. [ ] Criteria 1
2. [ ] Criteria 2
3. [ ] Criteria 3

## Open Questions

| Question | Owner | Status |
|---|---|---|
| [Question] | [@who] | [open/resolved] |

## Status Transitions

- `draft` → `review` (after self-review)
- `review` → `approved` (developer approves)
- `approved` → `superseded` (replaced by newer version)
```

## Context Loaded at This Phase

Only these files are relevant:

```
01-requirement.md (this file)
├── Project README.md (project overview only)
└── .helix/config.yaml (basic project metadata)
```

## Phase-Specific Memory Access

```
Memory Scope: PROJECT level
- Only: project goal, existing documentation
- NOT: previous decisions, past implementation details
```

## Completion Checkpoints

Before moving to Spec, confirm:

- [ ] All P0 requirements are clearly stated
- [ ] Non-goals are explicitly documented
- [ ] Open questions are tracked
- [ ] Developer has reviewed and approved draft

## Trigger Next Phase

```
Command: spec:develop
Condition: Developer approves requirement doc
Output: Creates spec/YYYY-MM-DD-[slug].md
```

---

## Agent Behavior in This Phase

**Role**: Requirements Analyst

**Tasks**:
1. Ask clarifying questions if request is ambiguous
2. Identify user stories from the request
3. Classify requirements by priority (P0/P1/P2)
4. Document constraints and success criteria
5. Surface open questions for developer decision

**Do NOT**:
- Propose technical solutions yet
- Reference implementation details
- Load domain knowledge (premature at this stage)