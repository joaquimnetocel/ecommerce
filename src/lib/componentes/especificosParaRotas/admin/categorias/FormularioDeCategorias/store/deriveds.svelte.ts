import { SvelteMap } from 'svelte/reactivity';
import type { tipoGalho } from '../tipos/tipoGalho';
import { funcaoMontarArvore } from './funcoes/funcaoMontarArvore';
import { recursivaPesquisar } from './funcoes/recursivaPesquivar';
import { store } from './index.svelte';

const arvore = $derived(funcaoMontarArvore(store.categorias));
const mapa = $derived.by(() => {
	const resultado = new SvelteMap<string, tipoGalho>();

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
	if (store.pesquisa) {
		return arvore
			.map((aux) => recursivaPesquisar(aux, store.pesquisa))
			.filter((aux): aux is tipoGalho => aux !== null);
	}
	return arvore;
});

export const derivedArvore = () => arvore;
export const derivedArvoreFiltrada = () => arvoreFiltrada;
export const derivedMapa = () => mapa;
