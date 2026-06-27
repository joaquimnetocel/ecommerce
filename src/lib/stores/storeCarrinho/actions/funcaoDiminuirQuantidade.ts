import { funcaoEncontrarItem } from './funcaoEncontrarItem';
import { funcaoRemoverItem } from './funcaoRemoverItem';

export function funcaoDiminuirQuantidade({ idVariantes }: { idVariantes: string }) {
	const item = funcaoEncontrarItem({ idVariantes });
	if (!item) return;
	if (item.quantidade <= 1) {
		funcaoRemoverItem({ idVariantes });
		return;
	}
	item.quantidade -= 1;
}
