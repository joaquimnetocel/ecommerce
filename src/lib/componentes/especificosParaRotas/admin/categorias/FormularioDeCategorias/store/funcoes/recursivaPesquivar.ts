import type { tipoGalho } from '../../tipos/tipoGalho';

export function recursivaPesquisar(galho: tipoGalho, texto: string): tipoGalho | null {
	if (!texto) return galho;
	const match = galho.campoNome.toLowerCase().includes(texto.toLowerCase());
	const filhos = galho.filhos
		.map((f) => recursivaPesquisar(f, texto))
		.filter((v): v is tipoGalho => v !== null);
	if (match || filhos.length) {
		return { ...galho, filhos: filhos };
	}
	return null;
}
