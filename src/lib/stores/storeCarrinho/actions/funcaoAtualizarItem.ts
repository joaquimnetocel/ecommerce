import Swal from 'sweetalert2';
import * as v from 'valibot';
import { schemaItem } from '../schemaCarrinho/schemaItem';
import { funcaoEncontrarItem } from './funcaoEncontrarItem';
import { funcaoRemoverItem } from './funcaoRemoverItem';

const schemaAtualizacaoItem = v.omit(schemaItem, ['quantidade']);
type tipoSchemaAtualizacaoItemInput = v.InferInput<typeof schemaAtualizacaoItem>;

export function funcaoAtualizarItem({ item }: { item: tipoSchemaAtualizacaoItemInput }) {
	const validacao = v.safeParse(schemaAtualizacaoItem, item);
	if (validacao.success === false) {
		Swal.fire({
			icon: 'error',
			title: 'ERRO AO TENTAR ATUALIZAR O CARRINHO',
			text: 'Os dados do produto não passaram na validação.',
		});
		return;
	}
	const itemValidado = validacao.output;

	const proxyItem = funcaoEncontrarItem({ idVariantes: itemValidado.tabelaVariantes.idVariantes });
	if (proxyItem === undefined) {
		Swal.fire({
			icon: 'error',
			title: 'ERRO',
			text: 'Tentando atualizar um item que não está no carrinho.',
		});
		return;
	}

	if (itemValidado.tabelaVariantes.campoEstoque <= 0) {
		Swal.fire({
			icon: 'warning',
			title: 'PRODUTO INDISPONÍVEL',
			text: `O produto ${itemValidado.tabelaProdutos.campoNome} será removido do carrinho pois está fora de estoque.`,
		});
		funcaoRemoverItem({
			idVariantes: itemValidado.tabelaVariantes.idVariantes,
		});
		return;
	}

	proxyItem.tabelaVariantes = itemValidado.tabelaVariantes;
	proxyItem.tabelaProdutos = itemValidado.tabelaProdutos;
	proxyItem.imagem = itemValidado.imagem;
	if (proxyItem.quantidade > itemValidado.tabelaVariantes.campoEstoque) {
		proxyItem.quantidade = itemValidado.tabelaVariantes.campoEstoque;
		Swal.fire({
			icon: 'info',
			title: 'QUANTIDADE AJUSTADA',
			text: `A quantidade do item ${proxyItem.tabelaProdutos.campoNome} no carrinho foi ajustada para a quantidade máxima em estoque disponível, que é ${itemValidado.tabelaVariantes.campoEstoque}.`,
		});
	}
	return;
}
