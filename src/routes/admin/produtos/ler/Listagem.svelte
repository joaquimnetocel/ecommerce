<script lang="ts">
	import { resolve } from '$app/paths';
	import type { funcaoLer } from './funcaoLer.server';

	let { lido }: { lido: Awaited<ReturnType<typeof funcaoLer>> } = $props();
</script>

<div class="space-y-3">
	{#if lido.length === 0}
		NENHUM PRODUTO ENCONTRADO
	{:else}
		{#each lido as corrente (corrente.idProdutos)}
			<a
				href={resolve(`/admin/produtos/atualizar/${corrente.idProdutos}`)}
				class="block rounded-lg border bg-white p-4 shadow-sm transition hover:border-sky-500 hover:shadow-md"
			>
				<div class="flex items-center justify-between">
					<div>
						<div class="font-medium">
							{corrente.campoNome}
						</div>

						<div class="text-sm text-muted-foreground">
							SLUG: {corrente.campoSlug}
						</div>
					</div>

					<div class="text-sm font-medium text-sky-600">EDITAR →</div>
				</div>
			</a>
		{/each}
	{/if}
</div>
