import { store } from '../../store.svelte';
import { remotaCriarCategoria } from '../remotas/remotaCriarCategoria.remote';

export async function funcaoCriarSubcategoria(idPai: string) {
	const nome = store.inputs[idPai]?.trim();
	if (!nome) return;
	const inserido = await remotaCriarCategoria({
		campoNome: nome,
		keyCategoriasPai: idPai,
		idCategorias: undefined,
	});
	store.categorias = [inserido, ...store.categorias];
	store.criandoEm = null;
	delete store.inputs[idPai];
}
