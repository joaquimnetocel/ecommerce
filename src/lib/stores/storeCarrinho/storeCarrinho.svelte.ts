import * as v from 'valibot';
import { schemaCarrinho, type tipoSchemaCarrinhoOutput } from './schemaCarrinho/schemaCarrinho';

export const storeCarrinho = $state<tipoSchemaCarrinhoOutput>({
	itens: [],
	cupom: null,
});

const CHAVE_NA_LOCALSTORAGE = 'CARRINHO';

if (typeof localStorage !== 'undefined') {
	const carrinhoNaLocalstorage = localStorage.getItem(CHAVE_NA_LOCALSTORAGE);
	if (carrinhoNaLocalstorage) {
		try {
			const json = JSON.parse(carrinhoNaLocalstorage);
			const validacao = v.safeParse(schemaCarrinho, json);
			if (validacao.success) {
				storeCarrinho.itens = validacao.output.itens;
				storeCarrinho.cupom = validacao.output.cupom;
			} else {
				storeCarrinho.itens = [];
				storeCarrinho.cupom = null;
			}
		} catch {
			storeCarrinho.itens = [];
			storeCarrinho.cupom = null;
		}
	}
}

$effect.root(() => {
	$effect(() => {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(CHAVE_NA_LOCALSTORAGE, JSON.stringify($state.snapshot(storeCarrinho)));
		}
	});
});
