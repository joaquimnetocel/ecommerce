import { relations } from 'drizzle-orm';
import { tabelaCategoriasProdutos } from '../categorias_produtos/tabela';
import { tabelaImagens } from '../imagens/tabela';
import { tabelaVariantes } from '../variantes/tabela';
import { tabelaProdutos } from './tabela';

export const relacoesProdutos = relations(tabelaProdutos, ({ many }) => ({
	relCategoriasProdutos: many(tabelaCategoriasProdutos),
	relVariantes: many(tabelaVariantes),
	relImagens: many(tabelaImagens),
}));
