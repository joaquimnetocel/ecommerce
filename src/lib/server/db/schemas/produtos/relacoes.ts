import { relations } from 'drizzle-orm';
import { tabelaCategoriasProdutos } from '../categorias-produtos/tabela';
import { tabelaImagens } from '../imagens/tabela';
import { tabelaTipos } from '../tipos/tabela';
import { tabelaVariantes } from '../variantes/tabela';
import { tabelaProdutos } from './tabela';

export const relacoesProdutos = relations(tabelaProdutos, ({ many }) => ({
	relCategoriasProdutos: many(tabelaCategoriasProdutos),
	relVariantes: many(tabelaVariantes),
	relTipos: many(tabelaTipos),
	relImagens: many(tabelaImagens),
}));
