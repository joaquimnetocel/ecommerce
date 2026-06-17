import { tamanhosProdutos } from '$lib/constantes/schema/produtos';
import { boolean, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const tabelaProdutos = pgTable('tabelaProdutos', {
	idProdutos: uuid('idProdutos').defaultRandom().primaryKey(),
	campoNome: varchar('campoNome', { length: tamanhosProdutos.campoNome }).notNull(),
	campoDescricao: text('campoDescricao'),
	campoSlug: varchar('campoSlug', { length: tamanhosProdutos.campoSlug }).unique().notNull(),
	campoAtivo: boolean('campoAtivo').default(true).notNull(),
	campoCriadoEm: timestamp('campoCriadoEm').defaultNow().notNull(),
});
