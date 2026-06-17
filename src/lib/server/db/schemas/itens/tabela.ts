import { integer, numeric, pgTable, uuid } from 'drizzle-orm/pg-core';
import { tabelaPedidos } from '../pedidos/tabela';
// import { tabelaProdutos } from '../produtos/tabela';
import { tabelaVariantes } from '../variantes/tabela';

export const tabelaItens = pgTable('tabelaItens', {
	idItens: uuid('idItens').defaultRandom().primaryKey(),
	keyPedidos: uuid('keyPedidos')
		.notNull()
		.references(() => tabelaPedidos.idPedidos, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	keyVariantes: uuid('variant_id')
		.references(() => tabelaVariantes.idVariantes, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
	campoPrecoUnitario: numeric('campoPrecoUnitario', {
		precision: 12,
		scale: 2,
	}).notNull(),
	campoQuantidade: integer('campoQuantidade').notNull(),
	// keyProdutos: uuid('keyProdutos')
	// 	.notNull()
	// 	.references(() => tabelaProdutos.idProdutos, {
	// 		onDelete: 'cascade',
	// 		onUpdate: 'cascade',
	// 	}),
	// campoNome: varchar('campoNome', {
	// 	length: 255,
	// }).notNull(),
});
