import { relations } from 'drizzle-orm';
import { tabelaTipos } from '../tipos/tabela';
import { tabelaTiposValores } from './tabela';

export const relacoesTiposValores = relations(tabelaTiposValores, ({ one }) => ({
	relTipo: one(tabelaTipos, {
		fields: [tabelaTiposValores.keyTipos],
		references: [tabelaTipos.idTipos],
	}),
}));
