import type { Pathname } from '$app/types';

type typeItemDoMenuParaTelaGrande = {
	link: Pathname | null;
	name: string;
	children: typeItemDoMenuParaTelaGrande[];
};

export const menuParaTelaGrande: typeItemDoMenuParaTelaGrande[] = [
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
				name: 'Electronics',
				children: [],
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
				name: 'Jewellery',
				children: [],
			},
			{
				link: null,
				name: 'Cosmetic',
				children: [],
			},
		],
	},
];
