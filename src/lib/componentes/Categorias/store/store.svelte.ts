import { SvelteSet } from 'svelte/reactivity';
import type { tipoCategorias } from '../tipoCategorias';

export const store = $state({
	categorias: [] as tipoCategorias,
	pesquisa: '',
	criandoEm: null as string | null,
	inputs: {} as Record<string, string>,
	selecionadas: new SvelteSet<string>(),
	apenasMarcadas: false,
});
