import type { typeSchemaInput } from './schema';

export const constCategorias: typeSchemaInput[] = [
	{
		idCategorias: '1',
		campoNome: 'Eletrônicos',
		keyCategoriasPai: null,
		identificador: '1',
	},
	{
		idCategorias: '2',
		campoNome: 'Celulares',
		keyCategoriasPai: '1',
		identificador: '2',
	},
	{
		idCategorias: '3',
		campoNome: 'Android',
		keyCategoriasPai: '2',
		identificador: '3',
	},
	{
		idCategorias: '4',
		campoNome: 'iPhone',
		keyCategoriasPai: '2',
		identificador: '4',
	},
	{
		idCategorias: '5',
		campoNome: 'Computadores',
		keyCategoriasPai: '1',
		identificador: '5',
	},
];
