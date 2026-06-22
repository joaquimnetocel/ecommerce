import { store } from '../../store.svelte';
import type { tipoGalho } from '../../tipoGalho';
import { remotaEditar } from '../remotas/remotaEditar.remote';

export async function funcaoEditar(galho: tipoGalho, novoNome: string) {
	const editado = await remotaEditar({
		idCategorias: galho.idCategorias,
		campoNome: novoNome,
		keyCategoriasPai: galho.keyCategoriasPai,
	});

	store.categorias = store.categorias.map((item) => {
		if (item.idCategorias === editado.idCategorias) {
			return editado;
		}
		return item;
	});
}
