<script lang="ts">
	import { PUBLIC_LOJA, PUBLIC_URL_DE_IMAGENS } from '$env/static/public';
	import { Button } from '$lib/shadcn/componentes/ui/button/index.js';
	import { ArrowLeft, ArrowRight, CloudUpload, X } from '@lucide/svelte';
	import Swal from 'sweetalert2';
	import type { typeDados } from '../typeDados';
	import { funcaoImagemExiste } from './funcaoImagemExiste';

	let { caminhoNoServidor, dados }: { caminhoNoServidor: string; dados: typeDados } = $props();

	type tipoImagem = {
		id: string;
		nome: string;
		tamanho: number;
		tipo: string;
		ordem: number;
		preview: string;
	};

	// svelte-ignore state_referenced_locally
	const constImagems: tipoImagem[] = dados.inputs.formImagens.map((current) => {
		return {
			id: crypto.randomUUID(),
			nome: current.campoNome,
			ordem: current.campoOrdem,
			tamanho: current.campoTamanho,
			tipo: current.campoTipo,
			preview: `${PUBLIC_URL_DE_IMAGENS}/externos/${PUBLIC_LOJA}/${caminhoNoServidor}/${current.campoNome}`,
		};
	});

	let imagens = $state<tipoImagem[]>(constImagems);
	let fileInput = $state<HTMLInputElement>();

	$effect(() => {
		dados.inputs.formImagens = imagens.map((corrente) => {
			return {
				campoNome: corrente.nome,
				campoOrdem: corrente.ordem,
				campoTamanho: corrente.tamanho,
				campoTipo: corrente.tipo,
			};
		});
	});

	// Garante que o array físico fique ordenado sequencialmente por índice
	function normalizarOrdens(lista: tipoImagem[]): tipoImagem[] {
		return lista.map((img, index) => ({
			...img,
			ordem: index,
		}));
	}

	async function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target.files;

		if (files) {
			const promisesDeImagensExistentes = Array.from(files).map(async (file) => {
				return await funcaoImagemExiste(
					`${PUBLIC_URL_DE_IMAGENS}/externos/${PUBLIC_LOJA}/${caminhoNoServidor}/${file.name}`,
				);
			});
			const arrayResultadosDasPromises = await Promise.all(promisesDeImagensExistentes);
			const todasImagensExistem = arrayResultadosDasPromises.every((existe) => existe === true);

			if (todasImagensExistem === false) {
				Swal.fire({
					title: 'IMAGEM NÃO EXISTE!',
					text: `ALGUMA IMAGEM SELECIONADA NÃO EXISTE NO SERVIDOR.`,
					icon: 'error',
					confirmButtonText: 'Entendido',
					confirmButtonColor: '#3085d6',
				});
				if (fileInput) fileInput.value = '';
				return;
			}

			const proximaOrdemInicial = imagens.length;

			const novasImagens: tipoImagem[] = Array.from(files).map((file, index) => ({
				id: crypto.randomUUID(),
				preview: URL.createObjectURL(file),
				nome: file.name,
				tamanho: file.size,
				tipo: file.type,
				ordem: proximaOrdemInicial + index,
			}));

			imagens = normalizarOrdens([...imagens, ...novasImagens]);
		}

		if (fileInput) fileInput.value = '';
	}

	function removerImagem(id: string, previewUrl: string) {
		const listaFiltrada = imagens.filter((img) => img.id !== id);
		imagens = normalizarOrdens(listaFiltrada);

		URL.revokeObjectURL(previewUrl);
	}

	function moverEsquerda(index: number) {
		if (index === 0) return;
		const novaLista = [...imagens];

		// Inverte os elementos de lugar
		const temp = novaLista[index];
		novaLista[index] = novaLista[index - 1];
		novaLista[index - 1] = temp;

		imagens = normalizarOrdens(novaLista);
	}

	function moverDireita(index: number) {
		if (index === imagens.length - 1) return;
		const novaLista = [...imagens];

		// Inverte os elementos de lugar
		const temp = novaLista[index];
		novaLista[index] = novaLista[index + 1];
		novaLista[index + 1] = temp;

		imagens = normalizarOrdens(novaLista);
	}
</script>

<div class="mx-auto w-full max-w-2xl rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
	<h3 class="mb-1 text-lg font-semibold">FOTOS DO PRODUTO</h3>
	<p class="mb-4 text-sm text-muted-foreground">
		Selecione até as imagens que farão parte da galeria. Organize a ordem usando as setas.
	</p>

	<input
		type="file"
		accept="image/*"
		multiple
		bind:this={fileInput}
		onchange={handleFileChange}
		class="hidden"
	/>

	<button
		type="button"
		onclick={() => fileInput?.click()}
		class="group flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/20 py-8 transition-all hover:border-primary/50 hover:bg-muted/50"
	>
		<div class="rounded-full bg-muted p-3 transition-transform group-hover:scale-105">
			<CloudUpload class="h-5 w-5 text-muted-foreground group-hover:text-primary" />
		</div>
		<div class="text-center">
			<p class="text-sm font-medium">Clique para selecionar várias fotos</p>
			<p class="mt-0.5 text-xs text-muted-foreground">
				Você pode selecionar múltiplos arquivos de uma vez
			</p>
		</div>
	</button>

	{#if imagens.length > 0}
		<div class="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4">
			{#each imagens as img, i (img.id)}
				<div
					class="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-lg border bg-muted"
				>
					<img
						src={img.preview}
						alt="Preview do produto"
						class="h-full w-full object-cover transition-transform group-hover:scale-105"
					/>

					<div
						class="absolute top-1 right-1 z-10 opacity-0 transition-opacity group-hover:opacity-100"
					>
						<Button
							size="icon"
							variant="destructive"
							class="h-6 w-6 rounded-md shadow-md"
							onclick={() => removerImagem(img.id, img.preview)}
						>
							<X class="h-3 w-3" />
						</Button>
					</div>

					<div
						class="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-black/60 p-1 opacity-0 transition-opacity group-hover:opacity-100"
					>
						<Button
							size="icon"
							variant="secondary"
							class="h-6 w-6 disabled:opacity-30"
							disabled={i === 0}
							onclick={() => moverEsquerda(i)}
						>
							<ArrowLeft class="h-3 w-3" />
						</Button>

						<span class="rounded bg-primary/80 px-1.5 text-[10px] font-bold text-white">
							Ordem: {img.ordem + 1}
						</span>

						<Button
							size="icon"
							variant="secondary"
							class="h-6 w-6 disabled:opacity-30"
							disabled={i === imagens.length - 1}
							onclick={() => moverDireita(i)}
						>
							<ArrowRight class="h-3 w-3" />
						</Button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<!-- <pre>
    {JSON.stringify(imagens, null, 2)}
</pre> -->
