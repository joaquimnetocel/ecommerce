import Swal from 'sweetalert2';

export async function sweetalertCriarCategoria() {
	const resultado = await Swal.fire({
		title: 'CRIAR CATEGORIA',
		input: 'text',
		inputAttributes: { style: 'text-transform: uppercase' },
		showCancelButton: true,
		confirmButtonText: 'CRIAR',
	});
	if (resultado.isConfirmed) {
		const digitado: string = resultado.value.trim().toUpperCase();
		return digitado;
	}
	return null;
}
