# Helix — Agent Development Environment

> Build smarter. Learn faster. Ship better.

---

## What is Helix?

Helix is a framework for creating **Autonomous Development Environments** that grow with you.

Unlike traditional Agent tools that start fresh every session, Helix persists knowledge across projects—learning your domain, your patterns, your decisions—so the next project starts from a foundation, not zero.

```
You describe what you want.
Helix builds the conversation.
Memory accumulates automatically.
Knowledge compounds over time.
```

---

## Core Philosophy

### The Problem with Current Agent Tools

Every session starts blank:
- You re-explain context you've explained a dozen times
- Decisions made in Project A don't transfer to Project B  
- Coding style evolves but isn't recorded
- Best practices live in your head, not in the system

### Helix's Answer

Helix treats development as a **closed learning loop**:

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   Design  →  Interact  →  Build  →  Reflect        │
│       ↑                                      │       │
│       └─────────── Learn & Remember ←───────┘       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

Every completed task, every decision, every correction — all become part of the environment's knowledge base. The longer Helix runs, the smarter it becomes about your work.

---

## Architecture

### Document-First Design

Helix is built on **documents**, not code. Documents define how development happens; scripts are secondary.

```
┌─────────────────────────────────────────────┐
│              Core: Document System          │
├─────────────────────────────────────────────┤
│                                             │
│  AGENT.md (Entry Point)                     │
│  ├── Defines overall execution flow         │
│  ├── Calls Flows                            │
│  ├── Calls SKILLs                           │
│  └── Orchestrates multiple Agent roles      │
│                                             │
│  Flow/ (Procedures)                         │
│  ├── Define phases: need→clarify→build→review│
│  ├── Checkpoints between phases              │
│  └── Handoffs between Agents                │
│                                             │
│  SKILL/ (Capabilities)                       │
│  ├── Skills used during development phases  │
│  ├── Callable by Agents                     │
│  └── Bundled / Generated / Imported         │
│                                             │
├─────────────────────────────────────────────┤
│              Secondary: Scripts             │
├─────────────────────────────────────────────┤
│  scripts/                                    │
│  ├── Scripts paired with SKILLs             │
│  ├── Environment initialization               │
│  └── Utility scripts for various scenarios   │
└─────────────────────────────────────────────┘
```

### Agent Roles

Multiple `AGENT.md` files can exist, each representing a different role in the development process:

| Agent | Responsibility |
|---|---|
| **Architect** | Requirements analysis, system design |
| **Coder** | Implementation, follows coding standards |
| **Reviewer** | Code review, quality gates |
| **Documenter** | Documentation, memory updates |

### How They Connect

```
Developer Request
        │
        ▼
   ┌────────────┐     Orchestrates     ┌──────────────┐
   │  AGENT.md   │ ──────────────────▶ │ Claude Code   │  ← Primary Engine
   │  (Entry)    │ ◀────────────────── │              │
   └────────────┘     Uses             └──────────────┘
        │                    │
        │                    ▼
        │            ┌────────────┐
        │            │   Flows    │  ← Procedure definitions
        │            └────────────┘
        │                    │
        │                    ▼
        │            ┌────────────┐
        └───────────▶│   SKILLs   │  ← Task-specific capabilities
                     └────────────┘
                            │
                            ▼
                     ┌────────────┐
                     │   Memory   │  ← Accumulated knowledge
                     └────────────┘
```

### Primary Execution Engine

**Claude Code** is the primary execution target for Phase 1.

```bash
# Helix orchestrates Claude Code via:
claude exec "<instructions from AGENT.md>"
```

Other Agents (Codex, Pi, etc.) can be added in future phases.

### SKILL System

SKILLs are portable, versioned knowledge units:

```yaml
# Example: frontend-style-guide.skill.md
- Version: 1.0
- Domain: Frontend Development
- Author: Helix (auto-generated from project)
- Content:
  - Naming conventions
  - Component patterns
  - CSS methodology
  - Testing requirements
```

SKILLs can be:
- **Bundled** — shipped with Helix as starting templates
- **Generated** — Helix auto-creates from development experience  
- **Imported** — from community or team shared libraries

### Document Types

### AGENT.md (Entry Point)
The main entry for each Agent role. Defines:
- Role's purpose and responsibilities
- How to interact with Developer
- Which Flows to call and when
- How to use SKILLs
- How to update Memory after tasks

### Flow/ (Procedures)
Structured development phases stored as Markdown files:
- Phase definitions and transitions
- Checkpoints and gates
- Expected outputs from each phase
- Handoff conditions between roles

### SKILL/ (Capabilities)
Reusable skill units callable during development:
- **Bundled** — ship with Helix
- **Generated** — auto-created from experience
- **Imported** — from community

Each SKILL is a `.md` file with clear usage context.

### Memory/
Accumulated knowledge organized by scope:
- `project/` — single project knowledge
- `domain/` — topic-specific patterns
- `global/` — cross-project learnings

### scripts/
Shell scripts for:
- SKILL execution helpers
- Environment initialization
- Utility operations

---

## Project Structure

```
helix/
├── README.md              # This file
├── AGENT.md              # Main entry point (Coordination Agent)
├── flows/                # Development phase definitions
│   ├── requirement.md    # Requirement gathering flow
│   ├── clarify.md        # Clarification phase
│   ├── build.md          # Implementation phase
│   └── review.md        # Review and validation phase
├── skills/              # Reusable skill library
│   ├── coding-standards.md
│   ├── testing-patterns.md
│   └── api-design.md
├── memory/              # Accumulated knowledge
│   ├── project/
│   ├── domain/
│   └── global/
└── scripts/             # Utility scripts
    ├── init.sh
    └── skill-helpers/
```

---

## Core Principles

1. **Document-First** — Everything starts with documents. Scripts are secondary.
2. **Claude Code Target** — Phase 1 targets Claude Code as primary Agent engine.
3. **Memory Accumulates** — Each session contributes to persistent knowledge.
4. **Flow-Driven** — Development follows defined procedures, not free-form.
5. **SKILL Reuse** — Skills compound; don't redo what's already learned.

---

## Roadmap

### Phase 1 — Foundation
- [ ] Define core AGENT.md structure
- [ ] Design essential Flows (requirement, build, review)
- [ ] Create starter SKILLs library
- [ ] Memory system implementation
- [ ] Claude Code integration

---

## Inspiration

Helix draws from multiple sources:

- **Hermes Agent** — closed learning loops, auto-generating skills
- **OpenClaw** — SOUL.md pattern, workspace memory architecture  
- **Harness Engineering** — quality gates, feedback-driven reliability
- **DevCps/ADE Research** — structured development environments

The name "Helix" reflects the core principle: **knowledge spirals upward**, each iteration building on what was learned before.

---

## Getting Started

> ⚠️ Helix is currently in design/early development phase.

To follow or contribute:
```bash
git clone https://github.com/your-org/helix
cd helix
```

---

## License

MIT