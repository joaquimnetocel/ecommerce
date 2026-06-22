import { tamanhos } from '$lib/constantes/tamanhos';
import * as v from 'valibot';

export const schema = v.object({
	idCategorias: v.optional(v.pipe(v.string(), v.uuid('ID DA CATEGORIA INVÁLIDO.'))),
	campoNome: v.pipe(
		v.string(),
		v.trim(),
		v.minLength(1, 'INFORME O NOME DA CATEGORIA.'),
		v.maxLength(tamanhos.categorias.campoNome),
	),
	keyCategoriasPai: v.nullable(v.pipe(v.string(), v.uuid('ID DA CATEGORIA PAI INVÁLIDO.'))),
});

export type typeSchemaInput = v.InferInput<typeof schema>;
export type typeSchemaOutput = v.InferOutput<typeof schema>;
