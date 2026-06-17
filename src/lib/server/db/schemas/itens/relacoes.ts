import { relations } from 'drizzle-orm';
import { tabelaPedidos } from '../pedidos/tabela';
import { tabelaItens } from './tabela';

export const relacoesItensDePedidos = relations(tabelaItens, ({ one }) => ({
	relPedido: one(tabelaPedidos, {
		fields: [tabelaItens.keyPedidos],
		references: [tabelaPedidos.idPedidos],
	}),
}));
