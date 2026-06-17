import { numeric, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const tabelaPedidos = pgTable('tabelaPedidos', {
	idPedidos: uuid().defaultRandom().primaryKey(),
	campoStatus: varchar({
		length: 50,
	}).notNull(),
	campoTotal: numeric({
		precision: 12,
		scale: 2,
	}).notNull(),
	campoCriadoEm: timestamp().defaultNow().notNull(),
	// keyUsuarios: uuid()
	// 	.notNull()
	// 	.references(() => tabelaUsuarios.idUsuarios),
});
