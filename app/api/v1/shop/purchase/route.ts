import { badRequest, notFound, ok, parseJson } from '@/lib/http';
import { purchaseSchema } from '@/lib/schemas';
import { id, logEvent, mutateStore } from '@/lib/store';

export async function POST(request: Request) {
  const body = await parseJson(request);
  if (!body) return badRequest('Invalid JSON body');

  const parsed = purchaseSchema.safeParse(body);
  if (!parsed.success) return badRequest(parsed.error.message);

  const store = await mutateStore((s) => {
    const item = s.shopItems.find((it) => it.id === parsed.data.itemId);
    if (!item) throw new Error('not-found');
    if (s.wallet.yarnBalls < item.price) throw new Error('insufficient-funds');

    s.wallet.yarnBalls -= item.price;
    s.inventory.push({ id: id('inv'), itemId: item.id, name: item.name, kind: item.kind, price: item.price, applied: false });
    logEvent(s, 'shop.purchased', { itemId: item.id, price: item.price });
  }).catch((err: Error) => err.message);

  if (store === 'not-found') return notFound('Shop item not found');
  if (store === 'insufficient-funds') return badRequest('Not enough yarn balls');

  const data = store as Awaited<ReturnType<typeof mutateStore>>;
  return ok({ wallet: data.wallet, inventory: data.inventory });
}
