import { relations } from 'drizzle-orm';
import { tabelaCategorias } from '../categorias/tabela';
import { tabelaProdutos } from '../produtos/tabela';
import { tabelaCategoriasProdutos } from './tabela';

export const relacoesCategoriasProdutos = relations(tabelaCategoriasProdutos, ({ one }) => ({
	relProduto: one(tabelaProdutos, {
		fields: [tabelaCategoriasProdutos.keyProdutos],
		references: [tabelaProdutos.idProdutos],
	}),
	relCategoria: one(tabelaCategorias, {
		fields: [tabelaCategoriasProdutos.keyCategorias],
		references: [tabelaCategorias.idCategorias],
	}),
}));
