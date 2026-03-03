import { ok } from '@/lib/http';

export async function GET() {
  return ok({
    adventures: true,
    insightsWeekly: true,
    webPushReminders: false,
  });
}
