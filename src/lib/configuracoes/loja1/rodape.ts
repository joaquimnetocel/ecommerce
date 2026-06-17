import type { Pathname } from '$app/types';

type typeRodape = {
	name: string;
	items: {
		name: string;
		link?: Pathname;
	}[];
};

export const rodape: typeRodape[] = [
	{
		name: 'EMPRESA',
		items: [
			{
				name: 'SOBRE NÓS',
				link: '/',
			},
			{
				name: 'CARREIRAS',
				link: '/',
			},
		],
	},
	{
		name: 'INFORMAÇÕES',
		items: [
			{
				name: 'Versão 1.0.0',
			},
			{
				name: 'Todos os direitos reservados',
			},
		],
	},
];
