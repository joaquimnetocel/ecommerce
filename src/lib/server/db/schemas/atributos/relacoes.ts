import { relations } from 'drizzle-orm';
import { tabelaAtributosValores } from '../atributos-valores/tabela';
import { tabelaProdutos } from '../produtos/tabela';
import { tabelaAtributos } from './tabela';

export const relacoesAtributos = relations(tabelaAtributos, ({ one, many }) => ({
	relProduto: one(tabelaProdutos, {
		fields: [tabelaAtributos.keyProdutos],
		references: [tabelaProdutos.idProdutos],
	}),
	relTiposValores: many(tabelaAtributosValores),
}));
