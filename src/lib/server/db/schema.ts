import { pgTable, serial, text, integer, boolean } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	age: integer('age')
});

export const tournaments = pgTable('tournaments', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	is_active: boolean('is_active').notNull().default(true)
});

export const rounds = pgTable('rounds', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	tournament_id: integer('tournament_id').notNull().references(() => tournaments.id)
});
