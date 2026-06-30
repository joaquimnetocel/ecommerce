import Swal from 'sweetalert2';
import * as v from 'valibot';
import { type tipoSchemaCarrinhoInput } from '../schemaCarrinho/schemaCarrinho';
import { schemaItem } from '../schemaCarrinho/schemaItem';
import { storeCarrinho } from '../storeCarrinho.svelte';
import { funcaoEncontrarItem } from './funcaoEncontrarItem';

export function funcaoAdicionarItem({
	novoItem,
}: {
	novoItem: tipoSchemaCarrinhoInput['itens'][number];
}) {
	const validacao = v.safeParse(schemaItem, novoItem);
	if (validacao.success === false) {
		Swal.fire({
			icon: 'error',
			title: 'ERRO AO ADICIONAR NO CARRINHO',
			text: 'Os dados do item que está tentando adicionar ao carrinho não passaram na validação.',
		});
		return;
	}
	const itemValidado = validacao.output;

	if (itemValidado.tabelaVariantes.campoEstoque <= 0) {
		Swal.fire({
			icon: 'error',
			title: 'PRODUTO INDISPONÍVEL',
			text: 'Você está tentando adicionar um produto com estoque zerado.',
		});
		return;
	}
	const proxyItem = funcaoEncontrarItem({ idVariantes: itemValidado.tabelaVariantes.idVariantes });
	console.log(proxyItem);
	if (proxyItem !== undefined) {
		proxyItem.tabelaVariantes = itemValidado.tabelaVariantes;
		proxyItem.tabelaProdutos = itemValidado.tabelaProdutos;
		proxyItem.imagem = itemValidado.imagem;
		const novaQuantidade = proxyItem.quantidade + itemValidado.quantidade;
		if (novaQuantidade > itemValidado.tabelaVariantes.campoEstoque) {
			proxyItem.quantidade = itemValidado.tabelaVariantes.campoEstoque;
			Swal.fire({
				icon: 'info',
				title: 'Quantidade ajustada',
				text: `Não é possível adicionar mais do que ${itemValidado.tabelaVariantes.campoEstoque} unidades desse item ao carrinho, pois essa é a quantidade de itens em estoque.`,
			});
			return;
		}
		proxyItem.quantidade = novaQuantidade;
		return;
	}

	storeCarrinho.itens.push({
		...itemValidado,
		quantidade: Math.min(itemValidado.quantidade, itemValidado.tabelaVariantes.campoEstoque),
	});
}
