import { boolean, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { tabelaTipos } from '../tipos/tabela';

export const tabelaTiposValores = pgTable('tabelaTiposValores', {
	idTiposValores: uuid('idTiposValores').defaultRandom().primaryKey(),
	keyTipos: uuid('keyTipos')
		.notNull()
		.references(() => tabelaTipos.idTipos, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	valor: varchar('valor', {
		length: 100,
	}).notNull(),
	ativo: boolean('ativo').notNull().default(true),
});
