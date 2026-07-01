<script lang="ts">
	import { Button } from '$lib/shadcn/componentes/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/shadcn/componentes/ui/card';
	import { Input } from '$lib/shadcn/componentes/ui/input';
	import { Label } from '$lib/shadcn/componentes/ui/label';
	import { slide } from 'svelte/transition';
	import Swal from 'sweetalert2';

	let {
		campoAtributos = $bindable(),
	}: {
		campoAtributos: Record<string, string>;
	} = $props();

	let arrayAtributos = $state(
		Object.entries(campoAtributos).map(([chave, valor]) => ({
			id: crypto.randomUUID(),
			chave,
			valor,
		})),
	);

	$effect(() => {
		campoAtributos = Object.fromEntries(arrayAtributos.map((a) => [a.chave, a.valor]));
	});

	function chaveDuplicada(chave: string, id: string) {
		const chaveNormalizada = chave.trim();

		if (!chaveNormalizada) {
			return false;
		}

		return arrayAtributos.some((a) => a.id !== id && a.chave.trim() === chaveNormalizada);
	}
</script>

<Card class="classeCard4">
	<CardHeader>
		<div class="flex items-center justify-between">
			<div>
				<CardTitle class="classeCard4Titulo">ATRIBUTOS</CardTitle>
				<!-- <p class="text-white">
					Cada variante possui SKU, preço, estoque e atributos próprios.
				</p> -->
			</div>
			<!-- {#if arrayAtributos.every((par) => {
				return par.chave.trim() !== '' && par.valor.trim() !== '';
			})} -->
			<Button
				class="cursor-pointer"
				onclick={() => {
					const temAlgumNaoPreenchido = arrayAtributos.some((par) => {
						return par.chave.trim() === '' || par.valor.trim() === '';
					});
					if (temAlgumNaoPreenchido) {
						Swal.fire({
							icon: 'warning',
							text: 'Preencha primeiro os atributos atuais para então adicionar novos atributos.',
						});
						return;
					}
					arrayAtributos.unshift({
						id: crypto.randomUUID(),
						chave: '',
						valor: '',
					});
				}}
				type="button"
				variant="outline">ADICIONAR ATRIBUTO</Button
			>
			<!-- {/if} -->
		</div>
	</CardHeader>
	<CardContent>
		<div class="space-y-4">
			{#each arrayAtributos as atributoCorrente (atributoCorrente.id)}
				<div transition:slide class="flex items-center gap-4">
					<div class="flex-1 space-y-2">
						<Label class="classeCard4Label">ATRIBUTO</Label>
						<Input
							bind:value={atributoCorrente.chave}
							placeholder="Ex: COR, TAMANHO, ..."
							class="classeCard4Input"
							oninput={(e) => {
								// Apenas transforma em maiúsculo enquanto digita
								atributoCorrente.chave = e.currentTarget.value.toUpperCase();
							}}
							onchange={() => {
								const valorlimpo = atributoCorrente.chave.trim();

								// Valida se ficou duplicado ao terminar de editar
								if (chaveDuplicada(valorlimpo, atributoCorrente.id)) {
									Swal.fire({
										icon: 'warning',
										text: 'Já existe um atributo com esse nome.',
									});
									atributoCorrente.chave = ''; // Limpa o campo duplicado
									return;
								}

								atributoCorrente.chave = valorlimpo;
							}}
						/>
					</div>

					<div class="flex-1 space-y-2">
						<Label class="classeCard4Label">VALOR</Label>
						<Input
							bind:value={atributoCorrente.valor}
							placeholder="Ex: AZUL, P, M, G, ..."
							class="classeCard4Input"
							oninput={(e) => {
								atributoCorrente.valor = e.currentTarget.value.toUpperCase();
							}}
							onchange={() => {
								atributoCorrente.valor = atributoCorrente.valor.trim();
							}}
						/>
					</div>
					<div>
						<div>&nbsp;</div>
						{#if arrayAtributos.length > 1}
							<Button
								onclick={() => {
									arrayAtributos = arrayAtributos.filter((par) => par.id !== atributoCorrente.id);
								}}
								variant="destructive"
								class="cursor-pointer"
							>
								REMOVER ATRIBUTO
							</Button>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</CardContent>
</Card>
