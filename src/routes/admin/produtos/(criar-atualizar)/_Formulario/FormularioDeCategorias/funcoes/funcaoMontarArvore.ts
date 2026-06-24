import type { tipoCategorias } from '../tipoCategorias';
import type { tipoGalho } from '../tipoGalho';

export function funcaoMontarArvore(categorias: tipoCategorias): tipoGalho[] {
	if (!categorias || !Array.isArray(categorias)) {
		return [];
	}

	const mapa = new Map<string, tipoGalho>();
	for (const categoria of categorias) {
		mapa.set(categoria.idCategorias, {
			...categoria,
			filhos: [],
		});
	}
	const arvore: tipoGalho[] = [];
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
