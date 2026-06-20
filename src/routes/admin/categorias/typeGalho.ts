import type { typeSchemaInput } from './schema';

export type typeGalho = typeSchemaInput & {
	filhas: typeGalho[];
};
