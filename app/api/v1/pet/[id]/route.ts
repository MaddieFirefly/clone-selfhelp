import { badRequest, notFound, ok, parseJson } from '@/lib/http';
import { mutateStore } from '@/lib/store';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const body = await parseJson<Record<string, string>>(request);
  if (!body) return badRequest('Invalid JSON body');

  const { id } = await params;
  const store = await mutateStore((s) => {
    if (s.pet.id !== id) throw new Error('not-found');
    s.pet.name = body.name ?? s.pet.name;
    s.pet.color = body.color ?? s.pet.color;
    s.pet.personality = body.personality ?? s.pet.personality;
  }).catch((err: Error) => err.message);

  if (store === 'not-found') return notFound('Pet not found');
  return ok({ pet: (store as Awaited<ReturnType<typeof mutateStore>>).pet });
}
