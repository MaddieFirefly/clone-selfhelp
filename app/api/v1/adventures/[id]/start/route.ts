import { notFound, ok } from '@/lib/http';
import { id, logEvent, mutateStore } from '@/lib/store';

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const { id: adventureId } = params;
  const store = await mutateStore((s) => {
    const adventure = s.adventures.find((a) => a.id === adventureId);
    if (!adventure) throw new Error('not-found');

    const startedAt = new Date();
    const endsAt = new Date(startedAt.getTime() + adventure.minutes * 60_000);

    const run = {
      id: id('run'),
      userId: s.user.id,
      petId: s.pet.id,
      adventureId,
      startedAt: startedAt.toISOString(),
      endsAt: endsAt.toISOString(),
      claimed: false,
    };

    s.adventureRuns.push(run);
    logEvent(s, 'adventure.started', run);
  }).catch((err: Error) => err.message);

  if (store === 'not-found') return notFound('Adventure not found');
  return ok({ runs: (store as Awaited<ReturnType<typeof mutateStore>>).adventureRuns }, 201);
}
