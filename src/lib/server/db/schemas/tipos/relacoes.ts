import { relations } from 'drizzle-orm';
import { tabelaProdutos } from '../produtos/tabela';
import { tabelaTiposValores } from '../tiposValores/tabela';
import { tabelaTipos } from './tabela';

export const relacoesTipos = relations(tabelaTipos, ({ one, many }) => ({
	relProduto: one(tabelaProdutos, {
		fields: [tabelaTipos.keyProdutos],
		references: [tabelaProdutos.idProdutos],
	}),
	relTiposValores: many(tabelaTiposValores),
}));
