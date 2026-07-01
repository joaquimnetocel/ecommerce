import { derivedMapa } from '../deriveds.svelte';
import { recursivaColetarIdsDosFilhos } from '../funcoes/recursivaColetarIdsDosFilhos';
import { store } from '../index.svelte';
import { acaoAtualizarPais } from './acaoAtualizarPais';

export function acaoCheckbox(id: string) {
	const galho = derivedMapa().get(id);
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
	acaoAtualizarPais(galho);
}
