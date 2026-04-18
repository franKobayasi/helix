# Phase 01: Requirement & Specification

> Combined document: Requirement gathering + Technical specification

## Objective

Transform the developer's raw request into a structured requirement document AND a concrete technical specification in one pass.

## Input

- Raw request from developer (verbal, email, ticket, etc.)
- Project context (existing README, architecture, tech stack)

## Output

`req-spec/YYYY-MM-DD-[slug].md`

```yaml
---
title: [Title]
date: YYYY-MM-DD
author: [Developer]
status: draft
---

# Part 1: Requirement

## Overview
[What are we building? Why does it matter?]

## Goals
[Measurable outcomes — what success looks like]

## Non-Goals
[Explicitly out of scope]

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

## Open Questions

| Question | Owner | Status |
|---|---|---|
| [Q] | [@who] | [open/resolved] |

---

# Part 2: Specification

## Overview
[What this spec covers, derived from requirements]

## Architecture Decisions

### AD-001: [Title]
**Context**: [Situation that required this decision]
**Decision**: [What we decided]
**Consequences**: [Positive and negative]
**Alternatives Considered**: [Other options and why rejected]

## Data Models

### [Entity Name]
| Field | Type | Description |
|---|---|---|
| id | UUID | Primary key |

## API Design

### [Endpoint Name]
```
Method: GET/POST/PUT/DELETE
Path: /api/v1/resource
Request: {...}
Response: {...}
```

## External Dependencies

| Service | Purpose | Version |
|---|---|---|
| [Service] | [Purpose] | [Version] |

## Security Considerations

- [ ] Authentication required
- [ ] Authorization model: [RBAC/ABAC/etc.]
- [ ] Data encryption: [at-rest/in-transit/both]

## Testing Strategy

| Level | Tool | Coverage Target |
|---|---|---|
| Unit | [Jest/Pytest] | [X]% |
| Integration | [Supertest] | [Key flows] |
| E2E | [Playwright] | [Critical paths] |

## Status Transitions

- `draft` → `review`
- `review` → `approved`
- `approved` → `implemented` (after implementation)
```

## Context Loaded at This Phase

Only these files are relevant:

```
01-req-spec.md (this file)
├── Project README.md (project overview only)
├── .helix/config.yaml (tech stack)
└── .helix/memory/project/ (existing architecture, past decisions)
```

## Phase-Specific Memory Access

```
Memory Scope: PROJECT level
- Load: project goal, existing documentation, past AD decisions
- NOT: task details, implementation specifics, future phases
```

## Completion Checkpoints

Before moving to Plan, confirm:

- [ ] All P0 requirements are clearly stated
- [ ] Non-goals explicitly documented
- [ ] Open questions tracked
- [ ] Architecture decisions documented with consequences
- [ ] API design concrete (not abstract)
- [ ] Developer has reviewed and approved combined doc

## Trigger Next Phase

```
Command: plan:develop
Condition: Developer approves req-spec document
Output: Creates plan/YYYY-MM-DD-[slug].md
```

---

## Agent Behavior in This Phase

**Role**: Requirements Analyst + Technical Architect

**Tasks**:
1. Ask clarifying questions if request is ambiguous
2. Identify user stories from the request
3. Classify requirements by priority (P0/P1/P2)
4. Make architecture decisions with documented consequences
5. Design data models and API contracts
6. Define testing strategy

**Do NOT**:
- Break down tasks yet (that's Plan phase)
- Write implementation code
- Load task-specific memory (premature)