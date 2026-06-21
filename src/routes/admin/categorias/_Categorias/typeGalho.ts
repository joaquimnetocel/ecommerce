export type typeGalho = {
	idCategorias: string;
	campoNome: string;
	keyCategoriasPai: string | null;
	filhas: typeGalho[];
};
