# Phase 02: Spec

## Objective

Develop a technical specification that translates approved requirements into concrete technical decisions.

## Input

- Approved requirement document (`requirements/YYYY-MM-DD-[slug].md`)
- Project context (existing architecture, tech stack)

## Output

`spec/YYYY-MM-DD-[slug].md`

```
---
title: [Spec Title]
date: YYYY-MM-DD
requirement_ref: [requirement-doc-id]
status: draft
---

## Overview
[What this spec covers and why]

## Architecture Decisions

### AD-001: [Title]
**Context**: [Situation that required this decision]
**Decision**: [What we decided]
**Consequences**: [Positive and negative]
**Alternatives Considered**: [Other options and why rejected]

### AD-002: ...

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

## Configuration

```yaml
# .env or config.yaml
KEY: value
```

## Security Considerations

- [ ] Authentication required
- [ ] Authorization model: [RBAC/ABAC/etc.]
- [ ] Data encryption: [at-rest/in-transit/both]

## Error Handling

| Scenario | Response |
|---|---|
| [Error] | [HTTP 400/404/500 + body] |

## Testing Strategy

| Level | Tool | Coverage Target |
|---|---|---|
| Unit | [Jest/Pytest] | [X]% |
| Integration | [Supertest] | [Key flows] |
| E2E | [Playwright] | [Critical paths] |

## Open Questions

| Question | Decision | Status |
|---|---|---|
| [Q] | [D] | [open/resolved] |

## Status Transitions

- `draft` → `review`
- `review` → `approved`
- `approved` → `implemented` (after implementation)
```

## Context Loaded at This Phase

Only these files are relevant:

```
02-spec.md (this file)
├── requirements/[approved-doc].md (source requirements)
├── .helix/config.yaml (tech stack)
└── .helix/memory/project/ (existing architecture)
```

## Phase-Specific Memory Access

```
Memory Scope: PROJECT level
- Load: existing architecture, past AD decisions, tech stack constraints
- NOT: task details, implementation specifics
```

## Completion Checkpoints

Before moving to Plan, confirm:

- [ ] All architecture decisions are documented with consequences
- [ ] API design is concrete (not abstract)
- [ ] Open questions have owner + resolution timeframe
- [ ] Developer has reviewed and approved spec

## Trigger Next Phase

```
Command: plan:develop
Condition: Developer approves spec
Output: Creates plan/YYYY-MM-DD-[slug].md
```

---

## Agent Behavior in This Phase

**Role**: Technical Architect

**Tasks**:
1. Review requirements and identify technical gaps
2. Make architecture decisions with documented consequences
3. Design data models and API contracts
4. Define testing strategy
5. Identify external dependencies and constraints

**Do NOT**:
- Break down tasks (that's Plan phase)
- Write implementation code
- Load task-specific memory (premature)