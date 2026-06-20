import * as v from 'valibot';

export const schema = v.object({
	identificador: v.pipe(v.string()),
	idCategorias: v.optional(v.pipe(v.string(), v.uuid('ID DA CATEGORIA INVÁLIDA.'))),
	campoNome: v.pipe(
		v.string(),
		v.trim(),
		v.minLength(1, 'Informe o nome da categoria.'),
		v.maxLength(255),
	),
	// campoSlug: v.pipe(
	// 	v.string(),
	// 	v.trim(),
	// 	v.minLength(1, 'Informe o slug.'),
	// 	v.maxLength(255),
	// 	v.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug inválido.'),
	// ),
	keyCategoriasPai: v.nullable(v.pipe(v.string(), v.uuid('ID DA CATEGORIA PAI INVÁLIDO.'))),
});

export type typeSchemaInput = v.InferInput<typeof schema>;
export type typeSchemaOutput = v.InferOutput<typeof schema>;
