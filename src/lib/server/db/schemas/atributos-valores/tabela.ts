import { boolean, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { tabelaAtributos } from '../atributos/tabela';

export const tabelaAtributosValores = pgTable('tabelaAtributosValores', {
	idAtributosValores: uuid().defaultRandom().primaryKey(),
	keyAtributos: uuid()
		.notNull()
		.references(() => tabelaAtributos.idAtributos, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	campoValor: varchar({
		length: 100,
	}).notNull(),
	campoAtivo: boolean().notNull().default(true),
});
