import Swal from 'sweetalert2';

export async function funcaoImagemExiste(url: string): Promise<boolean> {
	try {
		const resposta = await fetch(url, { method: 'HEAD' });
		if (resposta.ok === false) {
			return false;
		}
		return true;
	} catch {
		Swal.fire({
			title: 'ERRO AO VERIFICAR IMAGEM!',
			text: `Não foi possível alcançar o servidor para validar as imagens.`,
			icon: 'error',
			confirmButtonText: 'Entendido',
			confirmButtonColor: '#3085d6',
		});
		return false;
	}
}
