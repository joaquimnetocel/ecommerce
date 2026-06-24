import { tamanhos } from '$lib/constantes/tamanhos';
import Swal from 'sweetalert2';

export async function sweetalertEditar(nomeAtual: string): Promise<string | null> {
	const resultado = await Swal.fire({
		title: 'EDITAR CATEGORIA',
		input: 'text',
		inputPlaceholder: 'DIGITE O NOME DA CATEGORIA...',
		inputValue: nomeAtual.toUpperCase(),
		inputAttributes: {
			style: 'text-transform: uppercase;',
			maxlength: tamanhos.categorias.campoNome.toString(),
		},
		showCancelButton: true,
		confirmButtonText: 'EDITAR',
		cancelButtonText: 'CANCELAR',

		// VALIDAÇÃO EM TEMPO REAL: Impede o envio se estiver vazio
		inputValidator: (value) => {
			if (!value || !value.trim()) {
				return 'O NOME DA CATEGORIA NÃO PODE FICAR EM BRANCO!';
			}
			return null;
		},
	});

	if (resultado.isConfirmed && resultado.value) {
		return resultado.value.trim().toUpperCase();
	}

	return null;
}
