// import { deriveds } from '../deriveds.svelte';
// import type { tipoGalho } from '../tipoGalho';
// import { store } from './store.svelte';

// export function recursivaAtualizarPais(galho: tipoGalho) {
// 	if (!galho.keyCategoriasPai) return;
// 	const pai = deriveds.mapa().get(galho.keyCategoriasPai);
// 	if (!pai) return;
// 	const algum = pai.filhos.some((aux) => store.selecionadas.has(aux.idCategorias));
// 	if (algum) {
// 		store.selecionadas.add(pai.idCategorias);
// 	} else {
// 		store.selecionadas.delete(pai.idCategorias);
// 	}
// 	recursivaAtualizarPais(pai);
// }
