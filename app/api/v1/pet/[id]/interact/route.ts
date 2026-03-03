import { notFound, ok } from '@/lib/http';
import { logEvent, mutateStore } from '@/lib/store';

const reactions = ['purr', 'head-bump', 'happy-zoomies', 'slow-blink'];

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const store = await mutateStore((s) => {
    if (s.pet.id !== id) throw new Error('not-found');
    s.pet.energy = Math.min(100, s.pet.energy + 5);
    logEvent(s, 'pet.interact', { petId: id });
  }).catch((err: Error) => err.message);

  if (store === 'not-found') return notFound('Pet not found');

  return ok({
    pet: (store as Awaited<ReturnType<typeof mutateStore>>).pet,
    reaction: reactions[Math.floor(Math.random() * reactions.length)],
  });
}
