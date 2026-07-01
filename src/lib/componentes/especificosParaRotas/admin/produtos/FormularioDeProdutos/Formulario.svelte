<script lang="ts">
	import { Button } from '$lib/shadcn/componentes/ui/button';
	import FormularioDeProdutos from './FormularioDeProdutos.svelte';
	import { funcaoSubmeter } from './funcoes/funcaoSubmeter';
	import { funcaoVoltar } from './funcoes/funcaoVoltar';
	import type { typeDados } from './typeDados';

	let { data }: { data: typeDados } = $props();

	// svelte-ignore state_referenced_locally (NÃO TEM PROBLEMA POIS COMPONENTE ESTÁ ENVOLVIDO POR {#key})
	let dados = $state(structuredClone(data));

	const operacao = $derived(
		dados.inputs.formProdutos.idProdutos === undefined ? 'enumCriar' : 'enumAtualizar',
	);
</script>

{#snippet snippetBotoes()}
	<Button
		variant="outline"
		onclick={() => {
			funcaoVoltar(dados.lido?.campoAtivo);
		}}
		class="cursor-pointer"
	>
		CANCELAR
	</Button>
	<Button class="cursor-pointer" onclick={() => funcaoSubmeter(dados)}
		>{operacao === 'enumCriar' ? 'CRIAR' : 'SALVAR'}</Button
	>
{/snippet}

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="classeTitulo">
			{operacao === 'enumCriar' ? 'CRIAR' : 'ATUALIZAR'} PRODUTO
		</h1>
		<div>
			{@render snippetBotoes()}
		</div>
	</div>
	<FormularioDeProdutos {dados} />
	<div class="flex justify-end gap-3">
		{@render snippetBotoes()}
	</div>
</div>
