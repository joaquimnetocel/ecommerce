<script lang="ts">
	import {
		Card,
		CardContent,
		// CardDescription,
		CardHeader,
		CardTitle,
	} from '$lib/shadcn/componentes/ui/card';
	import { Checkbox } from '$lib/shadcn/componentes/ui/checkbox';
	import { Input } from '$lib/shadcn/componentes/ui/input';
	import { Label } from '$lib/shadcn/componentes/ui/label';
	import { Textarea } from '$lib/shadcn/componentes/ui/textarea';
	import FormularioDeVariantes from './FormularioDeVariantes.svelte';
	import type { typeDados } from './typeDados';

	let { dados }: { dados: typeDados } = $props();
</script>

<Card class="border-slate-700 bg-slate-800 shadow-lg">
	<CardHeader>
		<CardTitle class="text-2xl font-semibold text-white">PRODUTO</CardTitle>
		<!-- <CardDescription class="text-sm text-white">INFORMAÇÕES GERAIS</CardDescription> -->
	</CardHeader>

	<CardContent class="space-y-4">
		<div class="space-y-1">
			<Label class="text-white">NOME:</Label>
			<Input
				autofocus={true}
				bind:value={dados.inputs.formProdutos.campoNome}
				class="border-slate-500 bg-white"
				required
				autocomplete="off"
			/>
			{#if dados.erros.formProdutos?.campoNome !== undefined}
				<div class="text-sm text-red-400">
					{dados.erros.formProdutos?.campoNome}
				</div>
			{/if}
		</div>
		<div class="space-y-1">
			<Label class="text-white">DESCRIÇÃO:</Label>
			<Textarea
				rows={6}
				bind:value={dados.inputs.formProdutos.campoDescricao}
				class="border-slate-500 bg-white"
				autocomplete="off"
			/>
		</div>
		<div class="flex items-center gap-3">
			<Label class="text-white">
				<Checkbox
					bind:checked={dados.inputs.formProdutos.campoAtivo}
					class="border-slate-400 bg-white data-[state=checked]:bg-sky-500"
				/>
				{dados.inputs.formProdutos.campoAtivo ? 'ATIVO' : 'INATIVO'}
			</Label>
		</div>
		<FormularioDeVariantes {dados} />
	</CardContent>
</Card>
