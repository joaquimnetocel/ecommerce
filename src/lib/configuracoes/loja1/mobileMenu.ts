import type { Pathname } from '$app/types';

type typeMobileMenuItem = {
	link: Pathname | null;
	name: string;
	children: typeMobileMenuItem[];
};

export const mobileMenu: typeMobileMenuItem[] = [
	{
		link: null,
		name: 'Men',
		children: [],
	},
	{
		link: null,
		name: 'Kids',
		children: [],
	},
	{
		link: null,
		name: 'Home',
		children: [
			{
				link: null,
				name: 'Eletrônicos',
				children: [
					{
						link: null,
						name: 'Novos',
						children: [],
					},
					{
						link: null,
						name: 'Usados',
						children: [],
					},
				],
			},
			{
				link: null,
				name: 'Manuais',
				children: [
					{
						link: null,
						name: 'Difíceis',
						children: [],
					},
					{
						link: null,
						name: 'Faceis',
						children: [],
					},
				],
			},
		],
	},
	{
		link: null,
		name: ' Fashion',
		children: [],
	},
	{
		link: null,
		name: 'Women',
		children: [
			{
				link: null,
				name: 'JÓIAS',
				children: [
					{
						link: null,
						name: 'BIJOUTERIAS',
						children: [],
					},
					{
						link: null,
						name: 'OURO',
						children: [],
					},
				],
			},
			{
				link: null,
				name: 'Cosmetic',
				children: [],
			},
		],
	},
];
