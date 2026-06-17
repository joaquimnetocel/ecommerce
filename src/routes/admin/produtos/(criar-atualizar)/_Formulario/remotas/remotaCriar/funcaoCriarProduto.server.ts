import { funcaoGerarSlug } from '$lib/funcoes/funcaoGerarSlug';
import { tabelaProdutos } from '$lib/server/db/schema';
import type { typeExecutor } from '$lib/server/db/typeExecutor';
import { error } from '@sveltejs/kit';
import type { typeSchemaOutput } from '../../schema';

export async function funcaoCriarProduto({
	dados,
	executor,
}: {
	executor: typeExecutor;
	dados: typeSchemaOutput['formProdutos'];
}) {
	const { idProdutos, ...dadosSemId } = dados;
	if (idProdutos !== undefined) {
		throw error(404, 'TENTANDO INSERIR UM PRODUTO COM ID');
	}
	const insercao = {
		...dadosSemId,
		campoSlug: funcaoGerarSlug(dados.campoNome),
	};
	const [produtoCriado] = await executor.insert(tabelaProdutos).values(insercao).returning({
		idProdutos: tabelaProdutos.idProdutos,
	});
	return produtoCriado;
}
