import { ok } from '@/lib/http';

export async function POST() {
  return ok({ verified: true, session: 'local-dev-session' });
}
