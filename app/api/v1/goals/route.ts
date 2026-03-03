import { badRequest, ok, parseJson } from '@/lib/http';
import { goalSchema } from '@/lib/schemas';
import { id, logEvent, mutateStore, readStore } from '@/lib/store';

export async function GET() {
  const store = await readStore();
  return ok({ goals: store.goals });
}

export async function POST(request: Request) {
  const body = await parseJson(request);
  if (!body) return badRequest('Invalid JSON body');

  const parsed = goalSchema.safeParse(body);
  if (!parsed.success) return badRequest(parsed.error.message);

  const store = await mutateStore((s) => {
    const goal = {
      id: id('goal'),
      userId: s.user.id,
      title: parsed.data.title,
      category: parsed.data.category,
      frequency: parsed.data.frequency,
      streak: 0,
      createdAt: new Date().toISOString(),
    };
    s.goals.push(goal);
    logEvent(s, 'goal.created', goal);
  });

  return ok({ goals: store.goals }, 201);
}
