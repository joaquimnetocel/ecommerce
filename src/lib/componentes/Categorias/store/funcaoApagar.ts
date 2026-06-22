import { SvelteSet } from 'svelte/reactivity';
import { recursivaColetarIdsDosFilhos } from '../funcoes/recursivaColetarIdsDosFilhos';
import { remotaApagar } from '../funcoes/remotaApagar.remote';
import type { tipoGalho } from '../tipoGalho';
import { store } from './store.svelte';

export async function funcaoApagar(galho: tipoGalho) {
	await remotaApagar({
		idCategorias: galho.idCategorias,
		campoNome: galho.campoNome,
		keyCategoriasPai: galho.keyCategoriasPai,
	});
	const idsParaRemover = recursivaColetarIdsDosFilhos(galho);
	store.categorias = store.categorias.filter((aux) => !idsParaRemover.includes(aux.idCategorias));

	const novo = new SvelteSet(store.selecionadas); // CRIADO PARA NÃO GERAR MULTIPLAS MUTAÇÕES NO store.selecionadas
	for (const id of recursivaColetarIdsDosFilhos(galho)) {
		novo.delete(id);
	}
	store.selecionadas = novo;
}
