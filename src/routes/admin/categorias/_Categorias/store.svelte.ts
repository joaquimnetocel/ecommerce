import { SvelteSet } from 'svelte/reactivity';
import { recursivaColetarIdsDosFilhos } from './funcoes/independentes/recursivaColetarIdsDosFilhos';
import { remotaApagar } from './funcoes/remotas/remotaApagar.remote';
import type { tipoCategorias } from './tipoCategorias';
import type { tipoGalho } from './tipoGalho';

export const store = $state({
	categorias: [] as tipoCategorias,
	pesquisa: '',
	criandoEm: null as string | null,
	inputs: {} as Record<string, string>,
	selecionadas: new SvelteSet<string>(),
});
