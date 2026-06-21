<script lang="ts">
	import { Button } from '$lib/shadcn/componentes/ui/button';
	import { Input } from '$lib/shadcn/componentes/ui/input';
	import { SvelteMap, SvelteSet } from 'svelte/reactivity';
	import CategoriaTree from './CategoriaTree.svelte';
	import { funcaoMontarArvore } from './funcaoMontarArvore';
	import { funcaoPegarTodosDescendentes } from './funcaoPegarTodosDescendentes';
	import { remotaApagar } from './remotas/remotaApagar.remote';
	import { remotaCriarCategoria } from './remotas/remotaCriarCategoria.remote';
	import { sweetalertCriarCategoria } from './sweetalertCriarCategoria';
	import type { typeGalho } from './typeGalho';
	import type { typeLido } from './typeLido';

	let { dados }: { dados: typeLido } = $props();

	// svelte-ignore state_referenced_locally
	// eslint-disable-next-line svelte/prefer-writable-derived
	let arvore = $state<typeGalho[]>(funcaoMontarArvore(dados));
	const inputs = $state<Record<string, string>>({});
	let pesquisa = $state('');
	let criandoEm = $state<string | null>(null);
	const selecionadas = new SvelteSet<string>();
	const mapa = new SvelteMap<string, typeGalho>();

	$effect(() => {
		arvore = funcaoMontarArvore(dados);
	});

	$effect(() => {
		mapa.clear();
		for (const galho of arvore) {
			funcaoMapear(galho);
		}
	});

	function funcaoMapear(galho: typeGalho) {
		mapa.set(galho.idCategorias, galho);
		for (const filho of galho.filhas) funcaoMapear(filho);
	}

	function funcaoAtualizarPais(galho: typeGalho) {
		if (!galho.keyCategoriasPai) return;
		const galhoPai = mapa.get(galho.keyCategoriasPai);
		if (!galhoPai) return;
		const algumFilhoMarcado = galhoPai.filhas.some((par) => selecionadas.has(par.idCategorias));
		if (algumFilhoMarcado) {
			selecionadas.add(galhoPai.idCategorias);
		} else {
			selecionadas.delete(galhoPai.idCategorias);
		}
		funcaoAtualizarPais(galhoPai);
	}

	function funcaoCheckbox(parId: string) {
		const galho = mapa.get(parId);
		if (!galho) return;
		const estaMarcado = selecionadas.has(parId);
		if (estaMarcado) {
			selecionadas.delete(parId);

			const descendentes = funcaoPegarTodosDescendentes(galho);
			for (const i of descendentes) {
				selecionadas.delete(i);
			}
		} else {
			selecionadas.add(parId);
		}

		funcaoAtualizarPais(galho);
	}

	function funcaoIniciarCriacao(idPai: string) {
		criandoEm = idPai;
		inputs[idPai] = '';
	}

	function funcaoCancelarCriacao() {
		if (criandoEm) delete inputs[criandoEm];
		criandoEm = null;
	}

	function funcaoSetInput(id: string, value: string) {
		inputs[id] = value;
	}

	function funcaoGetInput(id: string) {
		return inputs[id] ?? '';
	}

	async function funcaoCriarSubcategoria(idPai: string) {
		const nomeDaNovaCategoria = inputs[idPai]?.trim();
		if (!nomeDaNovaCategoria) return;
		const pai = mapa.get(idPai);
		if (!pai) return;
		const inserido = await remotaCriarCategoria({
			campoNome: nomeDaNovaCategoria,
			keyCategoriasPai: idPai,
			idCategorias: undefined,
		});
		const novoGalho: typeGalho = {
			...inserido,
			filhas: [],
		};
		mapa.set(novoGalho.idCategorias, novoGalho);
		pai.filhas.unshift(novoGalho);

		// pai.filhas.sort((a, b) => a.campoNome.localeCompare(b.campoNome));

		criandoEm = null;
		delete inputs[idPai];
	}

	function removerDoMapa(galho: typeGalho) {
		mapa.delete(galho.idCategorias);
		for (const filho of galho.filhas) {
			removerDoMapa(filho);
		}
	}

	function funcaoRemoverDaArvore({
		parArvore,
		parId,
	}: {
		parArvore: typeGalho[];
		parId: string;
	}): typeGalho[] {
		return parArvore
			.filter((par) => par.idCategorias !== parId)
			.map((par) => ({
				...par,
				filhas: funcaoRemoverDaArvore({
					parArvore: par.filhas,
					parId,
				}),
			}));
	}

	function funcaoColetarIdsDosFilhos(galho: typeGalho): string[] {
		let ids = [galho.idCategorias];
		for (const filho of galho.filhas) {
			ids.push(...funcaoColetarIdsDosFilhos(filho));
		}
		return ids;
	}

	async function funcaoApagar(galho: typeGalho) {
		const apagado = await remotaApagar({
			idCategorias: galho.idCategorias,
			campoNome: galho.campoNome,
			keyCategoriasPai: galho.keyCategoriasPai,
		});
		removerDoMapa(galho);
		arvore = funcaoRemoverDaArvore({
			parArvore: arvore,
			parId: apagado.idCategorias,
		});
		for (const id of funcaoColetarIdsDosFilhos(galho)) {
			selecionadas.delete(id);
		}
	}

	function filtrarArvore(galho: typeGalho, pesquisa: string): typeGalho | null {
		if (!pesquisa) return galho;
		const match = galho.campoNome.toLowerCase().includes(pesquisa.toLowerCase());
		const filhas = galho.filhas
			.map((par) => filtrarArvore(par, pesquisa))
			.filter((par): par is typeGalho => par !== null);
		if (match || filhas.length) {
			return { ...galho, filhas };
		}
		return null;
	}

	const derivedCategoriasFiltradas = $derived(
		pesquisa
			? arvore
					.map((par) => filtrarArvore(par, pesquisa))
					.filter((par): par is typeGalho => par !== null)
			: arvore,
	);
</script>

{#if arvore.length > 0}
	<Input
		bind:value={pesquisa}
		placeholder="PESQUISAR CATEGORIA..."
		class="classeCard2Input mb-5 w-full rounded border px-3 py-2"
	/>
{/if}

<div class="space-y-4">
	<ul>
		{#if derivedCategoriasFiltradas.length === 0}
			<div class="space-y-4 text-center">
				<div class="text-white">NENHUMA CATEGORIA ENCONTRADA</div>
				{#if arvore.length === 0}
					<div>
						<Button class="cursor-pointer">+ CRIAR PRIMEIRA CATEGORIA</Button>
					</div>
				{/if}
			</div>
		{:else}
			{#each derivedCategoriasFiltradas as categoria (categoria.idCategorias)}
				<CategoriaTree
					{categoria}
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

	<!-- <Button class="mt-2 cursor-pointer rounded border px-4 py-2">SALVAR</Button> -->
	<Button
		onclick={async () => {
			const nomeDaNovaCategoria = await sweetalertCriarCategoria();
			if (nomeDaNovaCategoria === null) {
				return;
			}
			const inserido = await remotaCriarCategoria({
				campoNome: nomeDaNovaCategoria,
				keyCategoriasPai: null,
				idCategorias: undefined,
			});
			const novoGalho: typeGalho = {
				...inserido,
				filhas: [],
			};
			mapa.set(novoGalho.idCategorias, novoGalho);
			arvore.unshift(novoGalho);
		}}
		class="cursor-pointer">+ CRIAR CATEGORIA</Button
	>
</div>

<pre>{JSON.stringify([...selecionadas], null, 2)}</pre>
<!-- <pre>{JSON.stringify(arvore, null, 2)}</pre> -->
