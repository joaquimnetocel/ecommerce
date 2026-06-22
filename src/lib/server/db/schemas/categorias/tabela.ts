import { tamanhos } from '$lib/constantes/tamanhos';
import type { AnyPgColumn } from 'drizzle-orm/pg-core';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const tabelaCategorias = pgTable('tabelaCategorias', {
	idCategorias: uuid().defaultRandom().primaryKey(),
	campoNome: varchar({ length: tamanhos.categorias.campoNome }).notNull(),
	keyCategoriasPai: uuid().references((): AnyPgColumn => tabelaCategorias.idCategorias, {
		onDelete: 'cascade',
		onUpdate: 'cascade',
	}),
});
