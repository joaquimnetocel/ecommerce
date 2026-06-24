import type { tipoGalho } from '../tipoGalho';

export function recursivaColetarIdsDosFilhos(galho: tipoGalho): string[] {
	return [galho.idCategorias, ...galho.filhos.flatMap(recursivaColetarIdsDosFilhos)];
}
