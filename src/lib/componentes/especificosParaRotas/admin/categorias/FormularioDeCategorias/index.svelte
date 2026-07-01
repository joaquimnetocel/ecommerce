<script lang="ts">
	import { Button } from '$lib/shadcn/componentes/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/shadcn/componentes/ui/card';
	import { Input } from '$lib/shadcn/componentes/ui/input';
	import { Plus } from '@lucide/svelte';
	import Item from './Item.svelte';
	import { acaoCriarCategoria } from './store/acoes/acaoCriarCategoria';
	import { derivedArvore, derivedArvoreFiltrada } from './store/deriveds.svelte';
	import { store } from './store/index.svelte';
	import type { tipoCategorias } from './tipos/tipoCategorias';

	let {
		dados,
	}: {
		dados: tipoCategorias;
	} = $props();

	$effect.pre(() => {
		store.categorias = dados;
	});
</script>

<Card class="gap-2 bg-slate-200 shadow-md">
	<CardHeader>
		<div class="flex items-center justify-between">
			<CardTitle>CATEGORIAS</CardTitle>
			<!-- <CardDescription class="text-sm text-white">INFORMAÇÕES GERAIS</CardDescription> -->
			<Button class="cursor-pointer" onclick={acaoCriarCategoria}><Plus /> CRIAR CATEGORIA</Button>
		</div>
	</CardHeader>

	<CardContent class="space-y-4">
		{#if derivedArvore().length > 0}
			<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
				<Input
					class="border-2 border-slate-400 bg-white"
					bind:value={store.pesquisa}
					placeholder="PESQUISAR CATEGORIA..."
				/>
			</div>
		{/if}

		<div class="space-y-4">
			<ul>
				{#if derivedArvoreFiltrada().length === 0}
					<div class="text-center">NENHUMA CATEGORIA ENCONTRADA</div>
				{:else}
					{#each derivedArvoreFiltrada() as galho (galho.idCategorias)}
						<Item {galho} nivel={0} />
					{/each}
				{/if}
			</ul>
		</div>
	</CardContent>
</Card>
