'use client';

import { useEffect, useMemo, useState } from 'react';

type Dashboard = {
  user: { name: string; onboardingComplete: boolean };
  pet: { id: string; name: string; stage: string; xp: number; color: string; personality: string };
  wallet: { yarnBalls: number; fishTreats: number };
  goals: Array<{ id: string; title: string; streak: number; snoozedUntil?: string }>;
  journal: Array<{ id: string; content: string; createdAt: string }>;
  checkins: Array<{ id: string; mood: number; energy: number; stress: number; createdAt: string }>;
  inventory: Array<{ id: string; name: string }>;
};

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as T;
}

export default function Page() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [goalTitle, setGoalTitle] = useState('');
  const [journalContent, setJournalContent] = useState('');
  const [status, setStatus] = useState('Loading cozy cat dashboard...');

  const refresh = async () => {
    const [me, goals, journal, trend, inventory] = await Promise.all([
      fetchJson<{ user: Dashboard['user']; pet: Dashboard['pet']; wallet: Dashboard['wallet'] }>('/api/v1/me'),
      fetchJson<{ goals: Dashboard['goals'] }>('/api/v1/goals'),
      fetchJson<{ entries: Dashboard['journal'] }>('/api/v1/journal'),
      fetchJson<{ entries: Dashboard['checkins'] }>('/api/v1/checkins/trends?range=7d'),
      fetchJson<{ inventory: Dashboard['inventory'] }>('/api/v1/inventory'),
    ]);

    setData({
      ...me,
      goals: goals.goals,
      journal: journal.entries,
      checkins: trend.entries,
      inventory: inventory.inventory,
    });
  };

  useEffect(() => {
    refresh().then(() => setStatus('Ready')).catch(() => setStatus('Could not load app data.'));
  }, []);

  const weeklyMood = useMemo(() => {
    if (!data?.checkins.length) return 'No check-ins yet';
    const avg = data.checkins.reduce((sum, c) => sum + c.mood, 0) / data.checkins.length;
    return `${avg.toFixed(1)} / 5`;
  }, [data]);

  const completeGoal = async (goalId: string) => {
    await fetchJson(`/api/v1/goals/${goalId}/complete`, { method: 'POST' });
    await refresh();
    setStatus('Nice work! Your cat gained XP and yarn balls.');
  };

  if (!data) return <main className="shell"><p>{status}</p></main>;

  return (
    <main className="shell">
      <header className="card hero">
        <h1>🐾 {data.pet.name}&apos;s Cozy Self-Help Home</h1>
        <p>
          Hi {data.user.name}! Keep tiny promises to yourself and help your {data.pet.stage} grow.
        </p>
        <div className="wallet">
          <span>Yarn Balls: {data.wallet.yarnBalls}</span>
          <span>Fish Treats: {data.wallet.fishTreats}</span>
          <span>XP: {data.pet.xp}</span>
        </div>
      </header>

      <section className="grid">
        <article className="card">
          <h2>Today&apos;s Goals</h2>
          <ul>
            {data.goals.map((goal) => (
              <li key={goal.id} className="row">
                <div>
                  <strong>{goal.title}</strong>
                  <p>Streak: {goal.streak}</p>
                </div>
                <button onClick={() => completeGoal(goal.id)}>Complete</button>
              </li>
            ))}
          </ul>
          <div className="row">
            <input value={goalTitle} onChange={(e) => setGoalTitle(e.target.value)} placeholder="Add a gentle goal" />
            <button
              onClick={async () => {
                if (!goalTitle.trim()) return;
                await fetchJson('/api/v1/goals', {
                  method: 'POST',
                  body: JSON.stringify({ title: goalTitle, category: 'wellness', frequency: 'daily' }),
                });
                setGoalTitle('');
                await refresh();
              }}
            >
              Add
            </button>
          </div>
        </article>

        <article className="card">
          <h2>Check-in + Journal</h2>
          <p>Weekly mood average: {weeklyMood}</p>
          <div className="row">
            <button onClick={async () => { await fetchJson('/api/v1/checkins', { method: 'POST', body: JSON.stringify({ mood: 4, energy: 3, stress: 2 }) }); await refresh(); }}>
              Quick check-in
            </button>
            <button onClick={async () => { await fetchJson('/api/v1/breathing/sessions', { method: 'POST', body: JSON.stringify({ pattern: 'box', seconds: 120 }) }); await refresh(); }}>
              2-min breathing
            </button>
          </div>
          <textarea value={journalContent} onChange={(e) => setJournalContent(e.target.value)} placeholder="How are you feeling right now?" />
          <button
            onClick={async () => {
              if (!journalContent.trim()) return;
              await fetchJson('/api/v1/journal', {
                method: 'POST',
                body: JSON.stringify({ content: journalContent, tags: ['daily-reflection'] }),
              });
              setJournalContent('');
              await refresh();
            }}
          >
            Save reflection
          </button>
        </article>

        <article className="card">
          <h2>Cat House + Inventory</h2>
          <p>{data.pet.name} is a {data.pet.color} cat with a {data.pet.personality} personality.</p>
          <button onClick={async () => { await fetchJson(`/api/v1/pet/${data.pet.id}/interact`, { method: 'POST' }); await refresh(); setStatus('Your cat loved that interaction.'); }}>
            Pet interaction
          </button>
          <h3>Inventory</h3>
          <ul>
            {data.inventory.length === 0 ? <li>No items yet. Visit shop API to purchase.</li> : data.inventory.map((item) => <li key={item.id}>{item.name}</li>)}
          </ul>
        </article>
      </section>
      <p>{status}</p>
    </main>
  );
}
