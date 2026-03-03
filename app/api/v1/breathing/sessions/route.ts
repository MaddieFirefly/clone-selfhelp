import { badRequest, ok, parseJson } from '@/lib/http';
import { breathingSchema } from '@/lib/schemas';
import { id, logEvent, mutateStore } from '@/lib/store';

export async function POST(request: Request) {
  const body = await parseJson(request);
  if (!body) return badRequest('Invalid JSON body');

  const parsed = breathingSchema.safeParse(body);
  if (!parsed.success) return badRequest(parsed.error.message);

  const store = await mutateStore((s) => {
    const session = { id: id('breath'), userId: s.user.id, ...parsed.data, createdAt: new Date().toISOString() };
    s.breathingSessions.push(session);
    s.wallet.yarnBalls += 2;
    logEvent(s, 'breathing.completed', session);
  });

  return ok({ sessions: store.breathingSessions, wallet: store.wallet }, 201);
}
