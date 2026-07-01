<script lang="ts">
	import { PUBLIC_LOJA } from '$env/static/public';
	import { funcaoConfiguracoes } from '$lib/configuracoes/funcaoConfiguracoes';

	const configuracoes = funcaoConfiguracoes({
		loja: PUBLIC_LOJA,
		quais: ['redesSociais'],
	});
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->

<div class="flex items-center space-x-5 sm:mt-0 sm:justify-center">
	{#each configuracoes.redesSociais as corrente (corrente.slug)}
		{#if corrente.ativa && corrente.icone && corrente.url}
			<a
				href={corrente.url}
				target="_blank"
				rel="nofollow"
				class="fill-gray-500 text-gray-500 hover:fill-gray-900 hover:text-gray-900 dark:hover:fill-gray-600 dark:hover:text-gray-600"
			>
				<!-- eslint-disable-next-line svelte/no-at-html-tags										-->
				{@html corrente.icone}
			</a>
		{/if}
	{/each}
</div>
