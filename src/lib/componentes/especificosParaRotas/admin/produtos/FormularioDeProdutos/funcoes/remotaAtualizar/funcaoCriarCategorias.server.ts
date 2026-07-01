import { tabelaCategoriasProdutos } from '$lib/server/db/schema';
import type { typeExecutor } from '$lib/server/db/typeExecutor';
import { eq } from 'drizzle-orm';
import type { typeSchemaOutput } from '../../schema';

export async function funcaoCriarCategorias({
	formCategorias,
	executor,
	idProdutos,
}: {
	executor: typeExecutor;
	formCategorias: typeSchemaOutput['formCategorias'];
	idProdutos: string;
}) {
	// APAGA TODAS AS CATEGORIAS DO PRODUTO
	await executor
		.delete(tabelaCategoriasProdutos)
		.where(eq(tabelaCategoriasProdutos.keyProdutos, idProdutos));

	// VERIFICA SE TEM CATEGORIAS A SEREM INSERIDAS
	if (formCategorias.length === 0) {
		return;
	}

	const insercao = formCategorias.map((corrente) => {
		return {
			keyProdutos: idProdutos,
			keyCategorias: corrente,
		};
	});

	// INSERE NOVAS
	await executor.insert(tabelaCategoriasProdutos).values(insercao);
}
