import type { typeCategorias } from './typeCategorias';
import type { typeGalho } from './typeGalho';

export function funcaoMontarArvore(categorias: typeCategorias): typeGalho[] {
	const mapa = new Map<string, typeGalho>();
	for (const categoria of categorias) {
		mapa.set(categoria.idCategorias, {
			...categoria,
			filhos: [],
		});
	}
	const arvore: typeGalho[] = [];
	for (const categoria of mapa.values()) {
		if (!categoria.keyCategoriasPai) {
			arvore.push(categoria);
			continue;
		}
		const pai = mapa.get(categoria.keyCategoriasPai);
		if (pai) {
			pai.filhos.push(categoria);
		}
	}
	return arvore;
}
