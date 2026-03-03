import { promises as fs } from 'fs';
import path from 'path';
import { DataStore } from './types';

const DB_PATH = path.join(process.cwd(), '.AI_PROJECT_MEMORY', 'app-data.json');

const defaultData: DataStore = {
  user: {
    id: 'user_1',
    email: 'catfriend@example.com',
    name: 'Cat Friend',
    createdAt: new Date().toISOString(),
    onboardingComplete: false,
    checkInWindows: ['08:00', '20:00'],
  },
  pet: {
    id: 'pet_1',
    userId: 'user_1',
    name: 'Mochi',
    color: 'ginger',
    personality: 'curious',
    stage: 'kitten',
    xp: 0,
    energy: 100,
    cosmetics: [],
  },
  goals: [
    {
      id: 'goal_1',
      userId: 'user_1',
      title: 'Drink one glass of water',
      category: 'wellness',
      frequency: 'daily',
      streak: 0,
      createdAt: new Date().toISOString(),
    },
  ],
  checkins: [],
  journal: [],
  breathingSessions: [],
  wallet: {
    userId: 'user_1',
    yarnBalls: 50,
    fishTreats: 5,
  },
  shopItems: [
    { id: 'acc_bell', name: 'Tiny Bell Collar', kind: 'accessory', price: 20 },
    { id: 'bg_sunset', name: 'Sunset Windowsill', kind: 'background', price: 30 },
    { id: 'fur_rug', name: 'Cozy Rug', kind: 'furniture', price: 25 },
  ],
  inventory: [],
  adventures: [
    { id: 'adv_alley', name: 'Friendly Alley Patrol', minutes: 30, xpReward: 15, yarnReward: 8 },
    { id: 'adv_rooftop', name: 'Rooftop Stargazing', minutes: 45, xpReward: 25, yarnReward: 12 },
  ],
  adventureRuns: [],
  homeLayout: {
    background: 'starter-room',
    furniture: [],
  },
  eventLog: [],
};

async function ensureDb() {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(defaultData, null, 2));
  }
}

export async function readStore(): Promise<DataStore> {
  await ensureDb();
  const raw = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(raw) as DataStore;
}

export async function writeStore(data: DataStore): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export async function mutateStore(mutator: (store: DataStore) => void): Promise<DataStore> {
  const store = await readStore();
  mutator(store);
  await writeStore(store);
  return store;
}

export function id(prefix: string): string {
  return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
}

export function logEvent(store: DataStore, kind: string, payload: Record<string, unknown>) {
  store.eventLog.push({ id: id('event'), kind, payload, createdAt: new Date().toISOString() });
}

export function applyXpProgression(store: DataStore, xpGain: number) {
  store.pet.xp += xpGain;
  if (store.pet.xp >= 200) store.pet.stage = 'adult-cat';
  else if (store.pet.xp >= 80) store.pet.stage = 'young-cat';
}
