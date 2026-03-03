import { ok } from '@/lib/http';
import { readStore } from '@/lib/store';

export async function POST() {
  const store = await readStore();
  return ok({ pet: store.pet }, 201);
}
