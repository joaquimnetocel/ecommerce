import { funcaoGerarSlug } from '$lib/funcoes/funcaoGerarSlug';
import { tabelaProdutos } from '$lib/server/db/schema';
import type { typeExecutor } from '$lib/server/db/typeExecutor';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { typeSchemaOutput } from '../../schema';

export async function funcaoAtualizarProduto({
	executor,
	dados,
}: {
	executor: typeExecutor;
	dados: typeSchemaOutput['formProdutos'];
}) {
	const { idProdutos, ...dadosSemId } = dados;
	if (idProdutos === undefined) {
		error(400, 'O ID DO PRODUTO É OBRIGATÓRIO PARA ATUALIZAR UM PRODUTO.');
	}
	const atualizacao = {
		...dadosSemId,
		campoSlug: funcaoGerarSlug(dados.campoNome),
	};
	await executor
		.update(tabelaProdutos)
		.set(atualizacao)
		.where(eq(tabelaProdutos.idProdutos, idProdutos));
}
