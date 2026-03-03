# Project Kickoff — Clone Self-Help (Cat Edition)
**Date:** 2026-03-02

## Context

Maddie wants to clone the **Finch** self-care app (https://finchcare.com/) as a web app, re-themed with cats instead of birds. This is part of her Personal Life OS ecosystem and a stress test of autonomous AI agent development.

## What is Finch?

Finch is a self-care app where you raise a virtual pet bird by completing daily self-care tasks. As you take care of yourself, your pet grows, goes on adventures, and you earn rewards to customize it. It gamifies mental wellness in a warm, emotionally engaging way.

Core feature areas (the agent should research these deeply before building):
- **Pet companion** — virtual bird you name, raise, and customize
- **Daily check-ins** — mood and energy ratings
- **Goals/tasks** — suggested and custom self-care tasks that earn energy for your pet
- **Journaling** — prompts, free-form writing, gratitude practice
- **Breathing exercises** — guided breathing for different purposes
- **Mood tracking** — periodic ratings with trend visualization
- **Soundscapes & sleep routines**
- **Quizzes/assessments** — mental health check-ins with insights
- **Gamification** — currency, pet customization, home decoration, adventures, streaks
- **Social** — friends, supportive "vibes" messages

This list is a starting point. The implementing agent must research Finch thoroughly to understand the full depth of features, mechanics, and UX.

## What to Change from Finch

- **Cats, not birds.** Kittens → cats. Cat house. Cat adventures. Full re-theme.
- **Web app, not mobile app.** Must work on phone browsers and desktop. Mobile-first.
- **API-first backend.** Clean endpoints so other Life OS apps can consume the data (mood trends, habit completions, streaks, etc.).
- **Deploy on Vercel.**

## Plan of Action

### 1. Deep Research
- Study Finch exhaustively: app store pages, reviews, YouTube walkthroughs, wiki, blog posts, screenshots
- Map every feature, screen, flow, and game mechanic
- Understand the emotional design — what makes it charming and motivating
- Document findings in `.AI_PROJECT_MEMORY/`

### 2. Build a Spec
Based on research, create a comprehensive spec covering:
- Complete feature inventory (Finch features → cat-themed equivalents)
- Data model design
- API design
- UI/UX for mobile and desktop
- Tech stack choices (must deploy on Vercel, everything else is open)
- MVP scope vs. future scope
- Save to `.AI_PROJECT_MEMORY/`

### 3. Implement MVP
Build the core daily-use loop first:
- Cat companion you can see and interact with
- Daily check-in
- Goals/tasks that earn energy
- Journaling
- Breathing exercises
- Mood tracking
- Basic currency + customization
- Auth (single user)

### 4. Push Beyond MVP
Don't stop at "it works." Keep building:
- Adventures system
- Deeper customization (outfits, home decor)
- Soundscapes, sleep routines
- Quizzes and insights
- Social features
- Polish animations, transitions, micro-interactions
- Make it feel like a real product someone would love using daily

## The Challenge

This is an AI autonomy stress test. The goal: **build the most complete, polished Finch clone possible.** Research deeply, spec thoroughly, build ambitiously. Make every decision yourself — tech stack, design, architecture. The only hard constraints are Vercel deployment and cat theme.
