import { relations } from 'drizzle-orm';
import { tabelaProdutos } from '../produtos/tabela';
import { tabelaImagens } from './tabela';

export const relacoesImagens = relations(tabelaImagens, ({ one }) => ({
	relProduto: one(tabelaProdutos, {
		fields: [tabelaImagens.keyProdutos],
		references: [tabelaProdutos.idProdutos],
	}),
}));
