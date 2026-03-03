import { badRequest, ok, parseJson } from '@/lib/http';
import { checkinSchema } from '@/lib/schemas';
import { id, logEvent, mutateStore } from '@/lib/store';

export async function POST(request: Request) {
  const body = await parseJson(request);
  if (!body) return badRequest('Invalid JSON body');

  const parsed = checkinSchema.safeParse(body);
  if (!parsed.success) return badRequest(parsed.error.message);

  const store = await mutateStore((s) => {
    const checkIn = { id: id('checkin'), userId: s.user.id, ...parsed.data, createdAt: new Date().toISOString() };
    s.checkins.push(checkIn);
    logEvent(s, 'checkin.created', checkIn);
  });

  return ok({ checkins: store.checkins }, 201);
}
