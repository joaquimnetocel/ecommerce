import { storeCarrinho } from '../storeCarrinho.svelte';

export function funcaoEncontrarItem({ idVariantes }: { idVariantes: string }) {
	return storeCarrinho.itens.find((item) => item.tabelaVariantes.idVariantes === idVariantes);
}
