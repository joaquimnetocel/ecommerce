<script lang="ts">
	import Categorias from '$lib/componentes/FormularioDeCategorias/FormularioDeCategorias.svelte';
	import { funcaoCriarCategoria } from '$lib/componentes/FormularioDeCategorias/store/funcaoCriarCategoria';
	import { store } from '$lib/componentes/FormularioDeCategorias/store/store.svelte';
	import Button from '$lib/shadcn/componentes/ui/button/button.svelte';
	import {
		Card,
		CardContent,
		// CardDescription,
		CardHeader,
		CardTitle,
	} from '$lib/shadcn/componentes/ui/card';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Card class="gap-2 bg-slate-200 shadow-md">
	<CardHeader>
		<div class="flex items-center justify-between">
			<CardTitle>CATEGORIAS</CardTitle>
			<!-- <CardDescription class="text-sm text-white">INFORMAÇÕES GERAIS</CardDescription> -->
			<Button onclick={funcaoCriarCategoria}>CRIAR CATEGORIA</Button>
		</div>
	</CardHeader>

	<CardContent class="space-y-4">
		<Categorias dados={data.lido} verCheckboxes={true} />
	</CardContent>
</Card>

<pre>{JSON.stringify([...store.selecionadas], null, 2)}</pre>
