import type { typeErrosDeFormularios } from '$lib/types/typeErrosDeFormularios';
import type { BaseIssue } from 'valibot';

export function funcaoErrosDoFormulario<T>(
	issues: BaseIssue<unknown>[],
): typeErrosDeFormularios<T> {
	const erros: typeErrosDeFormularios<T> = {};

	for (const issue of issues) {
		if (!issue.path?.length) continue;

		let atual: Record<string, unknown> = erros;

		const caminho = issue.path.map((p) => p.key);

		for (let i = 0; i < caminho.length - 1; i++) {
			const chave = caminho[i];

			if (chave === undefined) continue;

			if (atual[chave as keyof typeof atual] === undefined) {
				atual[chave as keyof typeof atual] = typeof caminho[i + 1] === 'number' ? [] : {};
			}

			atual = atual[chave as keyof typeof atual] as Record<string, unknown>;
		}

		const ultimaChave = caminho.at(-1);

		if (ultimaChave !== undefined && atual[ultimaChave as keyof typeof atual] === undefined) {
			atual[ultimaChave as keyof typeof atual] = issue.message;
		}
	}

	return erros;
}
