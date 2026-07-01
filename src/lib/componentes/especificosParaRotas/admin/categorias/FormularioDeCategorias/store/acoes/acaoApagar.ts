import type { tipoGalho } from '../../tipos/tipoGalho';
import { recursivaColetarIdsDosFilhos } from '../funcoes/recursivaColetarIdsDosFilhos';
import { remotaApagar } from '../funcoes/remotaApagar.remote';
import { store } from '../index.svelte';

export async function acaoApagar(galho: tipoGalho) {
	await remotaApagar({
		idCategorias: galho.idCategorias,
		campoNome: galho.campoNome,
		keyCategoriasPai: galho.keyCategoriasPai,
	});
	const idsParaRemover = recursivaColetarIdsDosFilhos(galho);
	store.categorias = store.categorias.filter((aux) => !idsParaRemover.includes(aux.idCategorias));
}
