import { badRequest, notFound, ok, parseJson } from '@/lib/http';
import { mutateStore } from '@/lib/store';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await parseJson<Record<string, string>>(request);
  if (!body) return badRequest('Invalid JSON body');

  const { id } = params;
  const store = await mutateStore((s) => {
    const goal = s.goals.find((g) => g.id === id);
    if (!goal) throw new Error('not-found');
    goal.title = body.title ?? goal.title;
    goal.category = body.category ?? goal.category;
  }).catch((err: Error) => err.message);

  if (store === 'not-found') return notFound('Goal not found');
  return ok({ goals: (store as Awaited<ReturnType<typeof mutateStore>>).goals });
}
