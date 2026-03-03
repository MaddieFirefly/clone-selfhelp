import { ok } from '@/lib/http';
import { readStore } from '@/lib/store';

export async function GET() {
  const store = await readStore();

  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const weekCheckins = store.checkins.filter((c) => new Date(c.createdAt).getTime() >= sevenDaysAgo);
  const weekGoals = store.goals.filter((g) => g.lastCompletedAt && new Date(g.lastCompletedAt).getTime() >= sevenDaysAgo);

  const avgMood = weekCheckins.length
    ? weekCheckins.reduce((sum, c) => sum + c.mood, 0) / weekCheckins.length
    : 0;

  return ok({
    summary: {
      checkinsCompleted: weekCheckins.length,
      goalsTouched: weekGoals.length,
      avgMood,
    },
    coachingCards: [
      'You did best when check-ins happened around your preferred windows.',
      'Try one tiny goal right after waking up for an easy first win.',
      'On high-stress days, a 2-minute breathing break helped you recover.',
    ],
  });
}
