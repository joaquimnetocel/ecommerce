import { funcaoLer } from '../../_Formulario/funcaoLer.server';
import type { PageServerLoad } from './$types';
import { funcaoCriarInputs } from './funcaoCriarInputs.server';

export const load: PageServerLoad = async ({ params }) => {
	const lido = await funcaoLer(params.paramIdProdutos);
	const inputs = funcaoCriarInputs(lido);
	return {
		lido,
		inputs,
		erros: {},
	};
};
