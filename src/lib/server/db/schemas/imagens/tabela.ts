import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { tabelaProdutos } from '../produtos/tabela';

export const tabelaImagens = pgTable('tabelaImagens', {
	idImagens: uuid('idImagens').defaultRandom().primaryKey(),
	keyProdutos: uuid('keyProdutos')
		.notNull()
		.references(() => tabelaProdutos.idProdutos, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	campoUrl: text('campoUrl').notNull(),
	campoOrdem: integer('ordem').default(0).notNull(),
});
