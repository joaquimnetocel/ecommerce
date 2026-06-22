import { command } from '$app/server';
import { db } from '$lib/server/db';
import { tabelaCategorias } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { schema } from './schema';

export const remotaApagar = command(schema, async (dados) => {
	if (dados.idCategorias === undefined) {
		error(400, 'O ID DA CATEGORIA É OBRIGATÓRIO PARA APAGAR UMA CATEGORIA.');
	}
	const [retorno] = await db
		.delete(tabelaCategorias)
		.where(eq(tabelaCategorias.idCategorias, dados.idCategorias))
		.returning();
	return retorno;
});
