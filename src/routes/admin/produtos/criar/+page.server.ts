import { funcaoLerCategorias } from '../_Formulario/funcoes/funcaoLerCategorias.server';
import type { PageServerLoad } from './$types';
import { funcaoCriarInputs } from './funcaoCriarInputs.server';

export const load: PageServerLoad = async () => {
	const inputs = funcaoCriarInputs();
	const categorias = await funcaoLerCategorias();
	return {
		categorias,
		lido: undefined,
		inputs,
		erros: {},
	};
};
