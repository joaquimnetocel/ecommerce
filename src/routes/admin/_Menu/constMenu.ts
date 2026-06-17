import { Database, HouseIcon, Logs, PackageSearch } from '@lucide/svelte/icons';
import type { typeItemDoMenu } from './typeItemDoMenu';

export const constMenu: typeItemDoMenu[] = [
	{
		id: 'home',
		type: 'link',
		title: 'INÍCIO',
		url: '/admin',
		icon: HouseIcon,
	},
	{
		id: 'produtos',
		type: 'group',
		title: 'PRODUTOS',
		icon: PackageSearch,
		children: [
			{
				id: 'criar',
				type: 'link',
				title: 'CRIAR',
				url: '/admin/produtos/criar',
			},
			{
				id: 'ativos',
				type: 'link',
				title: 'ATIVOS',
				url: '/admin/produtos/ler/ativos',
			},
			{
				id: 'inativos',
				type: 'link',
				title: 'INATIVOS',
				url: '/admin/produtos/ler/inativos',
			},
		],
	},
	{
		id: 'banco',
		type: 'link',
		title: 'BANDO DE DADOS',
		url: '/admin/banco',
		icon: Database,
	},
	{
		id: 'exemplo',
		type: 'group',
		title: 'MENU DE EXEMPLO',
		icon: Logs,
		children: [
			{
				id: 'menu1',
				type: 'group',
				title: 'MENU 1',
				children: [
					{
						id: 'menu3',
						type: 'group',
						title: 'MENU 3',
						children: [
							{
								id: 'menu4',
								type: 'link',
								title: 'MENU 4',
								url: '/',
							},
							{
								id: 'menu5',
								type: 'link',
								title: 'MENU5 ',
								url: '/',
							},
						],
					},
					{
						id: 'menu6',
						type: 'link',
						title: 'MENU 6',
						url: '/',
					},
				],
			},
			{
				id: 'menu7',
				type: 'link',
				title: 'MENU 7',
				url: '/',
			},
		],
	},
];
