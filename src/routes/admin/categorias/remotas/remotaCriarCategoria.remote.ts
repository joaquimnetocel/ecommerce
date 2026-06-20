import { command } from '$app/server';
import { funcaoGerarSlug } from '$lib/funcoes/funcaoGerarSlug';
import { db } from '$lib/server/db';
import { tabelaCategorias } from '$lib/server/db/schema';
import { schema, type typeSchemaInput } from '../schema';

export const remotaCriarCategoria = command(schema, async (dados) => {
	const insercao = {
		...dados,
		campoSlug: funcaoGerarSlug(dados.campoNome),
	};
	const [inserido] = await db.insert(tabelaCategorias).values(insercao).returning();
	// const retorno: typeSchemaInput = {
	// 	...inserido,
	// 	identificador: inserido.idCategorias,
	// };
	return inserido;
});
