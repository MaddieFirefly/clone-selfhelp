import { notFound, ok } from '@/lib/http';
import { logEvent, mutateStore } from '@/lib/store';

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const store = await mutateStore((s) => {
    const goal = s.goals.find((g) => g.id === id);
    if (!goal) throw new Error('not-found');
    const snoozed = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    goal.snoozedUntil = snoozed;
    logEvent(s, 'goal.snoozed', { goalId: id, snoozedUntil: snoozed });
  }).catch((err: Error) => err.message);

  if (store === 'not-found') return notFound('Goal not found');
  return ok({ goals: (store as Awaited<ReturnType<typeof mutateStore>>).goals });
}
