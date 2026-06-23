import { command } from '$app/server';
import { db } from '$lib/server/db';
import { schema } from '../../schema';
import { funcaoCriarCategorias } from './funcaoCriarCategorias.server';
import { funcaoCriarProduto } from './funcaoCriarProduto.server';
import { funcaoCriarVariantes } from './funcaoCriarVariantes.server';

export const funcaoRemotaCriar = command(
	schema,
	async ({ formProdutos, formVariantes, formCategorias }) => {
		console.log(formCategorias);
		await db.transaction(async (tx) => {
			const produtoCriado = await funcaoCriarProduto({ executor: tx, formProdutos });
			await funcaoCriarVariantes({
				executor: tx,
				formVariantes,
				keyProdutos: produtoCriado.idProdutos,
			});
			await funcaoCriarCategorias({
				executor: tx,
				formCategorias,
				idProdutos: produtoCriado.idProdutos,
			});
		});
	},
);
