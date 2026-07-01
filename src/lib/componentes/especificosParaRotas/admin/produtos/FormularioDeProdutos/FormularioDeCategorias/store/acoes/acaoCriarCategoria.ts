import { remotaCriar } from '../funcoes/remotaCriar.remote';
import { sweetalertCriar } from '../funcoes/sweetalertCriar';
import { store } from '../index.svelte';

export async function acaoCriarCategoria() {
	const digitado = await sweetalertCriar();
	if (!digitado) return;
	const inserido = await remotaCriar({
		campoNome: digitado,
		keyCategoriasPai: null,
		idCategorias: undefined,
	});
	store.categorias = [inserido, ...store.categorias];
	store.selecionadas.add(inserido.idCategorias);
}
