<script lang="ts">
	import { Button } from '$lib/shadcn/componentes/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from '$lib/shadcn/componentes/ui/card';
	import { Checkbox } from '$lib/shadcn/componentes/ui/checkbox';
	import { Input } from '$lib/shadcn/componentes/ui/input';
	import { Label } from '$lib/shadcn/componentes/ui/label';
	import { slide } from 'svelte/transition';
	import CollapsibleDaVariante from './CollapsibleDaVariante.svelte';
	import FormularioDeAtributos from './FormularioDeAtributos.svelte';
	import type { typeDados } from './typeDados';

	let { dados }: { dados: typeDados } = $props();

	// svelte-ignore state_referenced_locally (NÃO TEM PROBLEMA POIS COMPONENTE ESTÁ ENVOLVIDO POR {#key})
	let estadosParaEach = $state(
		dados.inputs.formVariantes.map((_, contador) => ({
			id: crypto.randomUUID(),
			open: contador === 0 && dados.inputs.formVariantes.length === 1,
		})),
	);

	const variantesRenderizadas = $derived(
		dados.inputs.formVariantes
			.map((variante, contadorOriginal) => ({
				estado: estadosParaEach[contadorOriginal],
				variante,
				contadorOriginal,
			}))
			.reverse(),
	);
</script>

<Card class=" classeCard2">
	<CardHeader>
		<div class="flex items-center justify-between">
			<div>
				<CardTitle class="classeCard2Titulo">VARIANTES</CardTitle>
				<CardDescription class="classeCard2Descricao">
					Cada variante possui SKU, preço, estoque e atributos próprios.
				</CardDescription>
			</div>
			<Button
				onclick={() => {
					dados.inputs.formVariantes.push({
						campoAtivo: true,
						campoEstoque: 1,
						campoPreco: '0.00',
						idVariantes: undefined,
						campoAtributos: {},
					});
					estadosParaEach.push({
						id: crypto.randomUUID(),
						open: true,
					});
				}}
				class="cursor-pointer"
				variant="outline">CRIAR VARIANTE</Button
			>
		</div>
	</CardHeader>

	<CardContent class="space-y-3 ">
		{#each variantesRenderizadas as corrente (corrente.estado.id)}
			<div transition:slide>
				<CollapsibleDaVariante bind:open={corrente.estado.open}>
					{#snippet trigger()}
						<div class="flex w-full items-center justify-between">
							<div>
								<div class="font-medium">
									Variante #{corrente.contadorOriginal + 1} -
									{corrente.variante.idVariantes
										? dados.lido?.relVariantes[corrente.contadorOriginal]?.campoSku
										: '(sku a ser gerado)'}
								</div>
								<div class="text-xs text-muted-foreground">Clique para expandir</div>
							</div>
							{#if corrente.contadorOriginal === 0}
								<div>VARIANTE PADRÃO</div>
							{:else if corrente.variante.idVariantes === undefined}
								<div class="flex justify-end">
									<Button
										onclick={() => {
											dados.inputs.formVariantes.splice(corrente.contadorOriginal, 1);
											estadosParaEach.splice(corrente.contadorOriginal, 1);
										}}
										variant="destructive"
										class="cursor-pointer"
									>
										REMOVER VARIANTE
									</Button>
								</div>
							{:else}
								<div>VARIANTE SALVA</div>
							{/if}
						</div>
					{/snippet}

					{#snippet content()}
						<div class="space-y-4 py-2">
							<div class="grid gap-x-4 md:grid-cols-2">
								<div class="space-y-2">
									<Label>PREÇO</Label>
									<Input
										autocomplete="off"
										class="classeCard2Input"
										type="string"
										step="0.01"
										bind:value={corrente.variante.campoPreco}
									/>
									{#if dados.erros.formVariantes?.[corrente.contadorOriginal]?.campoPreco !== undefined}
										<div class="classeCard2Erro">
											{dados.erros.formVariantes?.[corrente.contadorOriginal]?.campoPreco}
										</div>
									{/if}
								</div>

								<div class="space-y-2">
									<Label>ESTOQUE</Label>
									<Input
										autocomplete="off"
										bind:value={corrente.variante.campoEstoque}
										type="number"
										name="campoEstoque"
										class="classeCard2Input"
									/>
								</div>
							</div>

							<div class="flex items-center gap-3">
								<Label>
									<Checkbox
										class="classeCard2Checkbox"
										bind:checked={corrente.variante.campoAtivo}
									/>
									{corrente.variante.campoAtivo ? 'VARIANTE ATIVA' : 'VARIANTE INATIVA'}
								</Label>
							</div>

							<!-- NECESSÁRIO O KEY PARA RECRIAR O ESTADO INTERNO DO COMPONENTE -->
							{#key corrente.estado.id}
								<FormularioDeAtributos bind:campoAtributos={corrente.variante.campoAtributos} />
							{/key}
						</div>
					{/snippet}
				</CollapsibleDaVariante>
			</div>
		{/each}
	</CardContent>
</Card>
