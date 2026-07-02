import { command } from '$app/server';
import { db } from '$lib/server/db';
import { schema } from '../../schema';
import { funcaoAtualizarProduto } from './funcaoAtualizarProduto.server';
import { funcaoAtualizarVariantes } from './funcaoAtualizarVariantes.server';
import { funcaoCriarCategorias } from './funcaoCriarCategorias.server';
import { funcaoCriarImagens } from './funcaoCriarImagens';
import { funcaoCriarVariantes } from './funcaoCriarVariantes.server';

export const remotaAtualizar = command(
	schema,
	async ({ formProdutos, formVariantes, formCategorias, formImagens }) => {
		await db.transaction(async (tx) => {
			await funcaoAtualizarProduto({ executor: tx, formProdutos });
			await funcaoAtualizarVariantes({
				executor: tx,
				formVariantes,
				keyProdutos: formProdutos.idProdutos,
			});
			if (formProdutos.idProdutos !== undefined) {
				await funcaoCriarImagens({
					executor: tx,
					formImagens,
					keyProdutos: formProdutos.idProdutos,
				});
				await funcaoCriarVariantes({
					executor: tx,
					formVariantes,
					keyProdutos: formProdutos.idProdutos,
				});
				await funcaoCriarCategorias({
					executor: tx,
					formCategorias,
					idProdutos: formProdutos.idProdutos,
				});
			}
		});
	},
);
