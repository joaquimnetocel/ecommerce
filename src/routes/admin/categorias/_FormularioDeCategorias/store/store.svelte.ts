import type { tipoCategorias } from '../tipoCategorias';

export const store = $state({
	categorias: [] as tipoCategorias,
	pesquisa: '',
	criandoEm: null as string | null,
	inputs: {} as Record<string, string>,
	apenasMarcadas: false,
});
