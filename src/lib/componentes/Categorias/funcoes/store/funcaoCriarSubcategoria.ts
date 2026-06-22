import { store } from '../../store.svelte';
import { remotaCriar } from '../remotas/remotaCriar.remote';

export async function funcaoCriarSubcategoria(idPai: string) {
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
