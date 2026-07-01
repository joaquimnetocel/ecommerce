import { tabelaVariantes } from '$lib/server/db/schema';
import type { typeExecutor } from '$lib/server/db/typeExecutor';
import { eq } from 'drizzle-orm';
import type { typeSchemaOutput } from '../../schema';

export async function funcaoAtualizarVariantes({
	executor,
	formVariantes,
}: {
	executor: typeExecutor;
	formVariantes: typeSchemaOutput['formVariantes'];
}) {
	await Promise.all(
		formVariantes.map(async (corrente) => {
			const { idVariantes, ...atualizacao } = corrente;
			if (idVariantes !== undefined) {
				await executor
					.update(tabelaVariantes)
					.set(atualizacao)
					.where(eq(tabelaVariantes.idVariantes, idVariantes));
			}
		}),
	);
}
