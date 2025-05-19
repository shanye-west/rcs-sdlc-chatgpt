import { db } from '$lib/db';
import { tournaments, rounds } from './schema';

async function seed() {
  // Create a tournament
  const [tournament] = await db
    .insert(tournaments)
    .values({
      name: 'Initial Tournament',
      is_active: true
    })
    .returning();

  // Create some rounds for the tournament
  await db.insert(rounds).values([
    {
      name: 'Round 1',
      tournament_id: tournament.id
    },
    {
      name: 'Round 2',
      tournament_id: tournament.id
    }
  ]);
}

seed().catch(console.error); 