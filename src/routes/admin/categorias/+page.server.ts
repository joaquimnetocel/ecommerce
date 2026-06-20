import type { PageServerLoad } from './$types';
import { funcaoLer } from './funcaoLer';

export const load: PageServerLoad = async () => {
	const lido = await funcaoLer();
	return { lido };
};
