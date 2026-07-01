import { funcaoConfiguracoes } from '$lib/configuracoes/funcaoConfiguracoes';

type typeConfiguracoes = ReturnType<typeof funcaoConfiguracoes>;
type typeMobileMenuItem = typeConfiguracoes['mobileMenu'][number];

export function funcaoEstados() {
	const estados = $state({
		exibirSubcategoria: [false, false, false, false, false, false, false, false, false, false],
		exibirSubcategoria2: [false, false, false, false, false, false, false, false, false, false],
		menuSelecionado: '',
		menuSelecionado2: '',
		funcaoToggleMenu(m: typeMobileMenuItem, mx: number) {
			estados.menuSelecionado = m.name;
			if (m.children?.length > 0) {
				if (estados.exibirSubcategoria[mx] === true) {
					estados.menuSelecionado = '';
					estados.exibirSubcategoria[mx] = false;
				} else {
					estados.exibirSubcategoria[mx] = true;
				}
			}
		},
		funcaoToggleMenu2(c: typeMobileMenuItem, cx: number) {
			estados.menuSelecionado2 = c.name;
			if (c.children?.length > 0) {
				if (estados.exibirSubcategoria2[cx] === true) {
					estados.menuSelecionado2 = '';
					estados.exibirSubcategoria2[cx] = false;
				} else {
					estados.exibirSubcategoria2[cx] = true;
				}
			}
		},
	});

	return estados;
}
