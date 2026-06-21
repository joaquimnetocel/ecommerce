import { deriveds } from '../../deriveds.svelte';
import { store } from '../../store.svelte';
import { recursivaPegarTodosDescendentes } from '../independentes/recursivaPegarTodosDescendentes';
import { recursivaAtualizarPais } from './recursivaAtualizarPais';

export function funcaoCheckbox(id: string) {
	const galho = deriveds.mapa().get(id);
	if (!galho) return;
	const marcado = store.selecionadas.has(id);
	if (marcado) {
		store.selecionadas.delete(id);
		for (const d of recursivaPegarTodosDescendentes(galho)) {
			store.selecionadas.delete(d);
		}
	} else {
		store.selecionadas.add(id);
	}
	recursivaAtualizarPais(galho);
}
