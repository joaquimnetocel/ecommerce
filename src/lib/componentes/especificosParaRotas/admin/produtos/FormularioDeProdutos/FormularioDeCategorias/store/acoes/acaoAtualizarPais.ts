import type { tipoGalho } from '../../tipos/tipoGalho';
import { derivedMapa } from '../deriveds.svelte';
import { store } from '../index.svelte';

export function acaoAtualizarPais(galho: tipoGalho) {
	if (!galho.keyCategoriasPai) return;
	const pai = derivedMapa().get(galho.keyCategoriasPai);
	if (!pai) return;
	const algum = pai.filhos.some((aux) => store.selecionadas.has(aux.idCategorias));
	if (algum) {
		store.selecionadas.add(pai.idCategorias);
	} else {
		store.selecionadas.delete(pai.idCategorias);
	}
	acaoAtualizarPais(pai);
}
