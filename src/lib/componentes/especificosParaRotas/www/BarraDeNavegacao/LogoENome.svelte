<script lang="ts">
	import { resolve } from '$app/paths';
	import { PUBLIC_LOJA } from '$env/static/public';
	import { funcaoConfiguracoes } from '$lib/configuracoes/funcaoConfiguracoes';

	const configuracoes = funcaoConfiguracoes({
		loja: PUBLIC_LOJA,
		quais: ['nome', 'descricao'],
	});
</script>

<div class="mr-4 md:flex">
	<div class="flex gap-3">
		<a
			href={resolve('/')}
			class="transition-transform duration-300 hover:scale-105 active:scale-95"
		>
			<img
				src={`/${PUBLIC_LOJA}/imagens/logo.png`}
				class="h-10 object-contain"
				alt={configuracoes.descricao}
			/>
		</a>
		<a
			href={resolve('/')}
			class="flex items-center space-x-2 transition-transform duration-300 hover:scale-105 active:scale-95"
		>
			<span class="font-bold"> {configuracoes.nome} </span>
		</a>
	</div>
</div>
