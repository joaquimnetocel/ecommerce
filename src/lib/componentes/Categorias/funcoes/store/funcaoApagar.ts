import { store } from '../../store.svelte';
import type { tipoGalho } from '../../tipoGalho';
import { recursivaColetarIdsDosFilhos } from '../independentes/recursivaColetarIdsDosFilhos';
import { remotaApagar } from '../remotas/remotaApagar.remote';

export async function funcaoApagar(galho: tipoGalho) {
	const apagado = await remotaApagar({
		idCategorias: galho.idCategorias,
		campoNome: galho.campoNome,
		keyCategoriasPai: galho.keyCategoriasPai,
	});
	store.categorias = store.categorias.filter((aux) => aux.idCategorias !== apagado.idCategorias);
	for (const id of recursivaColetarIdsDosFilhos(galho)) {
		store.selecionadas.delete(id);
	}
}
