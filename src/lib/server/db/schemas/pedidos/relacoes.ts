import { relations } from 'drizzle-orm';
import { tabelaItens } from '../itens/tabela';
import { tabelaPedidos } from './tabela';

export const relacoesPedidos = relations(tabelaPedidos, ({ many }) => ({
	relItensDePedidos: many(tabelaItens),
}));
