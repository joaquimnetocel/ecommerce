import type { typeCategorias } from './typeCategorias';

export const constCategorias: typeCategorias[] = [
	{
		idCategorias: '1',
		campoNome: 'Eletrônicos',
		keyCategoriasPai: null,
	},
	{
		idCategorias: '2',
		campoNome: 'Celulares',
		keyCategoriasPai: '1',
	},
	{
		idCategorias: '3',
		campoNome: 'Android',
		keyCategoriasPai: '2',
	},
	{
		idCategorias: '4',
		campoNome: 'iPhone',
		keyCategoriasPai: '2',
	},
	{
		idCategorias: '5',
		campoNome: 'Computadores',
		keyCategoriasPai: '1',
	},
];
