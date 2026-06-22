<script lang="ts">
	import Categorias from '$lib/componentes/Categorias/Categorias.svelte';
	import { store } from '$lib/componentes/Categorias/store/store.svelte';
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
		<CardTitle>CATEGORIAS</CardTitle>
		<!-- <CardDescription class="text-sm text-white">INFORMAÇÕES GERAIS</CardDescription> -->
	</CardHeader>

	<CardContent class="space-y-4">
		<Categorias dados={data.lido} verCheckboxes={true} />
	</CardContent>
</Card>

<pre>{JSON.stringify([...store.selecionadas], null, 2)}</pre>
