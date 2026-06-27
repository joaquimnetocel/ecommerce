import Swal from 'sweetalert2';
import * as v from 'valibot';
import { funcaoEncontrarItem } from './actions/funcaoEncontrarItem';
import { type tipoSchemaCarrinhoInput } from './schemaCarrinho/schemaCarrinho';
import { schemaItem } from './schemaCarrinho/schemaItem';
import { storeCarrinho } from './storeCarrinho.svelte';

export async function funcaoAdicionarItem({
	item,
	quantidade = 1,
}: {
	item: Omit<tipoSchemaCarrinhoInput['itens'][number], 'quantidade'>;
	quantidade?: number;
}) {
	const validacao = v.safeParse(schemaItem, {
		...item,
		quantidade,
	});
	if (validacao.success === false) {
		await Swal.fire({
			icon: 'error',
			title: 'ERRO AO ADICIONAR NO CARRINHO',
			text: 'Os dados do produto não passaram na validação.',
		});
		return;
	}
	const itemValidado = validacao.output;

	if (itemValidado.tabelaVariantes.campoEstoque <= 0) {
		await Swal.fire({
			icon: 'error',
			title: 'PRODUTO INDISPONÍVEL',
			text: 'Este produto está sem estoque.',
		});
		return;
	}
	const existente = funcaoEncontrarItem({ idVariantes: itemValidado.tabelaVariantes.idVariantes });
	if (existente !== undefined) {
		existente.tabelaVariantes.campoEstoque = itemValidado.tabelaVariantes.campoEstoque;
		const novaQuantidade = existente.quantidade + itemValidado.quantidade;
		if (novaQuantidade > itemValidado.tabelaVariantes.campoEstoque) {
			existente.quantidade = itemValidado.tabelaVariantes.campoEstoque;
			await Swal.fire({
				icon: 'info',
				title: 'Quantidade ajustada',
				text: `A quantidade máxima disponível é ${itemValidado.tabelaVariantes.campoEstoque}.`,
			});
			return;
		}
		existente.quantidade = novaQuantidade;
		return;
	}

	storeCarrinho.itens.push({
		...itemValidado,
		quantidade: Math.min(itemValidado.quantidade, itemValidado.tabelaVariantes.campoEstoque),
	});
}
