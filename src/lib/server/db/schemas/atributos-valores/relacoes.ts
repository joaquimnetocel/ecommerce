import { relations } from 'drizzle-orm';
import { tabelaAtributos } from '../atributos/tabela';
import { tabelaAtributosValores } from './tabela';

export const relacoesAtributosValores = relations(tabelaAtributosValores, ({ one }) => ({
	relTipo: one(tabelaAtributos, {
		fields: [tabelaAtributosValores.keyTipos],
		references: [tabelaAtributos.idTipos],
	}),
}));
