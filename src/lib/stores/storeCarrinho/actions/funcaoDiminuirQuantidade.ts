import Swal from 'sweetalert2';
import { funcaoEncontrarItem } from './funcaoEncontrarItem';

export function funcaoDiminuirQuantidade({ idVariantes }: { idVariantes: string }) {
	const proxyItem = funcaoEncontrarItem({ idVariantes });
	if (proxyItem === undefined) {
		Swal.fire({
			icon: 'error',
			title: 'ERRO',
			text: `Tentando diminuir a quantidade de um item, mas o item não foi encontrado no carrinho.`,
		});
		return;
	}
	if (proxyItem.quantidade < 0) {
		Swal.fire({
			icon: 'error',
			title: 'ERRO',
			text: `Tentando atribuir quantidade negativa ao carrinho.`,
		});
		return;
	}
	if (proxyItem.quantidade === 1) {
		Swal.fire({
			icon: 'error',
			title: 'ERRO',
			text: `Tentando reduzir uma quantidade no carrinho para zero.`,
		});
		return;
	}
	proxyItem.quantidade -= 1;
}
