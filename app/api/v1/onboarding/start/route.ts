import { badRequest, ok, parseJson } from '@/lib/http';
import { onboardingSchema } from '@/lib/schemas';
import { logEvent, mutateStore } from '@/lib/store';

export async function POST(request: Request) {
  const body = await parseJson(request);
  if (!body) return badRequest('Invalid JSON body');

  const parsed = onboardingSchema.safeParse(body);
  if (!parsed.success) return badRequest(parsed.error.message);

  const store = await mutateStore((s) => {
    s.user.name = parsed.data.userName;
    s.user.onboardingComplete = true;
    s.user.checkInWindows = parsed.data.checkInWindows;
    s.pet.name = parsed.data.petName;
    s.pet.color = parsed.data.color;
    s.pet.personality = parsed.data.personality;
    logEvent(s, 'onboarding.completed', parsed.data);
  });

  return ok({ user: store.user, pet: store.pet });
}
