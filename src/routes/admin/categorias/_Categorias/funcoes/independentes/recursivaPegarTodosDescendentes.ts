import type { tipoGalho } from '../../tipoGalho';

export function recursivaPegarTodosDescendentes(galho: tipoGalho): string[] {
	const ids: string[] = [];

	for (const filha of galho.filhos) {
		ids.push(filha.idCategorias);
		ids.push(...recursivaPegarTodosDescendentes(filha));
	}

	return ids;
}
