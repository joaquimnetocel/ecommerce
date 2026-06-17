import { db } from '$lib/server/db';

export async function funcaoLer({ campoAtivo }: { campoAtivo: boolean }) {
	const dados = await db.query.tabelaProdutos.findMany({
		where: (par, { eq }) => eq(par.campoAtivo, campoAtivo),
		orderBy: (par, { desc }) => [desc(par.campoCriadoEm)],
	});
	return dados;
}
