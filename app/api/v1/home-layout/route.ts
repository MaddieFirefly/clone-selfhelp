import { badRequest, ok, parseJson } from '@/lib/http';
import { homeLayoutSchema } from '@/lib/schemas';
import { logEvent, mutateStore } from '@/lib/store';

export async function POST(request: Request) {
  const body = await parseJson(request);
  if (!body) return badRequest('Invalid JSON body');

  const parsed = homeLayoutSchema.safeParse(body);
  if (!parsed.success) return badRequest(parsed.error.message);

  const store = await mutateStore((s) => {
    s.homeLayout = parsed.data;
    logEvent(s, 'home-layout.updated', parsed.data);
  });

  return ok({ homeLayout: store.homeLayout });
}
