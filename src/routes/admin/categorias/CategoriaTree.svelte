<script lang="ts">
	import { Button } from '$lib/shadcn/componentes/ui/button';
	import { Input } from '$lib/shadcn/componentes/ui/input';
	import { Label } from '$lib/shadcn/componentes/ui/label';
	import type { SvelteSet } from 'svelte/reactivity';
	import CategoriaTree from './CategoriaTree.svelte';
	import type { typeGalho } from './typeGalho';

	let {
		categoria,
		nivel = 0,
		selecionadas,
		funcaoToggle,
		criandoEm,
		funcaoIniciarCriacao,
		funcaoSalvarSubcategoria,
		funcaoCancelarCriacao,
		funcaoGetInput,
		funcaoSetInput,
	} = $props<{
		categoria: typeGalho;
		nivel?: number;
		selecionadas: SvelteSet<string>;
		funcaoToggle: (id: string) => void;
		criandoEm: string | null;
		funcaoIniciarCriacao: (idPai: string) => void;
		funcaoSalvarSubcategoria: (idPai: string) => void;
		funcaoCancelarCriacao: () => void;
		funcaoGetInput: (id: string) => string;
		funcaoSetInput: (id: string, value: string) => void;
	}>();

	let aberto = $state(true);

	const funcaoIdentar = (nivel: number) => nivel * 24;
	const editOffset = 48;
</script>

<li>
	<!-- HEADER DA CATEGORIA -->
	<div class="flex items-center gap-2" style={`padding-left:${funcaoIdentar(nivel)}px`}>
		{#if categoria.filhas.length}
			<button
				type="button"
				class="classeCard2Label w-5 cursor-pointer"
				onclick={() => (aberto = !aberto)}
			>
				{aberto ? '▼' : '▶'}
			</button>
		{:else}
			<div class="w-5"></div>
		{/if}

		<Label class="classeCard2Label flex cursor-pointer items-center gap-2">
			<input
				class="cursor-pointer"
				type="checkbox"
				checked={selecionadas.has(categoria.identificador)}
				onchange={() => funcaoToggle(categoria.identificador)}
			/>
			<span>{categoria.campoNome}</span>
		</Label>

		<Button
			size="xs"
			class="cursor-pointer rounded border px-2 py-1 text-xs"
			onclick={() => funcaoIniciarCriacao(categoria.identificador)}
		>
			+ SUBCATEGORIA
		</Button>
	</div>

	<!-- INPUT ALINHADO CORRETAMENTE -->
	{#if criandoEm === categoria.identificador}
		<div
			class="flex items-center gap-2"
			style={`padding-left:${funcaoIdentar(nivel) + editOffset}px`}
		>
			<Input
				class="classeCard2Input w-90 rounded border px-2 py-1 text-sm"
				// 				oninput={(e) => {
				// }}

				value={funcaoGetInput(categoria.identificador)}
				oninput={(e) => {
					funcaoSetInput(
						categoria.identificador,
						(e.target as HTMLInputElement).value.toUpperCase(),
					);
				}}
				onkeydown={(e) => {
					if (e.key === 'Enter') funcaoSalvarSubcategoria(categoria.identificador);
					if (e.key === 'Escape') funcaoCancelarCriacao();
				}}
				autofocus
			/>

			<Button
				class="cursor-pointer rounded border px-2 py-1 text-xs"
				onclick={() => funcaoSalvarSubcategoria(categoria.identificador)}
			>
				CRIAR
			</Button>
		</div>
	{/if}

	<!-- FILHOS -->
	{#if aberto && categoria.filhas.length}
		<ul>
			{#each categoria.filhas as filha (filha.identificador)}
				<CategoriaTree
					categoria={filha}
					nivel={nivel + 1}
					{selecionadas}
					{funcaoToggle}
					{criandoEm}
					{funcaoIniciarCriacao}
					{funcaoSalvarSubcategoria}
					{funcaoCancelarCriacao}
					{funcaoGetInput}
					{funcaoSetInput}
				/>
			{/each}
		</ul>
	{/if}
</li>
