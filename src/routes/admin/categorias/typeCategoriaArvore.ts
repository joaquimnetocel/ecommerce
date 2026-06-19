import type { typeCategorias } from './typeCategorias';

export type typeCategoriaArvore = typeCategorias & {
	filhas: typeCategoriaArvore[];
};
