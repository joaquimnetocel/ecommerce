import Swal from 'sweetalert2';

function escapeHtml(texto: string) {
	return texto
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');
}

export async function sweetalertApagar(nomeCategoria: string) {
	const resultado = await Swal.fire({
		title: 'APAGAR CATEGORIA?',
		html: `Deseja realmente apagar a categoria <strong>${escapeHtml(nomeCategoria.toUpperCase())}</strong>?<br><span style="color: #ef4444; font-size: 0.875rem; font-weight: bold;">⚠️ Atenção: Todas as subcategorias vinculadas também serão excluídas de forma permanente.</span>`,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'SIM, APAGAR',
		cancelButtonText: 'CANCELAR',
		confirmButtonColor: '#dc2626', // Vermelho "destrutivo" (padrão Tailwind red-600)
		focusCancel: true, // Mantém o foco no botão Cancelar para evitar cliques acidentais com "Enter"
	});

	return resultado.isConfirmed;
}
