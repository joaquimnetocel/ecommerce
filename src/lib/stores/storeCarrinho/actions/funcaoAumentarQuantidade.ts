import { funcaoEncontrarItem } from './funcaoEncontrarItem';

export function funcaoAumentarQuantidade({ idVariantes }: { idVariantes: string }) {
	const item = funcaoEncontrarItem({ idVariantes });
	if (!item) return;
	if (item.quantidade >= item.tabelaVariantes.campoEstoque) {
		return;
	}
	item.quantidade += 1;
}
