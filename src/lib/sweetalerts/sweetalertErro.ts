import Swal from 'sweetalert2';

export function sweetalertErro(erro: unknown) {
	const mensagem = erro instanceof Error ? erro.message : 'ERRO! OPERAÇÃO NÃO REALIZADA.';
	return Swal.fire({
		icon: 'error',
		title: 'Erro',
		text: mensagem,
	});
}
