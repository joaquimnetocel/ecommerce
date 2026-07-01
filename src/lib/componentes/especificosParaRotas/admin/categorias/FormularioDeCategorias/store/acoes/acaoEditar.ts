import type { tipoGalho } from '../../tipos/tipoGalho';
import { remotaEditar } from '../funcoes/remotaEditar.remote';
import { store } from '../index.svelte';

export async function acaoEditar(galho: tipoGalho, novoNome: string) {
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
