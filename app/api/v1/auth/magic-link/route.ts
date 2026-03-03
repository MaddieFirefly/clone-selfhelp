import { ok } from '@/lib/http';

export async function POST() {
  return ok({ message: 'Magic link requested (stubbed for single-user local mode).' });
}
