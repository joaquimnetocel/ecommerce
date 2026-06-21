<script lang="ts">
	import {
		Card,
		CardContent,
		// CardDescription,
		CardHeader,
		CardTitle,
	} from '$lib/shadcn/componentes/ui/card';
	import type { PageProps } from './$types';
	import Categorias from './_Categorias/Categorias.svelte';

	let { data }: PageProps = $props();
</script>

<Card class="gap-2 bg-slate-200 shadow-md">
	<CardHeader>
		<CardTitle>CATEGORIAS</CardTitle>
		<!-- <CardDescription class="text-sm text-white">INFORMAÇÕES GERAIS</CardDescription> -->
	</CardHeader>

	<CardContent class="space-y-4">
		<Categorias dados={data.lido} />
	</CardContent>
</Card>
