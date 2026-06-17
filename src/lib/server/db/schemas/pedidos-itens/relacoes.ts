import { relations } from 'drizzle-orm';
import { tabelaPedidos } from '../pedidos/tabela';
import { tabelaPedidosItens } from './tabela';

export const relacoesItensDePedidos = relations(tabelaPedidosItens, ({ one }) => ({
	relPedido: one(tabelaPedidos, {
		fields: [tabelaPedidosItens.keyPedidos],
		references: [tabelaPedidos.idPedidos],
	}),
}));
