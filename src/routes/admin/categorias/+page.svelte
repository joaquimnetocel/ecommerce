<script lang="ts">
	import { SvelteMap, SvelteSet } from 'svelte/reactivity';
	import CategoriaTree from './CategoriaTree.svelte';
	import { constCategorias } from './constCategorias';
	import { funcaoMontarArvore } from './funcaoMontarArvore';
	import { funcaoPegarTodosDescendentes } from './funcaoPegarTodosDescendentes';
	import type { typeCategoriaArvore } from './typeCategoriaArvore';

	let categorias = $state(funcaoMontarArvore(constCategorias));
	let selecionadas = new SvelteSet<string>();

	let query = $state('');
	let criandoEm = $state<string | null>(null);

	// ✅ REATIVO (corrige seu bug do OK)
	let inputs = $state<Record<string, string>>({});

	const mapa = new SvelteMap<string, typeCategoriaArvore>();

	function indexar(no: typeCategoriaArvore) {
		mapa.set(no.idCategorias, no);
		for (const filho of no.filhas) indexar(filho);
	}

	for (const raiz of categorias) indexar(raiz);

	// -------------------------
	// SELEÇÃO
	// -------------------------
	function atualizarPais(no: typeCategoriaArvore) {
		if (!no.keyCategoriasPai) return;

		const pai = mapa.get(no.keyCategoriasPai);
		if (!pai) return;

		const algumFilhoMarcado = pai.filhas.some((f) => selecionadas.has(f.idCategorias));

		if (algumFilhoMarcado) selecionadas.add(pai.idCategorias);
		else selecionadas.delete(pai.idCategorias);

		atualizarPais(pai);
	}

	function funcaoToggle(id: string) {
		const no = mapa.get(id);
		if (!no) return;

		const estaMarcado = selecionadas.has(id);

		if (estaMarcado) {
			selecionadas.delete(id);

			const descendentes = funcaoPegarTodosDescendentes(no);
			for (const i of descendentes) {
				selecionadas.delete(i);
			}
		} else {
			selecionadas.add(id);
		}

		atualizarPais(no);
	}

	// -------------------------
	// CRIAÇÃO
	// -------------------------
	function iniciarCriacao(idPai: string) {
		criandoEm = idPai;
		inputs[idPai] = '';
	}

	function setInput(id: string, value: string) {
		inputs[id] = value;
	}

	function getInput(id: string) {
		return inputs[id] ?? '';
	}

	function salvarSubcategoria(idPai: string) {
		const nome = inputs[idPai]?.trim();
		if (!nome) return;

		const pai = mapa.get(idPai);
		if (!pai) return;

		const nova: typeCategoriaArvore = {
			idCategorias: crypto.randomUUID(),
			campoNome: nome,
			keyCategoriasPai: idPai,
			filhas: [],
		};

		mapa.set(nova.idCategorias, nova);
		pai.filhas.unshift(nova);

		// pai.filhas.sort((a, b) => a.campoNome.localeCompare(b.campoNome));

		criandoEm = null;
		delete inputs[idPai];
	}

	function cancelarCriacao() {
		if (criandoEm) delete inputs[criandoEm];
		criandoEm = null;
	}

	// -------------------------
	// BUSCA
	// -------------------------
	function filtrarArvore(no: typeCategoriaArvore, query: string): typeCategoriaArvore | null {
		if (!query) return no;

		const match = no.campoNome.toLowerCase().includes(query.toLowerCase());

		const filhas = no.filhas
			.map((f) => filtrarArvore(f, query))
			.filter((n): n is typeCategoriaArvore => n !== null);

		if (match || filhas.length) {
			return { ...no, filhas };
		}

		return null;
	}

	const categoriasFiltradas = $derived(
		query
			? categorias
					.map((r) => filtrarArvore(r, query))
					.filter((n): n is typeCategoriaArvore => n !== null)
			: categorias,
	);
</script>

<!-- SEARCH -->
<input
	type="text"
	bind:value={query}
	placeholder="Pesquisar categoria..."
	class="w-full rounded border px-3 py-2"
/>

<!-- TREE -->
<form class="space-y-4">
	<ul>
		{#each categoriasFiltradas as categoria (categoria.idCategorias)}
			<CategoriaTree
				{categoria}
				nivel={0}
				{selecionadas}
				{funcaoToggle}
				{criandoEm}
				{iniciarCriacao}
				{salvarSubcategoria}
				{cancelarCriacao}
				{getInput}
				{setInput}
			/>
		{/each}
	</ul>

	<button type="submit" class="rounded border px-4 py-2"> Salvar </button>
</form>

<pre>{JSON.stringify([...selecionadas], null, 2)}</pre>
