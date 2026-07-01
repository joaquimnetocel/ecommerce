import type { tipoGalho } from '../../tipos/tipoGalho';

export function recursivaColetarIdsDosFilhos(galho: tipoGalho): string[] {
	return [galho.idCategorias, ...galho.filhos.flatMap(recursivaColetarIdsDosFilhos)];
}
