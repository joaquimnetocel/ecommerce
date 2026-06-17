import { command } from '$app/server';
import { db } from '$lib/server/db';
import { schema } from '../../schema';
import { funcaoCriarProduto } from './funcaoCriarProduto.server';
import { funcaoCriarVariantes } from './funcaoCriarVariantes.server';

export const funcaoRemotaCriar = command(schema, async ({ formProdutos, formVariantes }) => {
	await db.transaction(async (tx) => {
		const produtoCriado = await funcaoCriarProduto({ executor: tx, dados: formProdutos });
		await funcaoCriarVariantes({
			executor: tx,
			dados: formVariantes,
			keyProdutos: produtoCriado.idProdutos,
		});
	});
});
