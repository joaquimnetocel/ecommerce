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
		idVariantes: uuid().defaultRandom().primaryKey(),
		keyProdutos: uuid()
			.notNull()
			.references(() => tabelaProdutos.idProdutos, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		campoSku: varchar({ length: 100 }).notNull(),
		campoAtributos: jsonb().$type<Record<string, string>>().notNull(),
		campoPreco: numeric({
			precision: 12,
			scale: 2,
		}).notNull(),
		campoEstoque: integer().notNull(),
		campoAtivo: boolean().notNull().default(true),
		campoCriadoEm: timestamp().defaultNow().notNull(),
	},
	(table) => [index('indiceVariantesProduto').on(table.keyProdutos)],
);
