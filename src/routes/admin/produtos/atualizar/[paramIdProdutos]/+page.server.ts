import { funcaoLer } from '$lib/componentes/especificosParaRotas/admin/produtos/FormularioDeProdutos/funcoes/funcaoLer.server';
import { funcaoLerCategorias } from '$lib/componentes/especificosParaRotas/admin/produtos/FormularioDeProdutos/funcoes/funcaoLerCategorias.server';
import type { PageServerLoad } from './$types';
import { funcaoCriarInputs } from './funcaoCriarInputs.server';

export const load: PageServerLoad = async ({ params }) => {
	const lido = await funcaoLer(params.paramIdProdutos);
	const categorias = await funcaoLerCategorias();
	const inputs = funcaoCriarInputs(lido);
	return {
		categorias,
		lido,
		inputs,
		erros: {},
	};
};
