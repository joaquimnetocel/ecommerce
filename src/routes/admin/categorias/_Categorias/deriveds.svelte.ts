import { funcaoMontarArvore } from './funcoes/independentes/funcaoMontarArvore';
import { recursivaPesquisar } from './funcoes/independentes/recursivaPesquivar';
import { store } from './store.svelte';
import type { tipoGalho } from './tipoGalho';

export const deriveds = (() => {
	const arvore = $derived(funcaoMontarArvore(store.categorias));
	const mapa = $derived.by(() => {
		const resultado = new Map<string, tipoGalho>();

		function funcaoMapear(galho: tipoGalho) {
			resultado.set(galho.idCategorias, galho);

			for (const filho of galho.filhos) {
				funcaoMapear(filho);
			}
		}
		for (const galho of arvore) {
			funcaoMapear(galho);
		}
		return resultado;
	});
	const arvoreFiltrada = $derived.by(() => {
		const a = deriveds.arvore();

		if (!store.pesquisa) return a;

		return a
			.map((aux) => recursivaPesquisar(aux, store.pesquisa))
			.filter((aux): aux is tipoGalho => aux !== null);
	});
	return {
		arvore: () => arvore,
		arvoreFiltrada: () => arvoreFiltrada,
		mapa: () => mapa,
	};
})();
