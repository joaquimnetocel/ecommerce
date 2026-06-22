import { funcaoLer } from '../../_Formulario/funcaoLer.server';
import { funcaoLerCategorias } from '../../_Formulario/funcaoLerCategorias.server';
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
