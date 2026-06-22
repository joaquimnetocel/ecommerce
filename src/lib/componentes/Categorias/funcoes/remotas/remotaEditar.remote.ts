import { command } from '$app/server';
import { db } from '$lib/server/db';
import { tabelaCategorias } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { schema } from './schema';

export const remotaEditar = command(schema, async (dados) => {
	if (dados.idCategorias === undefined) {
		error(400, 'O ID DA CATEGORIA É OBRIGATÓRIO PARA EDITAR UMA CATEGORIA.');
	}
	const [retorno] = await db
		.update(tabelaCategorias)
		.set(dados)
		.where(eq(tabelaCategorias.idCategorias, dados.idCategorias))
		.returning();
	return retorno;
});
