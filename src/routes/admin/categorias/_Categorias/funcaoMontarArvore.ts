import type { typeGalho } from './typeGalho';
import type { typeLido } from './typeLido';

export function funcaoMontarArvore(categorias: typeLido): typeGalho[] {
	const mapa = new Map<string, typeGalho>();

	for (const categoria of categorias) {
		mapa.set(categoria.idCategorias, {
			...categoria,
			filhas: [],
		});
	}

	const raizes: typeGalho[] = [];

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
