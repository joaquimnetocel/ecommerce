<script lang="ts">
	import { SvelteMap, SvelteSet } from 'svelte/reactivity';
	import CategoriaTree from './CategoriaTree.svelte';
	import { constCategorias } from './constCategorias';
	import { funcaoMontarArvore } from './funcaoMontarArvore';
	import { funcaoPegarTodosDescendentes } from './funcaoPegarTodosDescendentes';
	import type { typeCategoriaArvore } from './typeCategoriaArvore';

	let categorias = funcaoMontarArvore(constCategorias);
	let selecionadas = new SvelteSet<string>();

	// MAPA GLOBAL (id -> nó)
	const mapa = new SvelteMap<string, typeCategoriaArvore>();

	function indexar(no: typeCategoriaArvore) {
		mapa.set(no.idCategorias, no);
		for (const filho of no.filhas) {
			indexar(filho);
		}
	}

	for (const raiz of categorias) {
		indexar(raiz);
	}

	function atualizarPais(no: typeCategoriaArvore) {
		if (!no.keyCategoriasPai) return;

		const pai = mapa.get(no.keyCategoriasPai);
		if (!pai) return;

		const algumFilhoMarcado = pai.filhas.some((f) => selecionadas.has(f.idCategorias));

		if (algumFilhoMarcado) {
			selecionadas.add(pai.idCategorias);
		} else {
			selecionadas.delete(pai.idCategorias);
		}

		atualizarPais(pai);
	}

	function funcaoToggle(id: string) {
		const no = mapa.get(id);
		if (!no) return;

		const estaMarcado = selecionadas.has(id);

		// =========================
		// 🔽 DESMARCAR → limpa subárvore
		// =========================
		if (estaMarcado) {
			selecionadas.delete(id);

			const descendentes = funcaoPegarTodosDescendentes(no);
			for (const i of descendentes) {
				selecionadas.delete(i);
			}
		}

		// =========================
		// 🔼 MARCAR → só marca ele (SEM filhos)
		// =========================
		else {
			selecionadas.add(id);
		}

		// =========================
		// 🔼 SEMPRE recalcula pais
		// =========================
		atualizarPais(no);
	}
</script>

<form class="space-y-4">
	<ul>
		{#each categorias as categoria (categoria.idCategorias)}
			<CategoriaTree {categoria} nivel={0} {selecionadas} {funcaoToggle} />
		{/each}
	</ul>

	<button type="submit" class="rounded border px-4 py-2"> Salvar </button>
</form>

<pre>{JSON.stringify([...selecionadas], null, 2)}</pre>
