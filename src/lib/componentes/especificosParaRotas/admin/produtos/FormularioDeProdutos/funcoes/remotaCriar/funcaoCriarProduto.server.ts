import { funcaoGerarSlug } from '$lib/funcoes/funcaoGerarSlug';
import { tabelaProdutos } from '$lib/server/db/schema';
import type { typeExecutor } from '$lib/server/db/typeExecutor';
import { error } from '@sveltejs/kit';
import type { typeSchemaOutput } from '../../schema';

export async function funcaoCriarProduto({
	formProdutos,
	executor,
}: {
	executor: typeExecutor;
	formProdutos: typeSchemaOutput['formProdutos'];
}) {
	const { idProdutos, ...dadosSemId } = formProdutos;
	if (idProdutos !== undefined) {
		throw error(404, 'TENTANDO INSERIR UM PRODUTO COM ID');
	}
	const insercao = {
		...dadosSemId,
		campoSlug: funcaoGerarSlug(formProdutos.campoNome),
	};
	const [produtoCriado] = await executor.insert(tabelaProdutos).values(insercao).returning({
		idProdutos: tabelaProdutos.idProdutos,
	});
	return produtoCriado;
}
