import { funcaoGerarSku } from '$lib/funcoes/funcaoGerarSku';
import { tabelaVariantes } from '$lib/server/db/schema';
import type { typeExecutor } from '$lib/server/db/typeExecutor';
import type { typeSchemaOutput } from '../schema';

export async function funcaoCriarVariantes({
	dados,
	executor,
	keyProdutos,
}: {
	executor: typeExecutor;
	dados: typeSchemaOutput['formVariantes'];
	keyProdutos: string;
}) {
	await Promise.all(
		dados.map(async (corrente) => {
			if (corrente.idVariantes === undefined) {
				const campoSku = funcaoGerarSku();
				const variante = { ...corrente, keyProdutos, campoSku };
				await executor.insert(tabelaVariantes).values(variante);
			}
		}),
	);
}
