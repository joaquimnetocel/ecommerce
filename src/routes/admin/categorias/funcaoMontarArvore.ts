import type { typeCategoriaArvore } from './typeCategoriaArvore';
import type { typeCategorias } from './typeCategorias';

export function funcaoMontarArvore(categorias: typeCategorias[]): typeCategoriaArvore[] {
	const mapa = new Map<string, typeCategoriaArvore>();

	for (const categoria of categorias) {
		mapa.set(categoria.idCategorias, {
			...categoria,
			filhas: [],
		});
	}

	const raizes: typeCategoriaArvore[] = [];

	for (const categoria of mapa.values()) {
		if (!categoria.keyCategoriasPai) {
			raizes.push(categoria);
			continue;
		}

		const pai = mapa.get(categoria.keyCategoriasPai);

		if (pai) {
			pai.filhas.push(categoria);
		}
	}

	return raizes;
}
