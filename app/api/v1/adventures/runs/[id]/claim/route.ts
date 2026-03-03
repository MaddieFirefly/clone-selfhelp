import { conflict, notFound, ok, unprocessable } from '@/lib/http';
import { applyXpProgression, logEvent, mutateStore } from '@/lib/store';

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const result = await mutateStore((s) => {
    const run = s.adventureRuns.find((r) => r.id === id);
    if (!run) throw new Error('not-found');
    if (run.claimed) throw new Error('already-claimed');
    if (new Date(run.endsAt).getTime() > Date.now()) throw new Error('not-ready');

    const adventure = s.adventures.find((a) => a.id === run.adventureId);
    if (!adventure) throw new Error('not-found');

    run.claimed = true;
    s.wallet.yarnBalls += adventure.yarnReward;
    applyXpProgression(s, adventure.xpReward);
    logEvent(s, 'adventure.claimed', { runId: run.id, rewards: { yarn: adventure.yarnReward, xp: adventure.xpReward } });
  }).catch((err: Error) => err.message);

  if (result === 'not-found') return notFound('Adventure run not found');
  if (result === 'already-claimed') return conflict('Run already claimed');
  if (result === 'not-ready') return unprocessable('Run still in progress');

  const store = result as Awaited<ReturnType<typeof mutateStore>>;
  return ok({ runs: store.adventureRuns, wallet: store.wallet, pet: store.pet });
}
