import { funcaoGerarSku } from '$lib/funcoes/funcaoGerarSku';
import { tabelaVariantes } from '$lib/server/db/schema';
import type { typeExecutor } from '$lib/server/db/typeExecutor';
import type { typeSchemaOutput } from '../../schema';

export async function funcaoCriarVariantes({
	executor,
	formVariantes,
	keyProdutos,
}: {
	executor: typeExecutor;
	formVariantes: typeSchemaOutput['formVariantes'];
	keyProdutos: string;
}) {
	await Promise.all(
		formVariantes.map(async (corrente) => {
			if (corrente.idVariantes === undefined) {
				const campoSku = funcaoGerarSku();
				const insercao = { ...corrente, keyProdutos, campoSku };
				await executor.insert(tabelaVariantes).values(insercao);
			}
		}),
	);
}
