import { ok } from '@/lib/http';

export async function POST() {
  return ok({ loggedOut: true });
}
