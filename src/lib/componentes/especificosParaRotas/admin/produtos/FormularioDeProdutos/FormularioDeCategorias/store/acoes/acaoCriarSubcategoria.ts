import { remotaCriar } from '../funcoes/remotaCriar.remote';
import { store } from '../index.svelte';

export async function acaoCriarSubcategoria(idPai: string) {
	const nome = store.inputs[idPai]?.trim();
	if (!nome) return;
	const inserido = await remotaCriar({
		campoNome: nome,
		keyCategoriasPai: idPai,
		idCategorias: undefined,
	});
	store.categorias = [inserido, ...store.categorias];
	store.criandoEm = null;
	delete store.inputs[idPai];
}
