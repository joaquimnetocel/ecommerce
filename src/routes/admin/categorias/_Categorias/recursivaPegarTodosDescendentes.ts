import type { typeGalho } from './typeGalho';

export function recursivaPegarTodosDescendentes(galho: typeGalho): string[] {
	const ids: string[] = [];

	for (const filha of galho.filhos) {
		ids.push(filha.idCategorias);
		ids.push(...recursivaPegarTodosDescendentes(filha));
	}

	return ids;
}
