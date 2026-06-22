import { deriveds } from '../deriveds.svelte';
import { recursivaColetarIdsDosFilhos } from '../funcoes/recursivaColetarIdsDosFilhos';
import { recursivaAtualizarPais } from './recursivaAtualizarPais';
import { store } from './store.svelte';

export function funcaoCheckbox(id: string) {
	const galho = deriveds.mapa().get(id);
	if (!galho) return;
	const marcado = store.selecionadas.has(id);
	if (marcado) {
		store.selecionadas.delete(id);
		for (const d of recursivaColetarIdsDosFilhos(galho)) {
			store.selecionadas.delete(d);
		}
	} else {
		store.selecionadas.add(id);
	}
	recursivaAtualizarPais(galho);
}
