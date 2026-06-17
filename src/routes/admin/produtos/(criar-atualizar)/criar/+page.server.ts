import type { PageServerLoad } from './$types';
import { funcaoCriarInputs } from './funcaoCriarInputs.server';

export const load: PageServerLoad = async () => {
	const inputs = funcaoCriarInputs();
	return {
		lido: undefined,
		inputs,
		erros: {},
	};
};
