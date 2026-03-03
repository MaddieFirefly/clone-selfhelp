# CLAUDE.md — Clone Self-Help (Cat Edition)

## Project Overview

**Clone Self-Help** is a web app clone of the **Finch** self-care app (https://finchcare.com/), re-themed with cats instead of birds. The goal is to faithfully recreate Finch's experience — raising a virtual pet by completing daily self-care activities — but as a web app with cats.

This is also a **stress test of autonomous AI agent development**. Push the limits of what you can build.

Part of Maddie's Personal Life OS ecosystem.

---

## Your Mission

### Phase 1: Research
Before writing any code, deeply research the Finch app:
- Study the app store listings, reviews, walkthroughs, YouTube demos, wiki pages, and any available screenshots
- Understand every feature, screen, interaction, and game mechanic
- Map out the full user journey from onboarding to daily use
- Understand what makes Finch emotionally engaging — the charm, the pacing, the reward loops

### Phase 2: Spec
Build a comprehensive spec based on your research:
- Full feature inventory (what Finch does, mapped to the cat-themed version)
- Data model
- API design
- UI/UX design for both mobile and desktop
- Tech stack decisions (must deploy on Vercel — everything else is your call)
- Write the spec to `.AI_PROJECT_MEMORY/` before building

### Phase 3: Build
Implement the clone. Start with MVP, then keep pushing:
- Don't stop at "it works" — make it polished, delightful, and feature-rich
- The gamification should actually motivate daily use
- This should feel warm and charming, not clinical

---

## Key Constraints

- **Cats, not birds.** Kittens grow into cats. Cat house. Cat adventures. Full re-theme.
- **Web app.** Must work great on phone browsers (primary daily driver) AND desktop.
- **Deploy on Vercel.** Same account as other Life OS projects.
- **API-first backend.** Every feature needs clean API endpoints — other Life OS apps will consume this data eventually.
- **Single user** with auth to prevent public access.

---

## Working Principles

1. **Research before building** — understand Finch deeply before writing code
2. **Plan mode mandatory** for non-trivial tasks
3. **Use subagents** liberally for parallel work
4. **Mobile-first** — this is a daily-use personal tool
5. **Charm matters** — Finch succeeds because it's emotionally engaging. Match that energy.
6. **Push the limits** — after core works, keep improving. Make this the best app you can.
7. **Track progress** in `.AI_PROJECT_MEMORY/`

---

## Reference

- **Finch app:** https://finchcare.com/
- **Kickoff doc:** `.AI_PROJECT_MEMORY/2026-03-02_project-kickoff.md`
