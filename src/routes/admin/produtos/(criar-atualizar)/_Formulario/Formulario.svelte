<script lang="ts">
	import { Button } from '$lib/shadcn/componentes/ui/button';
	import FormularioDeProdutos from './FormularioDeProdutos.svelte';
	import { funcaoSubmeter } from './funcaoSubmeter';
	import { funcaoVoltar } from './funcaoVoltar';
	import type { typeDados } from './typeDados';

	let { data }: { data: typeDados } = $props();

	// svelte-ignore state_referenced_locally
	let dados = $state(structuredClone(data)); // EXIGE O {#key} NO COMPONENTE PARA RE-CÁLCULO

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

<form class="space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-semibold">
			{operacao === 'enumCriar' ? 'CRIAR' : 'ATUALIZAR'} PRODUTO
		</h1>
		<div>
			{@render snippetBotoes()}
		</div>
	</div>
	<FormularioDeProdutos {dados} />
	<div class="flex justify-end gap-3 border-t pt-6">
		{@render snippetBotoes()}
	</div>
</form>
