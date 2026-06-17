import { command } from '$app/server';
import { db } from '$lib/server/db';
import { schema } from '../../schema';
import { funcaoAtualizarProduto } from './funcaoAtualizarProduto.server';
import { funcaoAtualizarVariantes } from './funcaoAtualizarVariantes.server';
import { funcaoCriarVariantes } from './funcaoCriarVariantes.server';

export const funcaoRemotaAtualizar = command(schema, async ({ formProdutos, formVariantes }) => {
	await db.transaction(async (tx) => {
		await funcaoAtualizarProduto({ executor: tx, dados: formProdutos });
		await funcaoAtualizarVariantes({ executor: tx, dados: formVariantes });
		if (formProdutos.idProdutos !== undefined) {
			await funcaoCriarVariantes({
				executor: tx,
				dados: formVariantes,
				keyProdutos: formProdutos.idProdutos,
			});
		}
	});
});
