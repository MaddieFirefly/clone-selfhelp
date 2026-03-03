export type Mood = 1 | 2 | 3 | 4 | 5;

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  onboardingComplete: boolean;
  checkInWindows: string[];
}

export interface Pet {
  id: string;
  userId: string;
  name: string;
  color: string;
  personality: string;
  stage: 'kitten' | 'young-cat' | 'adult-cat';
  xp: number;
  energy: number;
  cosmetics: string[];
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  category: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  lastCompletedAt?: string;
  snoozedUntil?: string;
  createdAt: string;
}

export interface CheckIn {
  id: string;
  userId: string;
  mood: Mood;
  energy: Mood;
  stress: Mood;
  note?: string;
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  prompt?: string;
  content: string;
  mood?: Mood;
  tags: string[];
  createdAt: string;
}

export interface BreathingSession {
  id: string;
  userId: string;
  pattern: 'box' | '4-7-8' | 'calm-cadence';
  seconds: number;
  createdAt: string;
}

export interface Wallet {
  userId: string;
  yarnBalls: number;
  fishTreats: number;
}

export interface InventoryItem {
  id: string;
  itemId: string;
  name: string;
  kind: 'accessory' | 'background' | 'furniture';
  price: number;
  applied: boolean;
}

export interface ShopItem {
  id: string;
  name: string;
  kind: 'accessory' | 'background' | 'furniture';
  price: number;
}

export interface Adventure {
  id: string;
  name: string;
  minutes: number;
  xpReward: number;
  yarnReward: number;
}

export interface AdventureRun {
  id: string;
  userId: string;
  petId: string;
  adventureId: string;
  startedAt: string;
  endsAt: string;
  claimed: boolean;
}

export interface EventLog {
  id: string;
  kind: string;
  payload: Record<string, unknown>;
  createdAt: string;
}

export interface DataStore {
  user: User;
  pet: Pet;
  goals: Goal[];
  checkins: CheckIn[];
  journal: JournalEntry[];
  breathingSessions: BreathingSession[];
  wallet: Wallet;
  shopItems: ShopItem[];
  inventory: InventoryItem[];
  adventures: Adventure[];
  adventureRuns: AdventureRun[];
  homeLayout: { background: string; furniture: string[] };
  eventLog: EventLog[];
}
