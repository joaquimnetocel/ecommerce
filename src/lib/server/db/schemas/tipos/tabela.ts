import { boolean, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { tabelaProdutos } from '../produtos/tabela';

export const tabelaTipos = pgTable('tabelaTipos', {
	idTipos: uuid('idTipos').defaultRandom().primaryKey(),
	keyProdutos: uuid('keyProdutos')
		.notNull()
		.references(() => tabelaProdutos.idProdutos, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	nome: varchar('nome', {
		length: 100,
	}).notNull(),
	ativo: boolean('ativo').notNull().default(true),
});
