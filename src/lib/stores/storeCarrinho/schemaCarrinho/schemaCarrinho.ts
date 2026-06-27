import * as v from 'valibot';
import { schemaCupom } from './schemaCupom';
import { schemaItem } from './schemaItem';

export const schemaCarrinho = v.object({
	itens: v.array(schemaItem),
	cupom: v.nullable(schemaCupom),
});

export type tipoSchemaCarrinhoInput = v.InferInput<typeof schemaCarrinho>;
export type tipoSchemaCarrinhoOutput = v.InferOutput<typeof schemaCarrinho>;
