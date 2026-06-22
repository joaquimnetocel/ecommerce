import { db } from '$lib/server/db';
import { tabelaCategorias } from '$lib/server/db/schema';
import { asc } from 'drizzle-orm';

export async function funcaoLerCategorias() {
	return await db.select().from(tabelaCategorias).orderBy(asc(tabelaCategorias.campoNome));
}
