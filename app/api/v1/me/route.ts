import { ok } from '@/lib/http';
import { readStore } from '@/lib/store';

export async function GET() {
  const store = await readStore();
  return ok({ user: store.user, pet: store.pet, wallet: store.wallet });
}
