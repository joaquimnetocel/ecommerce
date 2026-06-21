export type tipoGalho = {
	idCategorias: string;
	campoNome: string;
	keyCategoriasPai: string | null;
	filhos: tipoGalho[];
};
