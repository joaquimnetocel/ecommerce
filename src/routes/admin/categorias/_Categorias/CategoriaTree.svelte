<script lang="ts">
	import { Button } from '$lib/shadcn/componentes/ui/button';
	import { Input } from '$lib/shadcn/componentes/ui/input';
	import { Label } from '$lib/shadcn/componentes/ui/label';
	import type { SvelteSet } from 'svelte/reactivity';
	import CategoriaTree from './CategoriaTree.svelte';
	import type { typeGalho } from './typeGalho';

	let {
		galho,
		nivel = 0,
		selecionadas,
		funcaoCheckbox,
		criandoEm,
		funcaoIniciarCriacao,
		funcaoCriarSubcategoria,
		funcaoCancelarCriacao,
		funcaoPegarInput,
		funcaoDefinirInput,
		funcaoApagar,
	}: {
		galho: typeGalho;
		nivel?: number;
		selecionadas: SvelteSet<string>;
		funcaoCheckbox: (id: string) => void;
		criandoEm: string | null;
		funcaoIniciarCriacao: (idPai: string) => void;
		funcaoCriarSubcategoria: (idPai: string) => Promise<void>;
		funcaoApagar: (id: typeGalho) => Promise<void>;
		funcaoCancelarCriacao: () => void;
		funcaoPegarInput: (id: string) => string;
		funcaoDefinirInput: (id: string, value: string) => void;
	} = $props();

	let aberto = $state(true);

	const funcaoIdentar = (nivel: number) => nivel * 24;
	const editOffset = 48;
</script>

<li>
	<!-- HEADER DA CATEGORIA -->
	<div class="flex items-center gap-2" style={`padding-left:${funcaoIdentar(nivel)}px`}>
		{#if galho.filhos.length}
			<button type="button" class="w-5 cursor-pointer" onclick={() => (aberto = !aberto)}>
				{aberto ? '▼' : '▶'}
			</button>
		{:else}
			<div class="w-5"></div>
		{/if}

		<Label class="flex cursor-pointer items-center gap-2">
			<input
				class="cursor-pointer"
				type="checkbox"
				checked={selecionadas.has(galho.idCategorias)}
				onchange={() => funcaoCheckbox(galho.idCategorias)}
			/>
			<span>{galho.campoNome}</span>
		</Label>

		<Button
			size="xs"
			class="cursor-pointer rounded border px-2 py-1 text-xs"
			onclick={() => funcaoApagar(galho)}
		>
			APAGAR
		</Button>
		<Button
			size="xs"
			class="cursor-pointer rounded border px-2 py-1 text-xs"
			onclick={() => funcaoIniciarCriacao(galho.idCategorias)}
		>
			+ SUBCATEGORIA
		</Button>
	</div>

	<!-- INPUT ALINHADO CORRETAMENTE -->
	{#if criandoEm === galho.idCategorias}
		<div
			class="flex items-center gap-2"
			style={`padding-left:${funcaoIdentar(nivel) + editOffset}px`}
		>
			<Input
				class="w-90 rounded border px-2 py-1 text-sm"
				// 				oninput={(e) => {
				// }}

				value={funcaoPegarInput(galho.idCategorias)}
				oninput={(e) => {
					funcaoDefinirInput(
						galho.idCategorias,
						(e.target as HTMLInputElement).value.toUpperCase(),
					);
				}}
				onkeydown={(e) => {
					if (e.key === 'Enter') funcaoCriarSubcategoria(galho.idCategorias);
					if (e.key === 'Escape') funcaoCancelarCriacao();
				}}
				autofocus
			/>

			<Button
				class="cursor-pointer rounded border px-2 py-1 text-xs"
				onclick={() => funcaoCriarSubcategoria(galho.idCategorias)}
			>
				CRIAR
			</Button>
		</div>
	{/if}

	<!-- FILHOS -->
	{#if aberto && galho.filhos.length}
		<ul>
			{#each galho.filhos as filha (filha.idCategorias)}
				<CategoriaTree
					galho={filha}
					nivel={nivel + 1}
					{funcaoApagar}
					{selecionadas}
					{funcaoCheckbox}
					{criandoEm}
					{funcaoIniciarCriacao}
					{funcaoCriarSubcategoria}
					{funcaoCancelarCriacao}
					{funcaoPegarInput}
					{funcaoDefinirInput}
				/>
			{/each}
		</ul>
	{/if}
</li>
