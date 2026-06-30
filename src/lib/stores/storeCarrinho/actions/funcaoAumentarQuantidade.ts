import Swal from 'sweetalert2';
import { funcaoEncontrarItem } from './funcaoEncontrarItem';

export function funcaoAumentarQuantidade({ idVariantes }: { idVariantes: string }) {
	const proxyItem = funcaoEncontrarItem({ idVariantes });
	if (proxyItem === undefined) {
		Swal.fire({
			icon: 'error',
			title: 'ERRO',
			text: `Tentando aumentar a quantidade de um item, mas o item não foi encontrado no carrinho.`,
		});
		return;
	}
	if (proxyItem.quantidade >= proxyItem.tabelaVariantes.campoEstoque) {
		Swal.fire({
			icon: 'warning',
			title: 'QUANTIDADE LIMITADA AO ESTOQUE',
			text: `Não é possível adicionar ${proxyItem.quantidade + 1} unidades ao carrinho, pois só há ${proxyItem.tabelaVariantes.campoEstoque} unidades no estoque.`,
		});
		return;
	}
	proxyItem.quantidade += 1;
}
