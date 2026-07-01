import type { tipoCategorias } from '../tipos/tipoCategorias';

export const store = $state({
	categorias: [] as tipoCategorias,
	pesquisa: '',
	criandoEm: null as string | null,
	inputs: {} as Record<string, string>,
	apenasMarcadas: false,
});
