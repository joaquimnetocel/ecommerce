<script lang="ts">
	import BotaoCancelar from '$lib/componentes/especificosParaRotas/admin/produtos/FormularioDeProdutos/BotaoCancelar.svelte';
	import BotaoSubmeter from '$lib/componentes/especificosParaRotas/admin/produtos/FormularioDeProdutos/BotaoSubmeter.svelte';
	import FormularioDeProdutos from '$lib/componentes/especificosParaRotas/admin/produtos/FormularioDeProdutos/index.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	// svelte-ignore state_referenced_locally
	// eslint-disable-next-line svelte/prefer-writable-derived
	let dados = $state(structuredClone(data));

	$effect(() => {
		dados = structuredClone(data);
	});
</script>

{#snippet snippetBotoes()}
	<BotaoCancelar
		voltarPara={dados.lido?.campoAtivo
			? '/admin/produtos/ler/ativos'
			: '/admin/produtos/ler/inativos'}
	/>
	<BotaoSubmeter
		{dados}
		texto="SALVAR"
		voltarPara={dados.lido?.campoAtivo
			? '/admin/produtos/ler/ativos'
			: '/admin/produtos/ler/inativos'}
	/>
{/snippet}

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="classeTitulo">ATUALIZAR PRODUTO</h1>
		<div>
			{@render snippetBotoes()}
		</div>
	</div>
	<FormularioDeProdutos bind:dados />
	<div class="flex justify-end gap-3">
		{@render snippetBotoes()}
	</div>
</div>
