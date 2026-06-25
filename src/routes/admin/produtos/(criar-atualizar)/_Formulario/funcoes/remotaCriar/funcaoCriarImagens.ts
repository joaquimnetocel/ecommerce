import { tabelaImagens } from '$lib/server/db/schema';
import type { typeExecutor } from '$lib/server/db/typeExecutor';
import { eq } from 'drizzle-orm';
import type { typeSchemaOutput } from '../../schema';

export async function funcaoCriarImagens({
	formImagens,
	executor,
	keyProdutos,
}: {
	executor: typeExecutor;
	formImagens: typeSchemaOutput['formImagens'];
	keyProdutos: string;
}) {
	// APAGA TODAS AS IMAGENS DO PRODUTO
	await executor.delete(tabelaImagens).where(eq(tabelaImagens.keyProdutos, keyProdutos));

	// VERIFICA SE TEM IMAGENS A SEREM INSERIDAS
	if (formImagens.length === 0) {
		return;
	}

	const insercao = formImagens.map((corrente) => {
		return {
			...corrente,
			keyProdutos,
		};
	});

	await executor.insert(tabelaImagens).values(insercao);
}
