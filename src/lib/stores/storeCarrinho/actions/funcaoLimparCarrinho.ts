import { storeCarrinho } from '../storeCarrinho.svelte';

export function funcaoLimparCarrinho() {
	storeCarrinho.itens = [];
	storeCarrinho.cupom = null;
}
