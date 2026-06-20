import type { typeCategoriaArvore } from './typeGalho';

export function funcaoPegarTodosDescendentes(no: typeCategoriaArvore): string[] {
	const ids: string[] = [];

	for (const filho of no.filhas) {
		ids.push(filho.idCategorias);
		ids.push(...funcaoPegarTodosDescendentes(filho));
	}

	return ids;
}
