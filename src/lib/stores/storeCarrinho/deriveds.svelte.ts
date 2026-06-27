import { storeCarrinho } from './storeCarrinho.svelte';

const precoTotalSemDesconto = $derived(
	storeCarrinho.itens.reduce((total, item) => {
		return total + item.tabelaVariantes.campoPreco * item.quantidade;
	}, 0),
);
const precoTotal = $derived.by(() => {
	if (storeCarrinho.cupom === null || precoTotalSemDesconto < storeCarrinho.cupom.minimo) {
		return precoTotalSemDesconto;
	}
	if (storeCarrinho.cupom.tipo === 'percentual') {
		return precoTotalSemDesconto * (1 - storeCarrinho.cupom.valor / 100);
	}
	return Math.max(precoTotalSemDesconto - storeCarrinho.cupom.valor, 0);
});
const quantidadeTotalNocarrinho = $derived(
	storeCarrinho.itens.reduce((total, corrente) => {
		return total + corrente.quantidade;
	}, 0),
);

export const deriveds = {
	precoTotalSemDesconto: () => precoTotalSemDesconto,
	precoTotal: () => precoTotal,
	quantidadeTotalNocarrinho: () => quantidadeTotalNocarrinho,
};
