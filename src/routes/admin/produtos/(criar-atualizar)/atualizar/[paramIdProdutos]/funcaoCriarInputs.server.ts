import type { typeSchemaInput } from '../../_Formulario/schema';
import type { typeDados } from '../../_Formulario/typeDados';

type typeFormProdutos = typeSchemaInput['formProdutos'];
type typeFormVariantes = typeSchemaInput['formVariantes'];
type typeVariante = typeFormVariantes[number];

export function funcaoCriarInputs(lido: Exclude<typeDados['lido'], undefined>): typeSchemaInput {
	const formProdutos: typeFormProdutos = {
		campoAtivo: lido.campoAtivo,
		campoDescricao: lido.campoDescricao,
		campoNome: lido.campoNome,
		idProdutos: lido.idProdutos,
	};
	const formVariantes: typeFormVariantes = lido.relVariantes.map(
		(corrente): typeVariante => ({
			campoAtivo: corrente.campoAtivo,
			campoEstoque: corrente.campoEstoque,
			campoPreco: corrente.campoPreco,
			idVariantes: corrente.idVariantes,
			campoAtributos: corrente.campoAtributos,
		}),
	);
	return {
		formProdutos,
		formVariantes,
	};
}
