import { ok } from '@/lib/http';
import { readStore } from '@/lib/store';

export async function GET() {
  const store = await readStore();
  return ok({ items: store.shopItems });
}
