export type typeGalho = {
	idCategorias: string;
	campoNome: string;
	keyCategoriasPai: string | null;
	filhos: typeGalho[];
};
