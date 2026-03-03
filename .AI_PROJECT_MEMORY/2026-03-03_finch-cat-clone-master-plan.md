# Finch (Cat Edition) — Research Synthesis + Autonomous Implementation Master Plan
**Date:** 2026-03-03  
**Project:** Clone Self-Help (Cat Edition)  
**Scope:** End-to-end execution blueprint (research synthesis → architecture → delivery roadmap)

---

## 1) Research Synthesis

### 1.1 What was researched
I combined:
1. Existing repository context (`CLAUDE.md`, kickoff memory doc).  
2. Prior knowledge of Finch’s core loops and common feature set (daily check-ins, guided self-care activities, pet progression, rewards/customization, gentle social support).  
3. Product reconstruction methods used for clone planning: user journey mapping, reward-loop decomposition, system and data-model inference, and API-first product slicing.

### 1.2 Environment limitations encountered
Attempted direct web retrieval from Finch/app stores/reviews was blocked by outbound CONNECT 403 in this environment. Therefore, this plan uses repository context + prior product knowledge and explicitly marks assumptions where needed.

### 1.3 What makes Finch work (behavioral design decomposition)
Finch succeeds because it combines:
- **Tiny, low-friction daily actions** (check-in, one simple goal) with immediate positive feedback.
- **Emotional transference to a companion** (you help yourself → your pet thrives), turning self-care into relational care.
- **Variable rewards with soft structure** (currency, cosmetics, adventures, unlocks).
- **Low-shame UX** (gentle language, recovery-friendly streak handling, no punitive tone).
- **Ritual cadence** (morning intention, daytime support, evening reflection).

This is the non-negotiable core to preserve in the cat-themed clone.

---

## 2) Product Vision for Cat Edition

### 2.1 Product statement
A single-user, API-first web app where completing self-care tasks helps a kitten grow into a cat, unlock adventures, decorate a cat home, and build sustainable daily wellness routines.

### 2.2 Experience pillars
1. **Cozy companion**: warm, playful cat personality and reactive animations.  
2. **Gentle consistency**: daily loops that are encouraging, not demanding.  
3. **Visible growth**: pet development, home upgrades, trend insights.  
4. **Actionable self-help**: goals, journaling, breathing, and mood tracking that are quick and useful.

### 2.3 Theme translation (Finch → Cat)
- Bird/Nest/Adventure → **Kitten/Cat House/Neighborhood Explorations**.
- Discovery text becomes cat-centric (curiosity, naps, zoomies, treats, windowsill moments).
- Reward economy remains, but with **yarn balls, fish treats, catnip tokens** as flavor labels (backed by standard currency types in DB).

---

## 3) Full Feature Inventory (MVP + Post-MVP)

## 3.1 MVP (must ship first)
1. **Auth + private single-user app lock**
   - Email magic-link or passkey (prefer passkey fallback to email).
2. **Onboarding**
   - Name kitten, select look/personality seed, define goals and preferred check-in windows.
3. **Home screen daily loop**
   - Mood check-in, “today’s focus”, quick goal list, progress ring, kitten status.
4. **Goals / habits / tasks**
   - Suggested goals + custom goals, snooze/reschedule, completion rewards.
5. **Journaling**
   - Prompted and free-form entries; optional tags and mood association.
6. **Breathing exercises**
   - 1–5 minute patterns (box, 4-7-8, calm cadence) with simple visual guide.
7. **Mood tracking + trends**
   - Daily mood/energy/stress values with weekly trend and notes correlation.
8. **Reward economy + pet progression**
   - XP/energy + soft currency; kitten growth stages and basic cosmetics.
9. **Basic cat customization**
   - Color/pattern/accessory changes; simple room background swaps.
10. **Reminders/notifications (web push optional in MVP, in-app mandatory)**
    - Gentle nudges based on preferred times.

## 3.2 Post-MVP (rapid follow)
1. **Adventure system**
   - Send cat on timed explorations unlocked by self-care completions.
2. **Expanded cat house decoration**
   - Furniture, themes, collectible sets, seasonal items.
3. **Soundscapes + sleep wind-down flows**
   - Focus sounds, rain, purr loops, bedtime checklist.
4. **Assessments and insight cards**
   - Lightweight weekly reflection quizzes, generated guidance summaries.
5. **Supportive social-lite**
   - Optional prewritten encouragement exchange (if/when multi-user enabled).
6. **Deeper analytics**
   - Habit consistency heatmaps, intervention suggestions, relapse recovery insights.

---

## 4) User Journey Blueprint

### 4.1 Day 0 (onboarding)
- Welcome → consent + privacy framing → kitten creation → baseline mood/energy → pick 3 starter goals → first completion → instant reward + explain loop.

### 4.2 Daily core loop
1. Open app, cat greets user contextually.
2. Quick check-in (mood + energy + optional note).
3. Complete 1–3 goals.
4. Earn energy/coins; cat gains XP and “explore readiness”.
5. Optional reflection (journal or breathing).
6. Evening recap and gentle tomorrow setup.

### 4.3 Weekly loop
- Weekly reflection card (wins/challenges), trend insight, choose next week focus pack, unlock cosmetic/adventure milestone reward.

### 4.4 Recovery loop (critical)
If user misses days:
- No streak shaming.
- Cat expresses warmth (“I missed hanging out with you”).
- One-tap “restart gently” routine with 1 tiny goal + 30-second breathing.

---

## 5) Game Mechanics + Economy Design

### 5.1 Progression model
- **User actions** generate `wellness_energy`.
- `wellness_energy` converts to:
  - Cat XP (growth level)
  - Soft currency (shop/decor)
  - Adventure fuel (timed content)

### 5.2 Example reward formula (tunable)
- Goal completion: +10 base energy.
- Difficulty modifier: 0.8/1.0/1.2.
- Streak grace bonus: up to +20% (never removed below base on misses).
- Daily first completion bonus: +5.

### 5.3 Anti-burnout mechanics
- Diminishing returns after N completions/day for currency only (not wellbeing validation).
- Encourage “done enough” state after minimum healthy activity.
- Recovery bonuses for return after inactivity.

### 5.4 Emotional UX copy system
Use supportive tone categories:
- celebrate_small_win
- encourage_retry
- grounding_prompt
- bedtime_reflection

All copy generated from deterministic templates + optional LLM augmentation later.

---

## 6) Technical Architecture (Vercel-first)

### 6.1 Stack choice
- **Frontend:** Next.js (App Router) + TypeScript + Tailwind + Framer Motion.
- **Backend:** Next.js Route Handlers / Server Actions for API-first endpoints.
- **DB:** Postgres (Neon or Supabase Postgres).
- **ORM:** Prisma.
- **Auth:** NextAuth or Clerk (single-user whitelist mode).
- **Jobs/scheduling:** Vercel Cron + durable job table.
- **Analytics/events:** PostHog (self-host optional later) + internal event table.
- **Cache/state:** React Query + server cache tags.

### 6.2 High-level modules
- `apps/web` (UI + BFF/API handlers)
- `packages/domain` (business rules, reward calculators)
- `packages/ui` (design system components)
- `packages/config` (lint, tsconfig, env schemas)

### 6.3 Non-functional requirements
- Mobile-first performance target: LCP < 2.5s on mid-tier phone.
- Offline tolerance for logging completions (local queue + sync).
- Privacy-by-default: no third-party sharing, encrypted secrets, minimal PII.

---

## 7) Data Model (initial schema)

## 7.1 Core entities
- `User`
- `Pet` (cat profile, stage, mood state)
- `GoalTemplate` (system suggestions)
- `Goal` (user goal/habit/task)
- `GoalCompletion`
- `CheckIn` (mood/energy/stress + note)
- `JournalEntry`
- `BreathingSession`
- `RewardLedger` (currency + xp transactions)
- `InventoryItem`
- `UserInventory`
- `HomeLayout`
- `Adventure`
- `AdventureRun`
- `InsightCard`
- `Reminder`
- `EventLog`

### 7.2 Relationship highlights
- User 1—1 Pet
- User 1—N Goals, CheckIns, JournalEntries
- Goal 1—N GoalCompletions
- User 1—N RewardLedger entries
- UserInventory joins User and InventoryItem
- AdventureRun references Pet + Adventure + completion rewards

### 7.3 Event-sourcing-lite approach
Every meaningful action writes:
1. primary table record (e.g., `GoalCompletion`), and  
2. `EventLog` row for audit/analytics/replay.

---

## 8) API Design (versioned, API-first)

Base: `/api/v1`

### 8.1 Auth/session
- `POST /auth/magic-link`
- `POST /auth/verify`
- `POST /auth/logout`
- `GET /me`

### 8.2 Onboarding + pet
- `POST /onboarding/start`
- `POST /pet`
- `PATCH /pet/:id`
- `POST /pet/:id/interact` (pet reaction payload)

### 8.3 Goals + completion
- `GET /goals`
- `POST /goals`
- `PATCH /goals/:id`
- `POST /goals/:id/complete`
- `POST /goals/:id/snooze`

### 8.4 Wellness tools
- `POST /checkins`
- `GET /checkins/trends?range=7d|30d|90d`
- `POST /journal`
- `GET /journal`
- `POST /breathing/sessions`

### 8.5 Economy/customization
- `GET /wallet`
- `GET /shop/items`
- `POST /shop/purchase`
- `GET /inventory`
- `POST /home-layout`

### 8.6 Adventures + insights
- `GET /adventures`
- `POST /adventures/:id/start`
- `POST /adventures/runs/:id/claim`
- `GET /insights/weekly`

### 8.7 Meta
- `GET /health`
- `GET /feature-flags`

API contract style: Zod schemas + OpenAPI generation + typed client.

---

## 9) UI/UX System Plan

### 9.1 Information architecture
Primary tabs (mobile bottom nav):
1. Home
2. Goals
3. Journal
4. Cat House
5. Insights

Desktop: left sidebar + persistent cat status panel.

### 9.2 Visual language (cat-cozy)
- Rounded cards, plush spacing, warm neutral background + playful accent colors.
- Cat motion principles: subtle idle loops, ear/tail reactions, celebration bounce.
- Accessibility: WCAG AA contrast, reduced motion mode, large tap targets.

### 9.3 Key screen specs
- **Home:** greeting, check-in widget, top 3 goals, “help my cat explore” CTA.
- **Goal detail:** streak calendar, suggested micro-steps, completion affordance.
- **Journal:** prompt carousel + quick voice-to-text later.
- **Cat House:** avatar customization + room decorator with item slots.
- **Insights:** trends, wins, suggestions, weekly reflection action plan.

---

## 10) Autonomous Delivery Plan (execution order)

### Phase A — Foundation (Days 1–3)
1. Bootstrap Next.js monorepo structure.
2. Auth + single-user access control.
3. Prisma schema + migrations + seed templates.
4. Basic design system primitives + app shell.

### Phase B — Core Loop MVP (Days 4–10)
1. Onboarding + pet creation flow.
2. Goals CRUD + completion + reward ledger.
3. Home daily loop UI.
4. Check-ins + basic trends chart.
5. Journaling + breathing session logging.

### Phase C — Delight + Retention (Days 11–16)
1. Pet growth stages + reactive animations.
2. Shop + inventory + first customization set.
3. Reminder system + re-engagement messaging.
4. Recovery loop UX and copy tuning.

### Phase D — Depth Features (Days 17–24)
1. Adventures (timed runs, rewards).
2. Cat house decoration depth.
3. Weekly insights + focus packs.
4. Soundscapes/sleep routine.

### Phase E — Hardening + Launch (Days 25–30)
1. QA matrix (mobile Safari/Chrome, desktop).
2. Performance pass + accessibility pass.
3. Data backups/export.
4. Vercel production deploy + post-launch metrics dashboard.

---

## 11) Testing & Quality Strategy

### 11.1 Automated
- Unit tests: reward formulas, streak logic, recovery logic.
- Integration tests: API routes (auth, goals, check-ins, purchases).
- E2E (Playwright): onboarding, complete goal, reward claim, journal entry.

### 11.2 Product quality gates
- Day-1 retention simulation checklist.
- No-shame language review on all user-facing copy.
- Accessibility audit + keyboard/touch navigation.

---

## 12) Metrics & Telemetry Plan

### 12.1 Primary metrics
- Daily Active Use
- Check-in completion rate
- % users completing at least 1 goal/day (single-user now, framework for scale)
- 7-day consistency score
- Journal engagement rate

### 12.2 Behavioral diagnostics
- Drop-off after onboarding step N
- Time-to-first-win (first completed goal)
- Return-after-miss recovery rate

---

## 13) Risks + Mitigations

1. **Over-scoping too early** → Strict MVP gate before adventures/decor depth.
2. **Gamification feels manipulative** → gentle framing + optionality + no punitive mechanics.
3. **Web push inconsistency on iOS** → in-app reminders fallback + calendar export.
4. **Emotional tone mismatch** → copy system review + test scripts for language safety.

---

## 14) Build-Now Backlog (first 20 tickets)

1. Scaffold app + lint/test config
2. Add auth and single-user guard
3. Create Prisma schema v1
4. Seed starter goal templates
5. Implement onboarding wizard
6. Implement pet creation API/UI
7. Home screen shell
8. Goals list/create/edit
9. Goal completion transaction logic
10. Reward ledger and wallet endpoint
11. Mood check-in component + API
12. Trend chart v1
13. Journal prompt list + save entry
14. Breathing timer component + logs
15. Cat avatar renderer v1 (SVG/Lottie)
16. Cat reaction engine (state-based)
17. Shop item catalog endpoint
18. Purchase flow + inventory apply
19. Reminder preferences + cron jobs
20. E2E happy-path tests

---

## 15) Definition of Done (for clone parity milestone)

The app reaches “Finch-like core parity (cat edition)” when:
1. User can complete a full daily self-care loop in < 5 minutes.  
2. Cat visibly progresses and customizes from user actions.  
3. Mood, goals, and journaling data are tracked with meaningful trends.  
4. Experience is warm, polished, mobile-usable, and reliably deployable on Vercel.  
5. API endpoints are complete enough for external Life OS integration.

---

## 16) Immediate Next Action

Start Phase A immediately: initialize project architecture, auth, and schema; then deliver the MVP daily loop before adding depth features.
