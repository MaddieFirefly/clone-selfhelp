# AGENTS.md — Clone Self-Help (Execution Guardrails)

Scope: entire repository.

## Primary execution source of truth
- Before implementing features, read `.AI_PROJECT_MEMORY/2026-03-03_finch-cat-clone-master-plan.md`.
- Treat that document as the default roadmap for architecture, feature order, and delivery phases.
- If you intentionally diverge from the plan, document *why* in a new dated note under `.AI_PROJECT_MEMORY/`.

## Required implementation behavior
1. Build in this order unless explicitly instructed otherwise:
   - Phase A foundation
   - Phase B core loop MVP
   - Phase C delight/retention
   - Phase D depth features
   - Phase E hardening/launch
2. Keep the product cat-themed (never bird-themed).
3. Maintain API-first design for all major features.
4. Optimize mobile-first UX, while preserving desktop usability.

## Execution hygiene
- For each substantial change, add/update a dated progress log in `.AI_PROJECT_MEMORY/`.
- Run relevant tests/lint checks for touched areas before finishing.
- Keep commits scoped and descriptive.
- Never expose private user data in logs, fixtures, or screenshots.

## Definition-of-done reminder
- Use section "15) Definition of Done" in the master plan as the quality bar for parity milestones.
