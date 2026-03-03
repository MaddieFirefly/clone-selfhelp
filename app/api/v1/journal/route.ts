import { badRequest, ok, parseJson } from '@/lib/http';
import { journalSchema } from '@/lib/schemas';
import { id, logEvent, mutateStore, readStore } from '@/lib/store';

export async function GET() {
  const store = await readStore();
  return ok({ entries: store.journal });
}

export async function POST(request: Request) {
  const body = await parseJson(request);
  if (!body) return badRequest('Invalid JSON body');

  const parsed = journalSchema.safeParse(body);
  if (!parsed.success) return badRequest(parsed.error.message);

  const store = await mutateStore((s) => {
    const entry = { id: id('journal'), userId: s.user.id, ...parsed.data, createdAt: new Date().toISOString() };
    s.journal.unshift(entry);
    logEvent(s, 'journal.created', { entryId: entry.id, tags: entry.tags });
  });

  return ok({ entries: store.journal }, 201);
}
