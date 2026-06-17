import { funcaoErrosDoFormulario } from '$lib/funcoes/funcaoErrosDoFormulario';
import { sweetalertErro } from '$lib/sweetalerts/sweetalertErro';
import Swal from 'sweetalert2';
import * as v from 'valibot';
import { funcaoVoltar } from './funcaoVoltar';
import { funcaoRemotaAtualizar } from './remotas/remotaAtualizar/remotaAtualizar.remote';
import { funcaoRemotaCriar } from './remotas/remotaCriar/remotaCriar.remote';
import { schema } from './schema';
import type { typeDados } from './typeDados';

export async function funcaoSubmeter(dados: typeDados) {
	Swal.fire({
		title: 'PROCESSANDO...',
		allowOutsideClick: false,
		didOpen: () => Swal.showLoading(),
	});
	const validacao = v.safeParse(schema, dados.inputs);
	if (!validacao.success) {
		dados.erros = funcaoErrosDoFormulario(validacao.issues);
	} else {
		dados.erros = {};
		try {
			if (dados.inputs.formProdutos.idProdutos === undefined) {
				await funcaoRemotaCriar(dados.inputs);
			} else {
				await funcaoRemotaAtualizar(dados.inputs);
			}
			funcaoVoltar(dados.lido?.campoAtivo);
		} catch (erro) {
			await sweetalertErro(erro);
		}
	}
	Swal.close();
}
