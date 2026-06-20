import type { PageServerLoad } from './$types';
import { funcaoCriarInputs } from './funcaoCriarInputs.server';
import { funcaoLer } from './funcaoLer';

export const load: PageServerLoad = async (event) => {
	const lido = await funcaoLer();
	const inputs = funcaoCriarInputs(lido);
	return { inputs };
};
