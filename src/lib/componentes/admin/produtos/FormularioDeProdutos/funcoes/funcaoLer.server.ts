import { db } from '$lib/server/db';
import { tabelaProdutos } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function funcaoLer(parId: string) {
	const dados = await db.query.tabelaProdutos.findFirst({
		where: eq(tabelaProdutos.idProdutos, parId),
		with: {
			relVariantes: true,
			relImagens: true,
			relCategoriasProdutos: {
				with: {
					relCategoria: true,
				},
			},
		},
	});

	if (!dados) {
		throw error(404, 'PRODUTO NÃO ENCONTRADO');
	}

	return dados;
}
