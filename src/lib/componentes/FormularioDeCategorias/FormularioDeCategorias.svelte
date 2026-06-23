<script lang="ts">
	import { untrack } from 'svelte'; // ◄ Importação necessária para quebrar o loop
	import { Button } from '$lib/shadcn/componentes/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/shadcn/componentes/ui/card';
	import { Input } from '$lib/shadcn/componentes/ui/input';
	import { Plus } from '@lucide/svelte';
	import CategoriaTree from './Item.svelte';
	import { deriveds } from './deriveds.svelte';
	import { funcaoCriarCategoria } from './store/funcaoCriarCategoria';
	import { store } from './store/store.svelte';
	import type { tipoCategorias } from './tipoCategorias';

	let {
		dados,
		apenasMarcadas = false,
		verCheckboxes,
		marcadas = $bindable([]),
	}: {
		verCheckboxes: boolean;
		dados: tipoCategorias;
		apenasMarcadas?: boolean;
		marcadas?: string[];
	} = $props();

	$effect.pre(() => {
		store.categorias = dados;
		store.apenasMarcadas = apenasMarcadas;
	});

	// 2. SINCRONIZAÇÃO DA ENTRADA (SÓ atualiza a store se o Pai mandar uma lista de IDs diferente de fora)
	$effect.pre(() => {
		// Espia o que tem na store hoje sem disparar reatividade desnecessária
		const idsAtuaisNaStore = untrack(() => [...store.selecionadas]);

		// Verifica se o que veio de fora (marcadas) é realmente diferente do que temos dentro
		const mudouExternamente =
			marcadas.length !== idsAtuaisNaStore.length ||
			marcadas.some((id) => !idsAtuaisNaStore.includes(id));

		// Se a mudança veio de fora (ex: o formulário limpou ou carregou outro produto)
		if (mudouExternamente) {
			store.selecionadas.clear();
			for (const id of marcadas) {
				store.selecionadas.add(id);
			}
		}
	});

	// 3. VIA DE SAÍDA (Avisa o Pai quando houver cliques nos checkboxes internos)
	$effect(() => {
		const arrayDaStore = [...store.selecionadas];

		// Só atualiza a prop do pai se houver diferença real, evitando loops
		if (JSON.stringify(marcadas) !== JSON.stringify(arrayDaStore)) {
			marcadas = arrayDaStore;
		}
	});
</script>

<Card class="gap-2 bg-slate-200 shadow-md">
	<CardHeader>
		<div class="flex items-center justify-between">
			<CardTitle>CATEGORIAS</CardTitle>
			<!-- <CardDescription class="text-sm text-white">INFORMAÇÕES GERAIS</CardDescription> -->
			<Button class="cursor-pointer" onclick={funcaoCriarCategoria}>CRIAR CATEGORIA</Button>
		</div>
	</CardHeader>

	<CardContent class="space-y-4">
		{#if deriveds.arvore().length > 0}
			<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
				<Input
					class="border-2 border-slate-400 bg-white"
					bind:value={store.pesquisa}
					placeholder="PESQUISAR CATEGORIA..."
				/>
				{#if verCheckboxes}
					<label
						class="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700 select-none"
					>
						<input
							type="checkbox"
							class="h-4 w-4 cursor-pointer rounded border-gray-300 text-primary focus:ring-primary"
							bind:checked={store.apenasMarcadas}
						/>
						<span>VER APENAS MARCADAS</span>
					</label>
				{/if}
			</div>
		{/if}

		<div class="space-y-4">
			<ul>
				{#if deriveds.arvoreFiltrada().length === 0}
					<div class="text-center">NENHUMA CATEGORIA ENCONTRADA</div>
				{:else}
					{#each deriveds.arvoreFiltrada() as galho (galho.idCategorias)}
						<CategoriaTree {galho} nivel={0} {verCheckboxes} />
					{/each}
				{/if}
			</ul>

			<Button class="cursor-pointer" onclick={funcaoCriarCategoria}>
				<Plus /> CRIAR CATEGORIA
			</Button>
		</div>
	</CardContent>
</Card>

<!-- <pre>{JSON.stringify([...store.selecionadas], null, 2)}</pre> -->
