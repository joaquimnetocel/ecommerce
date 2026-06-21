<script lang="ts">
	import { Button } from '$lib/shadcn/componentes/ui/button';
	import { Input } from '$lib/shadcn/componentes/ui/input';
	import { SvelteMap, SvelteSet } from 'svelte/reactivity';
	import CategoriaTree from './CategoriaTree.svelte';
	import { funcaoMontarArvore } from './funcaoMontarArvore';
	import { recursivaPegarTodosDescendentes } from './recursivaPegarTodosDescendentes';
	import { remotaApagar } from './remotas/remotaApagar.remote';
	import { remotaCriarCategoria } from './remotas/remotaCriarCategoria.remote';
	import { sweetalertCriarCategoria } from './sweetalertCriarCategoria';
	import type { typeCategorias } from './typeCategorias';
	import type { typeGalho } from './typeGalho';

	let { dados }: { dados: typeCategorias } = $props();

	// =========================
	// UI STATE
	// =========================
	const inputs = $state<Record<string, string>>({});
	let pesquisa = $state('');
	let criandoEm = $state<string | null>(null);
	const selecionadas = new SvelteSet<string>();

	// =========================
	// STATE BASE (FLAT - BANCO)
	// =========================
	// svelte-ignore state_referenced_locally
	// eslint-disable-next-line svelte/prefer-writable-derived
	let categorias = $state(structuredClone(dados));

	$effect(() => {
		categorias = structuredClone(dados);
	});

	// =========================
	// ÁRVORE DERIVADA
	// =========================
	const derivedArvore = $derived(() => funcaoMontarArvore(categorias));

	// =========================
	// MAPA DERIVADO
	// =========================
	const derivedMapa = $derived(() => {
		const mapa = new SvelteMap<string, typeGalho>();
		function funcaoMapear(galho: typeGalho) {
			mapa.set(galho.idCategorias, galho);
			for (const f of galho.filhos) funcaoMapear(f);
		}
		for (const r of derivedArvore()) funcaoMapear(r);
		return mapa;
	});

	// =========================
	// HELPERS FLAT
	// =========================
	function recursivaColetarIdsDosFilhos(galho: typeGalho): string[] {
		return [galho.idCategorias, ...galho.filhos.flatMap(recursivaColetarIdsDosFilhos)];
	}

	// =========================
	// CHECKBOX
	// =========================
	function recursivaAtualizarPais(galho: typeGalho) {
		if (!galho.keyCategoriasPai) return;
		const pai = derivedMapa().get(galho.keyCategoriasPai);
		if (!pai) return;
		const algum = pai.filhos.some((aux) => selecionadas.has(aux.idCategorias));
		if (algum) {
			selecionadas.add(pai.idCategorias);
		} else {
			selecionadas.delete(pai.idCategorias);
		}
		recursivaAtualizarPais(pai);
	}

	function funcaoCheckbox(id: string) {
		const galho = derivedMapa().get(id);
		if (!galho) return;
		const marcado = selecionadas.has(id);
		if (marcado) {
			selecionadas.delete(id);
			for (const d of recursivaPegarTodosDescendentes(galho)) {
				selecionadas.delete(d);
			}
		} else {
			selecionadas.add(id);
		}
		recursivaAtualizarPais(galho);
	}

	// =========================
	// INPUTS
	// =========================
	function funcaoSetInput(id: string, value: string) {
		inputs[id] = value;
	}

	function funcaoGetInput(id: string) {
		return inputs[id] ?? '';
	}

	function funcaoIniciarCriacao(id: string) {
		criandoEm = id;
		inputs[id] = '';
	}

	function funcaoCancelarCriacao() {
		if (criandoEm) delete inputs[criandoEm];
		criandoEm = null;
	}

	// =========================
	// CRIAR
	// =========================
	async function funcaoCriarSubcategoria(idPai: string) {
		const nome = inputs[idPai]?.trim();
		if (!nome) return;

		const inserido = await remotaCriarCategoria({
			campoNome: nome,
			keyCategoriasPai: idPai,
			idCategorias: undefined,
		});

		// FLAT UPDATE
		categorias = [inserido, ...categorias];

		criandoEm = null;
		delete inputs[idPai];
	}

	// =========================
	// APAGAR
	// =========================

	async function funcaoApagar(galho: typeGalho) {
		const apagado = await remotaApagar({
			idCategorias: galho.idCategorias,
			campoNome: galho.campoNome,
			keyCategoriasPai: galho.keyCategoriasPai,
		});
		categorias = categorias.filter((aux) => aux.idCategorias !== apagado.idCategorias);
		for (const id of recursivaColetarIdsDosFilhos(galho)) {
			selecionadas.delete(id);
		}
	}

	// =========================
	// FILTRO
	// =========================
	function filtrar(galho: typeGalho, texto: string): typeGalho | null {
		if (!texto) return galho;
		const match = galho.campoNome.toLowerCase().includes(texto.toLowerCase());
		const filhos = galho.filhos
			.map((f) => filtrar(f, texto))
			.filter((v): v is typeGalho => v !== null);
		if (match || filhos.length) {
			return { ...galho, filhos: filhos };
		}
		return null;
	}

	const derivedArvoreFiltrada = $derived(() => {
		const a = derivedArvore();
		if (!pesquisa) return a;
		return a.map((aux) => filtrar(aux, pesquisa)).filter((aux): aux is typeGalho => aux !== null);
	});
</script>

{#if derivedArvore().length > 0}
	<Input bind:value={pesquisa} placeholder="PESQUISAR CATEGORIA..." />
{/if}

<div class="space-y-4">
	<ul>
		{#if derivedArvoreFiltrada().length === 0}
			<div class="text-center">NENHUMA CATEGORIA ENCONTRADA</div>
		{:else}
			{#each derivedArvoreFiltrada() as galho (galho.idCategorias)}
				<CategoriaTree
					{galho}
					nivel={0}
					{selecionadas}
					{funcaoCheckbox}
					{criandoEm}
					{funcaoIniciarCriacao}
					{funcaoCriarSubcategoria}
					{funcaoApagar}
					{funcaoCancelarCriacao}
					{funcaoGetInput}
					{funcaoSetInput}
				/>
			{/each}
		{/if}
	</ul>

	<Button
		onclick={async () => {
			const digitado = await sweetalertCriarCategoria();
			if (!digitado) return;
			const inserido = await remotaCriarCategoria({
				campoNome: digitado,
				keyCategoriasPai: null,
				idCategorias: undefined,
			});
			categorias = [inserido, ...categorias];
		}}
	>
		+ CRIAR CATEGORIA
	</Button>
</div>

<pre>{JSON.stringify([...selecionadas], null, 2)}</pre>
