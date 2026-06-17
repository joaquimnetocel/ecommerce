import { integer, numeric, pgTable, uuid } from 'drizzle-orm/pg-core';
import { tabelaPedidos } from '../pedidos/tabela';
// import { tabelaProdutos } from '../produtos/tabela';
import { tabelaVariantes } from '../variantes/tabela';

export const tabelaPedidosItens = pgTable('tabelaPedidosItens', {
	idItens: uuid().defaultRandom().primaryKey(),
	keyPedidos: uuid()
		.notNull()
		.references(() => tabelaPedidos.idPedidos, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	keyVariantes: uuid()
		.references(() => tabelaVariantes.idVariantes, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
	campoPrecoUnitario: numeric({
		precision: 12,
		scale: 2,
	}).notNull(),
	campoQuantidade: integer().notNull(),
	// keyProdutos: uuid()
	// 	.notNull()
	// 	.references(() => tabelaProdutos.idProdutos, {
	// 		onDelete: 'cascade',
	// 		onUpdate: 'cascade',
	// 	}),
	// campoNome: varchar({
	// 	length: 255,
	// }).notNull(),
});
