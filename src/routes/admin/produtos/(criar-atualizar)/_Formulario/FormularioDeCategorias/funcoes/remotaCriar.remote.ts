import { command } from '$app/server';
import { db } from '$lib/server/db';
import { tabelaCategorias } from '$lib/server/db/schema';
import { schema } from '../schema';

export const remotaCriar = command(schema, async (dados) => {
	const [inserido] = await db.insert(tabelaCategorias).values(dados).returning();
	return inserido;
});
