import { funcaoMontarArvore } from './funcoes/funcaoMontarArvore';
import { recursivaPesquisar } from './funcoes/recursivaPesquivar';
import { store } from './store/store.svelte';
import type { tipoGalho } from './tipoGalho';

// Função auxiliar para filtrar a árvore mantendo apenas as selecionadas
function recursivaFiltrarMarcadas(galho: tipoGalho): tipoGalho | null {
	// Verifica se o próprio galho está selecionado
	const euEstouMarcado = store.selecionadas.has(galho.idCategorias);

	// Filtra os filhos recursivamente
	const filhosMarcados = galho.filhos
		.map((f) => recursivaFiltrarMarcadas(f))
		.filter((v): v is tipoGalho => v !== null);

	// Se eu estou marcado OU se tenho filhos marcados, o galho permanece na árvore
	if (euEstouMarcado || filhosMarcados.length) {
		return { ...galho, filhos: filhosMarcados };
	}
	return null;
}

export const deriveds = (() => {
	const arvore = $derived(funcaoMontarArvore(store.categorias));
	const mapa = $derived.by(() => {
		const resultado = new Map<string, tipoGalho>();

		function funcaoMapear(galho: tipoGalho) {
			resultado.set(galho.idCategorias, galho);

			for (const filho of galho.filhos) {
				funcaoMapear(filho);
			}
		}
		for (const galho of arvore) {
			funcaoMapear(galho);
		}
		return resultado;
	});
	const arvoreFiltrada = $derived.by(() => {
		// REGRA 1: Se houver texto pesquisado, ignore o "apenas marcadas" e filtre por texto
		if (store.pesquisa) {
			return arvore
				.map((aux) => recursivaPesquisar(aux, store.pesquisa))
				.filter((aux): aux is tipoGalho => aux !== null);
		}
		// REGRA 2: Se não houver pesquisa E o switch de "apenas marcadas" estiver ativo
		if (store.apenasMarcadas) {
			return arvore
				.map((aux) => recursivaFiltrarMarcadas(aux))
				.filter((aux): aux is tipoGalho => aux !== null);
		}
		return arvore;
	});
	return {
		arvore: () => arvore,
		arvoreFiltrada: () => arvoreFiltrada,
		mapa: () => mapa,
	};
})();
