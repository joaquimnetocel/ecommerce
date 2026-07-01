import type { typeSchemaInput } from '$lib/componentes/admin/produtos/FormularioDeProdutos/schema';
import type { typeDados } from '$lib/componentes/admin/produtos/FormularioDeProdutos/typeDados';

type typeFormProdutos = typeSchemaInput['formProdutos'];
type typeFormCategorias = typeSchemaInput['formCategorias'];
type typeFormVariantes = typeSchemaInput['formVariantes'];
type typeVariante = typeFormVariantes[number];
type typeFormImagens = typeSchemaInput['formImagens'];

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
	const formCategorias: typeFormCategorias = lido.relCategoriasProdutos.map((corrente) => {
		return corrente.keyCategorias;
	});
	const formImagens: typeFormImagens = lido.relImagens;

	return {
		formImagens,
		formProdutos,
		formVariantes,
		formCategorias,
	};
}
