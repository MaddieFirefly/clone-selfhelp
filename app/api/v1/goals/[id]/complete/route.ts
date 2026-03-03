import { notFound, ok } from '@/lib/http';
import { applyXpProgression, logEvent, mutateStore } from '@/lib/store';

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const store = await mutateStore((s) => {
    const goal = s.goals.find((g) => g.id === id);
    if (!goal) throw new Error('not-found');

    goal.streak += 1;
    goal.lastCompletedAt = new Date().toISOString();
    s.wallet.yarnBalls += 5;
    s.wallet.fishTreats += 1;
    applyXpProgression(s, 10);

    logEvent(s, 'goal.completed', { goalId: goal.id, reward: { yarnBalls: 5, fishTreats: 1, xp: 10 } });
  }).catch((err: Error) => err.message);

  if (store === 'not-found') return notFound('Goal not found');
  const data = store as Awaited<ReturnType<typeof mutateStore>>;
  return ok({ goals: data.goals, wallet: data.wallet, pet: data.pet });
}
