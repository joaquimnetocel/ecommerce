import { tamanhosProdutos } from '$lib/constantes/schema/produtos';
import { funcaoGerarSlug } from '$lib/funcoes/funcaoGerarSlug';
import * as v from 'valibot';

export const schema = v.object({
	formProdutos: v.object({
		idProdutos: v.optional(v.string()),
		campoNome: v.pipe(
			v.string(),
			v.trim(),
			v.minLength(1, 'ESTE CAMPO É OBRIGATÓRIO.'),
			v.maxLength(
				tamanhosProdutos.campoNome,
				`ESTE CAMPO DEVE TER NO MÁXIMO ${tamanhosProdutos.campoNome} CARACTERES.`,
			),
			v.check((arg) => {
				return funcaoGerarSlug(arg).length < tamanhosProdutos.campoSlug;
			}, 'CAMPO MUITO LONGO PARA GERAR O SLUG.'),
		),
		campoDescricao: v.pipe(
			v.nullable(v.string()),
			v.transform((arg) => {
				if (arg === null) return null;
				const trim = arg.trim();
				return trim === '' ? null : trim;
			}),
		),
		campoAtivo: v.boolean(),
	}),
	formVariantes: v.pipe(
		v.array(
			v.object({
				idVariantes: v.optional(v.string()),
				campoPreco: v.pipe(
					v.string(),
					v.trim(),
					v.minLength(1, 'O PREÇO É OBRIGATÓRIO.'),
					v.transform((value) => value.replace(',', '.')),
					v.regex(/^\d+(\.\d{1,2})?$/, 'INFORME UM PREÇO VÁLIDO.'),
				),
				campoEstoque: v.pipe(
					v.number(),
					v.integer('O ESTOQUE DEVE SER UM NÚMERO INTEIRO.'),
					v.minValue(0, 'O ESTOQUE NÃO PODE SER NEGATIVO.'),
				),
				campoAtivo: v.boolean(),
				campoAtributos: v.record(v.string(), v.string()),
			}),
		),
		v.minLength(1, 'O PRODUTO DEVE POSSUIR AO MENOS UMA VARIANTE.'),
	),
});

export type typeSchemaInput = v.InferInput<typeof schema>;
export type typeSchemaOutput = v.InferOutput<typeof schema>;
