import { integer, numeric, pgTable, uuid } from 'drizzle-orm/pg-core';
import { tabelaPedidos } from '../pedidos/tabela';
import { tabelaVariantes } from '../variantes/tabela';

export const tabelaPedidosItens = pgTable('tabelaPedidosItens', {
	idItens: uuid().defaultRandom().primaryKey(),
	keyPedidos: uuid()
		.notNull()
		.references(() => tabelaPedidos.idPedidos, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	keyVariantes: uuid().references(() => tabelaVariantes.idVariantes, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
	campoPrecoUnitario: numeric({
		precision: 12,
		scale: 2,
	}).notNull(),
	campoQuantidade: integer().notNull(),
});
