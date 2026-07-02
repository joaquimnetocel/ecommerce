import { command } from '$app/server';
import { db } from '$lib/server/db';
import { tabelaProdutos } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const remotaApagarProduto = command('unchecked', async ({ idProdutos }) => {
	if (idProdutos === undefined) {
		return;
	}
	await db.delete(tabelaProdutos).where(eq(tabelaProdutos.idProdutos, idProdutos));
});
