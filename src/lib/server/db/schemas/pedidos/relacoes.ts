import { relations } from 'drizzle-orm';
import { tabelaPedidosItens } from '../pedidos-itens/tabela';
import { tabelaPedidos } from './tabela';

export const relacoesPedidos = relations(tabelaPedidos, ({ many }) => ({
	relItensDePedidos: many(tabelaPedidosItens),
}));
