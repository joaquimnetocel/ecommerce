// import { funcaoEncontrarItem } from './actions/funcaoEncontrarItem';
// import { funcaoRemoverItem } from './actions/funcaoRemoverItem';

// export function funcaoDefinirQuantidade({
// 	idVariantes,
// 	novaQuantidade,
// }: {
// 	idVariantes: string;
// 	novaQuantidade: number;
// }) {
// 	const item = funcaoEncontrarItem({ idVariantes });
// 	if (!item) return;
// 	if (novaQuantidade <= 0) {
// 		funcaoRemoverItem({ idVariantes });
// 		return;
// 	}
// 	if (novaQuantidade > item.tabelaVariantes.campoEstoque) {
// 		item.quantidade = item.tabelaVariantes.campoEstoque;
// 		return;
// 	}
// 	item.quantidade = novaQuantidade;
// }
