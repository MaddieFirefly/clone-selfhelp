# Manual Tasks for Human

1. **Production auth setup**
   - Wire passkey/magic-link provider (e.g., Clerk, Supabase Auth, Auth.js) and replace local auth stubs in `/api/v1/auth/*`.
   - Configure production secrets in Vercel.

2. **Database migration**
   - Replace `.AI_PROJECT_MEMORY/app-data.json` local storage with a production database (recommended: Postgres + Prisma).
   - Add migrations and seed strategy.

3. **Notifications**
   - Configure web push or alternative reminder pipeline (cron/queue) for reminder delivery.

4. **Observability and privacy review**
   - Add structured logging/metrics with PII redaction.
   - Validate GDPR/privacy policy text before public launch.

5. **Content/copy pass**
   - Perform human review for tone quality and mental-health-safe language on all user-facing copy.

6. **App store-grade polish**
   - Add richer illustrations/animations and expanded cat house assets before broad rollout.
