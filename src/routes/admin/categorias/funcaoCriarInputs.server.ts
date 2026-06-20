import type { typeSchemaInput } from './schema';
import type { typeLido } from './typeLido';

export function funcaoCriarInputs(lido: typeLido): typeSchemaInput[] {
	return lido.map((corrente) => {
		return {
			campoNome: corrente.campoNome,
			identificador: corrente.idCategorias,
			keyCategoriasPai: corrente.keyCategoriasPai,
			idCategorias: corrente.idCategorias,
		};
	});
}
