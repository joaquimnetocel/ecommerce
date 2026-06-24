import { tamanhos } from '$lib/constantes/tamanhos';
import Swal from 'sweetalert2';

export async function sweetalertCriar(): Promise<string | null> {
	const resultado = await Swal.fire({
		title: 'NOVA CATEGORIA',
		input: 'text',
		inputPlaceholder: 'DIGITE O NOME DA CATEGORIA...',
		inputAttributes: {
			style: 'text-transform: uppercase;',
			maxlength: tamanhos.categorias.campoNome.toString(), // Alinhado com o seu schema do Valibot
			autocomplete: 'off',
		},
		showCancelButton: true,
		confirmButtonText: 'CRIAR',
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
