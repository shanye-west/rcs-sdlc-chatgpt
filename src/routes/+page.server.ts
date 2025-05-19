// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { tournaments, rounds } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
  try {
    console.log('Starting to fetch tournament data...');
    
    // 1. Fetch the active tournament
    const tournamentResult = await db
      .select({
        id: tournaments.id,
        name: tournaments.name
      })
      .from(tournaments)
      .where(eq(tournaments.is_active, true))
      .limit(1);

    console.log('Tournament query result:', tournamentResult);

    if (!tournamentResult.length) {
      console.log('No active tournament found');
      return {
        tournament: null,
        rounds: []
      };
    }

    const tournament = tournamentResult[0];

    // 2. Fetch all rounds for that tournament
    const roundList = await db
      .select({
        id: rounds.id,
        name: rounds.name
      })
      .from(rounds)
      .where(eq(rounds.tournament_id, tournament.id))
      .orderBy(rounds.id);

    console.log('Rounds query result:', roundList);

    return {
      tournament,
      rounds: roundList
    };
  } catch (error) {
    console.error('Error in page load:', error);
    throw error;
  }
};