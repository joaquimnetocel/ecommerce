import { storeCarrinho } from '../storeCarrinho.svelte';

export function funcaoRemoverItem({ idVariantes }: { idVariantes: string }) {
	storeCarrinho.itens = storeCarrinho.itens.filter(
		(item) => item.tabelaVariantes.idVariantes !== idVariantes,
	);
}
