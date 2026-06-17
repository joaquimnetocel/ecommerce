import { numeric, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const tabelaPedidos = pgTable('tabelaPedidos', {
	idPedidos: uuid('idPedidos').defaultRandom().primaryKey(),
	campoStatus: varchar('campoStatus', {
		length: 50,
	}).notNull(),
	campoTotal: numeric('campoTotal', {
		precision: 12,
		scale: 2,
	}).notNull(),
	campoCriadoEm: timestamp('campoCriadoEm').defaultNow().notNull(),
	// keyUsuarios: uuid('keyUsuarios')
	// 	.notNull()
	// 	.references(() => tabelaUsuarios.idUsuarios),
});
