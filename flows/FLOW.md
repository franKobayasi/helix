# Helix Development Flow

> Progressive disclosure: only the current phase's context is revealed.

---

## Flow Overview

```
Requirement  →  Spec  →  Plan  →  Task  →  Implement  →  QA  →  PR  →  Update
     │           │        │        │          │          │       │        │
     └─────────── Show only current phase context, nothing more ─────────┘
```

---

## Phase Index

| Phase | Input | Output | Trigger Next |
|---|---|---|---|
| **01-Requirement** | User's raw request | Structured requirement doc | `spec:develop` |
| **02-Spec** | Requirement doc | Technical specification | `plan:develop` |
| **03-Plan** | Spec doc | Implementation plan | `task:breakdown` |
| **04-Task** | Plan doc | Task documentation | `implement:start` |
| **05-Implement** | Task doc | Code + test | `qa:start` |
| **06-QA** | Implementation | QA report + fixes | `pr:prepare` |
| **07-PR** | QA passed | Pull request | `docs:update` |
| **08-Update** | PR merged | Memory + SKILL updates | — |

---

## Phase Context Loading Rules

### Rule: Progressive Disclosure Only

At each phase, **only load context relevant to that phase**:

```
Requirement Phase:
→ Load: Project goal, existing README
→ NOT Load: Previous decisions, domain knowledge (yet)

Spec Phase:
→ Load: Requirement doc, existing architecture
→ NOT Load: Implementation details, coding style (yet)

Plan Phase:
→ Load: Spec doc, tech constraints, dependencies
→ NOT Load: Task breakdown, code structure (yet)

...and so on
```

### Rule: No Backward Context Loading

Each phase should be reviewable independently.
Future context does not leak backward.

---

## Command Syntax

Trigger next phase via structured commands:

```
spec:develop          → Start spec development
plan:develop          → Start planning
task:breakdown        → Start task breakdown
implement:start       → Begin implementation
qa:start              → Begin QA phase
pr:prepare            → Prepare pull request
docs:update           → Update documentation & memory
```

---

## Phase Entry Conditions

Each phase requires explicit developer confirmation before proceeding:

```
Requirement  ── Developer confirms requirement is clear ──▶  Spec
Spec         ── Developer approves spec ──────────────────▶  Plan
Plan         ── Developer approves plan ──────────────────▶  Task
Task         ── Developer approves task breakdown ─────────▶  Implement
Implement    ── All tasks completed + self-review ─────────▶  QA
QA           ── QA passed, no critical issues ───────────▶  PR
PR           ── Review approved ─────────────────────────▶  Update
Update       ── Documentation updated ────────────────────▶  Done
```

---

## Flow Files

- `01-requirement.md` — Requirement gathering flow
- `02-spec.md` — Specification development flow
- `03-plan.md` — Implementation planning flow
- `04-task.md` — Task breakdown flow
- `05-implement.md` — Implementation flow
- `06-qa.md` — QA & validation flow
- `07-pr.md` — Pull request preparation flow
- `08-update.md` — Documentation & memory update flow

---

## Global Context (Available in All Phases)

These are always available regardless of phase:

```
├── AGENT.md           # Current role's entry point
├── .helix/config.yaml # Project configuration
└── .helix/memory/global/  # Cross-project knowledge
```