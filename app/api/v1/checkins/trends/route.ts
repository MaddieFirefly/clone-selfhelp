import { ok } from '@/lib/http';
import { readStore } from '@/lib/store';

export async function GET(request: Request) {
  const store = await readStore();
  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range') ?? '7d';
  const days = range === '90d' ? 90 : range === '30d' ? 30 : 7;
  const since = Date.now() - days * 24 * 60 * 60 * 1000;
  const entries = store.checkins.filter((c) => new Date(c.createdAt).getTime() >= since);

  const average = (key: 'mood' | 'energy' | 'stress') =>
    entries.length ? entries.reduce((sum, entry) => sum + entry[key], 0) / entries.length : 0;

  return ok({ range, count: entries.length, averages: { mood: average('mood'), energy: average('energy'), stress: average('stress') }, entries });
}
