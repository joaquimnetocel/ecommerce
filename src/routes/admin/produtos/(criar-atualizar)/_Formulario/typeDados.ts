import type { typeErrosDeFormularios } from '$lib/types/typeErrosDeFormularios';
import { funcaoLer } from './funcaoLer.server';
import type { funcaoLerCategorias } from './funcaoLerCategorias.server';
import type { typeSchemaInput } from './schema';

export type typeDados = {
	categorias: Awaited<ReturnType<typeof funcaoLerCategorias>>;
	lido: Awaited<ReturnType<typeof funcaoLer>> | undefined;
	inputs: typeSchemaInput;
	erros: typeErrosDeFormularios<typeSchemaInput>;
};
