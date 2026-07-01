import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import type { Pathname } from '$app/types';
import { funcaoErrosDoFormulario } from '$lib/funcoes/funcaoErrosDoFormulario';
import { sweetalertErro } from '$lib/sweetalerts/sweetalertErro';
import Swal from 'sweetalert2';
import * as v from 'valibot';
import { schema } from '../schema';
import type { typeDados } from '../typeDados';
import { remotaAtualizar } from './remotaAtualizar/remotaAtualizar.remote';
import { remotaCriar } from './remotaCriar/remotaCriar.remote';

export async function funcaoSubmeter({
	dados,
	voltarPara,
}: {
	dados: typeDados;
	voltarPara: Pathname;
}) {
	Swal.fire({
		title: 'PROCESSANDO...',
		allowOutsideClick: false,
		didOpen: () => Swal.showLoading(),
	});
	const validacao = v.safeParse(schema, dados.inputs);
	if (validacao.success === false) {
		dados.erros = funcaoErrosDoFormulario(validacao.issues);
	} else {
		dados.erros = {};
		try {
			if (dados.inputs.formProdutos.idProdutos === undefined) {
				await remotaCriar(dados.inputs);
			} else {
				await remotaAtualizar(dados.inputs);
			}
			goto(resolve(voltarPara));
		} catch (erro) {
			await sweetalertErro(erro);
		}
	}
	Swal.close();
}
