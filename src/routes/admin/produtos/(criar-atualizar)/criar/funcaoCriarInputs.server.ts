import type { typeSchemaInput } from '../_Formulario/schema';

type typeFormProdutos = typeSchemaInput['formProdutos'];
type typeFormVariantes = typeSchemaInput['formVariantes'];
type typeFormCategorias = typeSchemaInput['formCategorias'];
type typeFormImagens = typeSchemaInput['formImagens'];

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
	const formCategorias: typeFormCategorias = [];
	const formImagens: typeFormImagens = [];

	return {
		formCategorias,
		formProdutos,
		formVariantes,
		formImagens,
	};
}
