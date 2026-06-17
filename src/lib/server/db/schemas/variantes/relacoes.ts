import { relations } from 'drizzle-orm';
import { tabelaProdutos } from '../produtos/tabela';
import { tabelaVariantes } from './tabela';

export const relacoesVariantes = relations(tabelaVariantes, ({ one }) => ({
	relProduto: one(tabelaProdutos, {
		fields: [tabelaVariantes.keyProdutos],
		references: [tabelaProdutos.idProdutos],
	}),
}));
