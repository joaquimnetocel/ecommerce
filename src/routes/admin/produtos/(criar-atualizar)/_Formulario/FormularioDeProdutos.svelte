<script lang="ts">
	import FormularioDeCategorias from '$lib/componentes/FormularioDeCategorias/FormularioDeCategorias.svelte';
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

<Card class="classeCard1">
	<CardHeader>
		<CardTitle class="classeCard1Titulo">PRODUTO</CardTitle>
		<!-- <CardDescription class="text-sm text-white">INFORMAÇÕES GERAIS</CardDescription> -->
	</CardHeader>

	<CardContent class="space-y-4">
		<div class="space-y-1">
			<Label class="classeCard1Label">NOME:</Label>
			<Input
				autofocus={true}
				bind:value={dados.inputs.formProdutos.campoNome}
				class="classeCard1Input"
				required
				autocomplete="off"
			/>
			{#if dados.erros.formProdutos?.campoNome !== undefined}
				<div class="classeCard1Erro">
					{dados.erros.formProdutos?.campoNome}
				</div>
			{/if}
		</div>
		<div class="space-y-1">
			<Label class="classeCard1Label">DESCRIÇÃO:</Label>
			<Textarea
				rows={6}
				bind:value={dados.inputs.formProdutos.campoDescricao}
				class="classeCard1Input"
				autocomplete="off"
			/>
		</div>
		<div class="flex items-center gap-3">
			<Label class="classeCard1Label">
				<Checkbox bind:checked={dados.inputs.formProdutos.campoAtivo} class="classeCard1Checkbox" />
				{dados.inputs.formProdutos.campoAtivo ? 'ATIVO' : 'INATIVO'}
			</Label>
		</div>
		<FormularioDeVariantes {dados} />
		<FormularioDeCategorias
			marcadas={dados.inputs.formCategorias}
			dados={dados.categorias}
			apenasMarcadas={true}
			verCheckboxes={true}
		/>
	</CardContent>
</Card>
