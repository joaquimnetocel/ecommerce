import { tamanhos } from '$lib/constantes/tamanhos';
import { boolean, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const tabelaProdutos = pgTable('tabelaProdutos', {
	idProdutos: uuid().defaultRandom().primaryKey(),
	campoNome: varchar({ length: tamanhos.produtos.campoNome }).notNull(),
	campoDescricao: text(),
	campoSlug: varchar({ length: tamanhos.produtos.campoSlug }).unique().notNull(),
	campoAtivo: boolean().default(true).notNull(),
	campoCriadoEm: timestamp().defaultNow().notNull(),
});
