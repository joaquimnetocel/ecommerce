import { tamanhosProdutos } from '$lib/constantes/schema/produtos';
import { boolean, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const tabelaProdutos = pgTable('tabelaProdutos', {
	idProdutos: uuid().defaultRandom().primaryKey(),
	campoNome: varchar({ length: tamanhosProdutos.campoNome }).notNull(),
	campoDescricao: text(),
	campoSlug: varchar({ length: tamanhosProdutos.campoSlug }).unique().notNull(),
	campoAtivo: boolean().default(true).notNull(),
	campoCriadoEm: timestamp().defaultNow().notNull(),
});
