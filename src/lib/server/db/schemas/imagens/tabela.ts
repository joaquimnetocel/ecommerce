import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { tabelaProdutos } from '../produtos/tabela';

export const tabelaImagens = pgTable('tabelaImagens', {
	idImagens: uuid().defaultRandom().primaryKey(),
	campoNome: text().notNull(),
	campoTamanho: integer().notNull(),
	campoTipo: text().notNull(),
	keyProdutos: uuid()
		.notNull()
		.references(() => tabelaProdutos.idProdutos, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	campoUrl: text().notNull(),
	campoOrdem: integer().default(0).notNull(),
});
