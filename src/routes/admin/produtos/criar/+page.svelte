<script lang="ts">
	import BotaoCancelar from '$lib/componentes/especificosParaRotas/admin/produtos/FormularioDeProdutos/BotaoCancelar.svelte';
	import BotaoSubmeter from '$lib/componentes/especificosParaRotas/admin/produtos/FormularioDeProdutos/BotaoSubmeter.svelte';
	import FormularioDeProdutos from '$lib/componentes/especificosParaRotas/admin/produtos/FormularioDeProdutos/index.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

{#snippet snippetBotoes()}
	<BotaoCancelar
		voltarPara={data.inputs.formProdutos.campoAtivo
			? '/admin/produtos/ler/ativos'
			: '/admin/produtos/ler/inativos'}
	/>
	<BotaoSubmeter
		dados={data}
		texto="CRIAR"
		voltarPara={data.inputs.formProdutos.campoAtivo
			? '/admin/produtos/ler/ativos'
			: '/admin/produtos/ler/inativos'}
	/>
{/snippet}

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="classeTitulo">CRIAR PRODUTO</h1>
		<div>
			{@render snippetBotoes()}
		</div>
	</div>
	{#key data.inputs.formProdutos.idProdutos}
		<FormularioDeProdutos dados={data} />
	{/key}
	<div class="flex justify-end gap-3">
		{@render snippetBotoes()}
	</div>
</div>
