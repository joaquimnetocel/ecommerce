import type { AnyPgColumn } from 'drizzle-orm/pg-core';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const tabelaCategorias = pgTable('tabelaCategorias', {
	idCategorias: uuid('id').primaryKey(),
	nome: varchar('nome', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).unique().notNull(),
	keyCategorias: uuid('keyCategorias').references((): AnyPgColumn => tabelaCategorias.idCategorias),
});
