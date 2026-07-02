import { tabelaVariantes } from '$lib/server/db/schema';
import type { typeExecutor } from '$lib/server/db/typeExecutor';
import { error } from '@sveltejs/kit';
import { and, eq, inArray } from 'drizzle-orm';
import type { typeSchemaOutput } from '../../schema';

export async function funcaoAtualizarVariantes({
	executor,
	keyProdutos,
	formVariantes,
}: {
	executor: typeExecutor;
	keyProdutos: string | undefined;
	formVariantes: typeSchemaOutput['formVariantes'];
}) {
	if (keyProdutos === undefined) {
		error(400, 'O ID DO PRODUTO É OBRIGATÓRIO PARA ATUALIZAR VARIANTES DO PRODUTO.');
	}

	// BUSCA AS VARIANTES EXISTENTES DO PRODUTO
	const variantesBanco = await executor.query.tabelaVariantes.findMany({
		where: eq(tabelaVariantes.keyProdutos, keyProdutos),
		columns: {
			idVariantes: true,
		},
	});

	// IDS DAS VARIANTES RECEBIDAS PELO FORMULÁRIO
	const idsFormulario = new Set(
		formVariantes.map((v) => v.idVariantes).filter((v): v is string => v !== undefined),
	);

	// DESCOBRE QUAIS VARIANTES DEVEM SER REMOVIDAS
	const idsRemover = variantesBanco
		.filter((v) => idsFormulario.has(v.idVariantes) === false)
		.map((v) => v.idVariantes);

	// REMOVE AS VARIANTES QUE NÃO EXISTEM MAIS NO FORMULÁRIO
	if (idsRemover.length > 0) {
		await executor
			.delete(tabelaVariantes)
			.where(
				and(
					eq(tabelaVariantes.keyProdutos, keyProdutos),
					inArray(tabelaVariantes.idVariantes, idsRemover),
				),
			);
	}

	// ATUALIZA AS VARIANTES EXISTENTES
	await Promise.all(
		formVariantes.map(async (corrente) => {
			const { idVariantes, ...atualizacao } = corrente;

			if (idVariantes === undefined) {
				return;
			}

			await executor
				.update(tabelaVariantes)
				.set(atualizacao)
				.where(
					and(
						eq(tabelaVariantes.idVariantes, idVariantes),
						eq(tabelaVariantes.keyProdutos, keyProdutos),
					),
				);
		}),
	);
}
