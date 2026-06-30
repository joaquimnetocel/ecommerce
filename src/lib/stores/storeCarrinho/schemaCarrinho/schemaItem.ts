import * as v from 'valibot';

export const schemaItem = v.object({
	tabelaProdutos: v.object({
		idProdutos: v.pipe(v.string(), v.uuid()),
		campoNome: v.string(),
		campoSlug: v.string(),
	}),
	tabelaVariantes: v.object({
		idVariantes: v.pipe(v.string(), v.uuid()),
		campoSku: v.string(),
		campoEstoque: v.pipe(v.number(), v.minValue(0)),
		campoPreco: v.pipe(v.number(), v.minValue(0)),
		campoPrecoCheio: v.pipe(v.number(), v.minValue(0)),
	}),
	imagem: v.string(),
	quantidade: v.pipe(v.number(), v.integer(), v.minValue(1)),
});

export type tipoSchemaItemInput = v.InferInput<typeof schemaItem>;
export type tipoSchemaItemOutput = v.InferOutput<typeof schemaItem>;
