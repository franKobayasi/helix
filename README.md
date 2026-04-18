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

### Four Core Layers

| Layer | Purpose | Key Components |
|---|---|---|
| **Workflow** | Structured development process | Phases, gates, checkpoints |
| **SKILL** | Reusable knowledge units | Encapsulated best practices |
| **Memory** | Persistent knowledge | Domain facts, style, decisions |
| **Agent** | Execution engine | Claude Code, Codex, others |

### How They Connect

```
Developer's Request
        │
        ▼
   ┌─────────┐     Ask     ┌──────────┐
   │ WORKFLOW │ ────────▶  │  Agent   │
   │ (Process) │ ◀──────── │(Execution)│
   └─────────┘   Respond   └──────────┘
        │
        │ Reuse / Update
        ▼
   ┌─────────┐
   │  SKILL   │  ← Domain knowledge & best practices
   └─────────┘
        │
        │ Accumulate
        ▼
   ┌─────────┐
   │ MEMORY  │  ← Project style, patterns, decisions
   └─────────┘
```

### Workflow Design

A Helix workflow defines how Agent and developer interact:

1. **Requirement** — Developer states the goal
2. **Clarification** — Agent asks questions, proposes approach
3. **Confirmation** — Developer approves or adjusts
4. **Implementation** — Agent builds with continuous checks
5. **Review** — Developer validates output
6. **Reflection** — Agent summarizes what was learned

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

### Memory Accumulation

Helix maintains multiple memory layers:

| Memory Type | Scope | Updates |
|---|---|---|
| **Session** | Current task | Real-time |
| **Project** | Single project | End of task |
| **Domain** | Topic area | Weekly distillation |
| **Global** | Cross-project patterns | Monthly review |

---

## Development Flow

### Starting a New Project

```bash
helix init --project my-app --template express-api
```

This creates:
```
my-app/
├── .helix/
│   ├── workflows/     # Project-specific workflows
│   ├── skills/       # Project knowledge
│   ├── memory/       # Accumulated understanding
│   └── config.yaml   # Project configuration
├── src/              # Your code
└── README.md
```

### Typical Session

```
Developer: "Add user authentication to the API"

Helix Workflow:
1. Load project memory (past decisions, existing patterns)
2. Load relevant SKILLs (auth patterns, API conventions)
3. Clarify: "Password-based or OAuth? Session or JWT?"
4. Propose: Shows approach with relevant project examples
5. Build: Implements with continuous validation
6. Reflect: Updates memory with new patterns learned
```

---

## Goals

### Phase 1 (Current)
- Project scaffolding with `helix init`
- Basic workflow engine (requirement → implementation)
- Memory persistence (project-level)
- SKILL generation from development

### Phase 2
- Cross-project memory distillation
- Multi-Agent collaboration patterns
- Team-shared SKILL libraries

### Phase 3
- Autonomous optimization (Agent suggests workflow improvements)
- External knowledge integration (docs, tickets, PRs)
- Full autonomous development capability

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