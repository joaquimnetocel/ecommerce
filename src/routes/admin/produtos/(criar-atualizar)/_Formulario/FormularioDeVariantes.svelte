<script lang="ts">
	import Collapsible from '$lib/componentes/baseadosEmShadcn/Collapsible.svelte';
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

<Card class=" bg-slate-700 shadow-md">
	<CardHeader>
		<div class="flex items-center justify-between">
			<div>
				<CardTitle class="text-2xl font-semibold text-white">VARIANTES</CardTitle>
				<CardDescription class="text-white">
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

	<CardContent class="space-y-3">
		{#each variantesRenderizadas as corrente (corrente.estado.id)}
			<div transition:slide>
				<Collapsible bind:open={corrente.estado.open}>
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
										class="bg-white"
										type="string"
										step="0.01"
										bind:value={corrente.variante.campoPreco}
									/>
									{#if dados.erros.formVariantes?.[corrente.contadorOriginal]?.campoPreco !== undefined}
										<div class="text-sm text-red-400">
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
										class="bg-white"
									/>
								</div>
							</div>

							<div class="flex items-center gap-3">
								<Label>
									<Checkbox
										class="border-slate-400 bg-white data-[state=checked]:bg-sky-500"
										bind:checked={corrente.variante.campoAtivo}
									/>
									{corrente.variante.campoAtivo ? 'VARIANTE ATIVA' : 'VARIANTE INATIVA'}
								</Label>
							</div>

							<Card class=" border-4 border-slate-700 bg-slate-300 shadow-md">
								<CardHeader>
									<div class="flex items-center justify-between">
										<div>
											<CardTitle>ATRIBUTOS</CardTitle>
											<!-- <p class="text-white">
												Cada variante possui SKU, preço, estoque e atributos próprios.
											</p> -->
										</div>

										<Button type="button" variant="outline">ADICIONAR ATRIBUTO</Button>
									</div>
								</CardHeader>
								<CardContent>
									<div class="grid gap-4 space-y-4 md:grid-cols-2">
										<div class="space-y-2">
											<Label for="atributo-1-nome">Nome do atributo</Label>

											<Input id="atributo-1-nome" placeholder="COR" class="bg-white" />
										</div>

										<div class="space-y-2">
											<Label for="atributo-1-valor">Valor</Label>

											<Input id="atributo-1-valor" placeholder="AZUL" class="bg-white" />
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					{/snippet}
				</Collapsible>
			</div>
		{/each}
	</CardContent>
</Card>
