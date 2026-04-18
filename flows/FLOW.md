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
| **01-ReqSpec** | User's raw request | Combined requirement + specification | `plan:develop` |
| **02-Plan** | Approved spec | Implementation plan | `task:breakdown` |
| **03-Task** | Plan doc | Task documentation | `implement:start` |
| **04-Implement** | Task doc | Code + test | `qa:start` |
| **05-QA** | Implementation | QA report + fixes | `pr:prepare` |
| **06-PR** | QA passed | Pull request | `docs:update` |
| **07-Update** | PR merged | Memory + SKILL updates | — |

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

- `01-req-spec.md` — Combined requirement + specification
- `02-plan.md` — Implementation planning
- `03-task.md` — Task breakdown
- `04-implement.md` — Code implementation
- `05-qa.md` — QA & validation
- `06-pr.md` — Pull request preparation
- `07-update.md` — Documentation & memory update

---

## Global Context (Available in All Phases)

These are always available regardless of phase:

```
├── AGENT.md           # Current role's entry point
├── .helix/config.yaml # Project configuration
└── .helix/memory/global/  # Cross-project knowledge
```