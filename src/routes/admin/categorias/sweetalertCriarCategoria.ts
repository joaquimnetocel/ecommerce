import Swal from 'sweetalert2';

export async function sweetalertCriarCategoria() {
	const resultado = await Swal.fire({
		title: 'CRIAR CATEGORIA',
		input: 'text',
		inputAttributes: { style: 'text-transform: uppercase' },
		showCancelButton: true,
		confirmButtonText: 'CRIAR',
		// showLoaderOnConfirm: true,
		//   preConfirm: async (login) => {
		//     try {
		//       const githubUrl = `
		//         https://api.github.com/users/${login}
		//       `;
		//       const response = await fetch(githubUrl);
		//       if (!response.ok) return Swal.showValidationMessage(`
		//           ${JSON.stringify(await response.json())}
		//         `);
		//       return response.json();
		//     } catch (error) {
		//       Swal.showValidationMessage(`
		//         Request failed: ${error}
		//       `);
		//     }
		//   },
		// allowOutsideClick: () => !Swal.isLoading(),
	});
	if (resultado.isConfirmed) {
		const digitado: string = resultado.value.trim().toUpperCase();
		// Swal.fire({
		// 	title: digitado,
		// });
		return digitado;
	}
	return null;
}
