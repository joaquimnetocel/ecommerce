import type { typeSchemaInput } from '../_Formulario/schema';

type typeFormProdutos = typeSchemaInput['formProdutos'];
type typeFormVariantes = typeSchemaInput['formVariantes'];

export function funcaoCriarInputs(): typeSchemaInput {
	const formProdutos: typeFormProdutos = {
		campoAtivo: true,
		campoDescricao: null,
		campoNome: '',
		idProdutos: undefined,
	};
	const formVariantes: typeFormVariantes = [
		{
			campoAtivo: true,
			campoEstoque: 1,
			campoPreco: '0.00',
			idVariantes: undefined,
			campoAtributos: { '': '' },
		},
	];
	return {
		formProdutos,
		formVariantes,
	};
}
