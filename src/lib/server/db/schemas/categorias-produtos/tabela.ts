import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';
import { tabelaCategorias } from '../categorias/tabela';
import { tabelaProdutos } from '../produtos/tabela';

export const tabelaCategoriasProdutos = pgTable(
	'tabelaCategoriasProdutos',
	{
		keyProdutos: uuid('keyProdutos')
			.notNull()
			.references(() => tabelaProdutos.idProdutos, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		keyCategorias: uuid('keyCategorias')
			.notNull()
			.references(() => tabelaCategorias.idCategorias, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
	},
	(table) => [
		primaryKey({
			columns: [table.keyProdutos, table.keyCategorias],
		}),
	],
);
