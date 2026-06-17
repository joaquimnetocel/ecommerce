import { boolean, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { tabelaProdutos } from '../produtos/tabela';

export const tabelaAtributos = pgTable('tabelaAtributos', {
	idAtributos: uuid().defaultRandom().primaryKey(),
	keyProdutos: uuid()
		.notNull()
		.references(() => tabelaProdutos.idProdutos, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	campoNome: varchar({
		length: 100,
	}).notNull(),
	campoAtivo: boolean().notNull().default(true),
});
