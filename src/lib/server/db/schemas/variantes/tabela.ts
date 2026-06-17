import {
	boolean,
	index,
	integer,
	jsonb,
	numeric,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { tabelaProdutos } from '../produtos/tabela';

export const tabelaVariantes = pgTable(
	'tabelaVariantes',
	{
		idVariantes: uuid('idVariantes').defaultRandom().primaryKey(),
		keyProdutos: uuid('keyProdutos')
			.notNull()
			.references(() => tabelaProdutos.idProdutos, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		campoSku: varchar('campoSku', { length: 100 }).notNull(),
		campoAtributos: jsonb('campoAtributos').$type<Record<string, string>>().notNull(),
		campoPreco: numeric('campoPreco', {
			precision: 12,
			scale: 2,
		}).notNull(),
		campoEstoque: integer('campoEstoque').notNull(),
		campoAtivo: boolean('campoAtivo').notNull().default(true),
		campoCriadoEm: timestamp('campoCriadoEm').defaultNow().notNull(),
	},
	(table) => ({
		keyProdutosIndex: index('idx_variantes_produto').on(table.keyProdutos),
	}),
);
