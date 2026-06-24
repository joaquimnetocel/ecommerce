import { remotaEditar } from '../funcoes/remotaEditar.remote';
import type { tipoGalho } from '../tipoGalho';
import { store } from './store.svelte';

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
