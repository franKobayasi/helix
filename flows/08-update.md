# Phase 08: Update

## Objective

Update documentation and memory after PR is merged, ensuring knowledge accumulates for future work.

## Input

- Merged PR details
- QA report
- Task list
- Session notes collected during development

## Output

- Updated `SPEC.md` (if architectural decisions were made)
- New or updated SKILLs (if new patterns discovered)
- Memory entries (project, domain, global)
- Meeting notes or decision logs

## Update Sequence

### 1. Documentation Updates

**Update SPEC.md if needed**:
```markdown
## Implemented Features

| Feature | Status | PR | Date |
|---|---|---|---|
| [Feature] | ✅ Implemented | #[N] | YYYY-MM-DD |
```

**Update relevant SKILLs**:
- Did we learn new patterns? → Update existing SKILL
- Did we discover new best practice? → Create new SKILL
- Did we refine existing approach? → Version bump SKILL

### 2. Memory Updates

#### Project Memory (`memory/project/`)

Update if new decisions affect future work:

```markdown
## [YYYY-MM-DD] Decision: [Title]

**Context**: [Why this decision was made]
**Decision**: [What we decided]
**Consequences**: [For future reference]
**Reviewed**: [Link to PR/decision]
```

#### Domain Memory (`memory/domain/`)

Update if knowledge is reusable across projects:

```markdown
## [Topic]

### Best Practices
- [Practice 1]
- [Practice 2]

### Patterns
- [Pattern]: [When to use]

### Anti-Patterns
- [Anti-Pattern]: [Why it's bad]
```

#### Global Memory (`memory/global/`)

Update for cross-project learnings:

```markdown
## [YYYY-MM-DD] Learning: [What]

**Source**: [PR/Project]
**Summary**: [Key learning]
**Apply To**: [Project types where this applies]
```

### 3. SKILL Generation

If the development revealed reusable patterns, create SKILL:

```
SKILL: [domain]-[name].md

## When to Use
[When this skill is applicable]

## How
[Step-by-step guide]

## Examples
[Code examples]

## Anti-Examples
[What NOT to do]
```

## Context Loaded at This Phase

Only these files are relevant:

```
08-update.md (this file)
├── pr/[merged-pr].md (PR details)
├── qa-report/[ref].md (QA findings)
├── tasks/[ref].md (original task list)
└── .helix/memory/ (existing memory)
```

## Phase-Specific Memory Access

```
Memory Scope: SESSION + PROJECT + DOMAIN
- Load: Session notes, project context, domain knowledge
- Load: Existing memory structure
- New: Write new learnings to appropriate memory layer
```

## Completion Checkpoints

Before completing Update:

- [ ] SPEC.md updated (if needed)
- [ ] New SKILLs created (if patterns discovered)
- [ ] Project memory updated with decisions
- [ ] Domain memory updated (if reusable knowledge)
- [ ] Global memory updated (if cross-project learning)

## End of Development Cycle

```
Command: none (end of flow)
Output: Helix returns to idle state, ready for new requirement
```

---

## Agent Behavior in This Phase

**Role**: Documenter / Knowledge Engineer

**Tasks**:
1. Review session notes and extract learnings
2. Update project memory with decisions
3. Create or update SKILLs for reusable patterns
4. Update domain knowledge if applicable
5. Clean up session notes

**Do NOT**:
- Skip memory updates (knowledge will be lost)
- Write to wrong memory layer (put cross-project in global)
- Create SKILLs for one-off patterns (only reusable ones)
- Leave session notes uncleared