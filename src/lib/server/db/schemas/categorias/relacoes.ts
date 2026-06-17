import { relations } from 'drizzle-orm';
import { tabelaCategoriasProdutos } from '../categorias_produtos/tabela';
import { tabelaCategorias } from './tabela';

export const relacoesCategorias = relations(tabelaCategorias, ({ one, many }) => ({
	pai: one(tabelaCategorias, {
		fields: [tabelaCategorias.keyCategorias],
		references: [tabelaCategorias.idCategorias],
	}),
	filhas: many(tabelaCategorias),
	relCategoriasProdutos: many(tabelaCategoriasProdutos),
}));
