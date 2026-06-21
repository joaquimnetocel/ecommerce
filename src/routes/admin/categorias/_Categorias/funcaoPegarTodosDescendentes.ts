import type { typeGalho } from './typeGalho';

export function funcaoPegarTodosDescendentes(no: typeGalho): string[] {
	const ids: string[] = [];

	for (const filho of no.filhas) {
		ids.push(filho.idCategorias);
		ids.push(...funcaoPegarTodosDescendentes(filho));
	}

	return ids;
}
