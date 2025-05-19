// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { tournaments, rounds } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
  // 1. Fetch the active tournament
  const [tournament] = await db
    .select({
      id: tournaments.id,
      name: tournaments.name
    })
    .from(tournaments)
    .where(tournaments.is_active.eq(true))
    .limit(1);

  // 2. Fetch all rounds for that tournament
  const roundList = await db
    .select({
      id: rounds.id,
      name: rounds.name
    })
    .from(rounds)
    .where(rounds.tournament_id.eq(tournament.id))
    .orderBy(rounds.id);

  return {
    tournament,
    rounds: roundList
  };
};