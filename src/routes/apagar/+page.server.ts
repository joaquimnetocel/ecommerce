import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const item = await db.query.tabelaItens.findFirst({
		where: (tabela, { eq }) => eq(tabela.idItens, '06e12e9d-5748-4421-bb96-f1ecdd290f47'),
		with: {
			relPedido: true,
		},
	});
	return {
		item,
	};
};
