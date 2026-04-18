# Phase 05: Implement

## Objective

Execute the approved task list, producing working code that meets acceptance criteria.

## Input

- Approved task document (`tasks/YYYY-MM-DD-[slug].md`)
- Relevant SKILLs loaded for current task
- Project memory (relevant patterns only)

## Output

- Code changes (following project conventions)
- Unit tests for new/changed code
- Self-review notes per task

## Implementation Rules

### Rule 1: One Task at a Time

Do not start TASK-003 before TASK-002 is complete and self-reviewed.

### Rule 2: SKILL Loading Per Task

Before starting each task, load the relevant SKILL:
```
skill:typescript-best-practices  ← for TASK-001
skill:testing-patterns            ← for TASK-002
```

### Rule 3: Progressive Memory Access

As implementation progresses, gradually load more project memory:
```
Task 1-2: Load current module structure only
Task 3-4: Load related modules
Task 5+:  Load cross-module patterns
```

### Rule 4: Self-Review Before Next Task

After completing each task, do a quick self-check:
- [ ] Code follows project conventions (lint passes)
- [ ] Tests written and passing
- [ ] Acceptance criteria met
- [ ] No debug code left

## Task Execution Format

```markdown
## TASK-001: [Title] — [Status]

**Started**: YYYY-MM-DD HH:MM
**Completed**: YYYY-MM-DD HH:MM

### Changes Made
- [ ] File: `src/file.ts` — [What changed]

### Self-Review
- [ ] Tests pass: `npm test -- --testPathPattern=TASK-001`
- [ ] Lint passes: `npm run lint`
- [ ] Acceptance criteria met

### Notes
[Any observations for later phases]
```

## Context Loaded at This Phase

Only these files are relevant:

```
05-implement.md (this file)
├── tasks/[active-doc].md (current task list)
├── .helix/skills/[relevant-skill].md (current task's SKILL)
└── .helix/memory/project/ (only task-relevant modules)
```

## Phase-Specific Memory Access

```
Memory Scope: SESSION + PROJECT
- Load: current task's relevant code + conventions
- Load: SKILLs for current task
- NOT: entire codebase, unrelated modules
- New: After task completion, write notes to session memory
```

## Completion Checkpoints

Before moving to QA, confirm:

- [ ] All tasks completed with self-review notes
- [ ] Tests written and passing
- [ ] Code follows conventions (lint/format checked)
- [ ] Implementation matches spec

## Trigger Next Phase

```
Command: qa:start
Condition: All tasks completed + self-reviewed
Output: Creates qa-report/YYYY-MM-DD-[slug].md
```

---

## Agent Behavior in This Phase

**Role**: Coder

**Tasks**:
1. Load relevant SKILL before each task
2. Implement according to acceptance criteria
3. Write tests alongside code
4. Self-review before marking complete
5. Update task status in document

**Do NOT**:
- Skip tests
- Leave debug code
- Move to next task without self-review
- Load entire codebase at once