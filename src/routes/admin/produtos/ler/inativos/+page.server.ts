import { funcaoLer } from '../funcaoLer.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const lido = await funcaoLer({
		campoAtivo: false,
	});
	return { lido };
};
