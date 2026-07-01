<script lang="ts">
	import { resolve } from '$app/paths';
	import LazyImage from '$lib/componentes/compartilhados/LazyImage.svelte';
	import { funcaoFormatarPreco } from '$lib/funcoes/funcaoFormatarPreco';
	import { funcaoAumentarQuantidade } from '$lib/stores/storeCarrinho/actions/funcaoAumentarQuantidade';
	import { funcaoDiminuirQuantidade } from '$lib/stores/storeCarrinho/actions/funcaoDiminuirQuantidade';
	import { funcaoRemoverItem } from '$lib/stores/storeCarrinho/actions/funcaoRemoverItem';
	import { type tipoSchemaItemOutput } from '$lib/stores/storeCarrinho/schemaCarrinho/schemaItem';
	import { Minus, Plus, Trash } from '@lucide/svelte';

	let {
		itemDoCarrinho = $bindable(),
	}: {
		itemDoCarrinho: tipoSchemaItemOutput;
	} = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	class="flex items-center justify-between py-2"
	onclick={(e) => e.stopPropagation()}
	role="group"
>
	<div class="flex gap-6">
		<a
			href={resolve(
				`/produto/${itemDoCarrinho.tabelaProdutos.idProdutos}/${itemDoCarrinho.tabelaProdutos.campoSlug}`,
			)}
			class="block w-32"
			onclick={(e) => {
				e.stopPropagation();
				// cartState.isOpen = false;
			}}
		>
			<LazyImage
				src={itemDoCarrinho.imagem}
				alt={itemDoCarrinho.tabelaProdutos.campoNome}
				class="mr-4 size-36 rounded object-contain"
			/>
		</a>
		<div>
			<a
				class="text-s w-full"
				href={resolve(
					`/produto/${itemDoCarrinho.tabelaProdutos.idProdutos}/${itemDoCarrinho.tabelaProdutos.campoSlug}`,
				)}
			>
				<p class="line-clamp-2 font-medium">{itemDoCarrinho.tabelaProdutos.campoNome}</p>
			</a>
			<p class="text-sm">
				{funcaoFormatarPreco(itemDoCarrinho.tabelaVariantes.campoPreco)}
			</p>

			<div class="mt-2 flex items-center gap-2">
				<div class="flex w-24 items-center justify-center rounded-md border border-gray-200 p-1">
					<button
						onclick={async () => {
							funcaoDiminuirQuantidade({ idVariantes: itemDoCarrinho.tabelaVariantes.idVariantes });
						}}
						class="cursor-pointer rounded-md p-1 hover:bg-[#e9e9ec]"
						aria-label="DIMINUIR 1 UNIDADE"
					>
						<Minus class="size-4" />
					</button>

					<span class="mx-2 w-6 text-center">
						{itemDoCarrinho.quantidade}
					</span>

					<button
						class="cursor-pointer rounded-md p-1 hover:bg-[#e9e9ec]"
						aria-label="AUMENTAR 1 UNIDADE"
						onclick={() => {
							funcaoAumentarQuantidade({
								idVariantes: itemDoCarrinho.tabelaVariantes.idVariantes,
							});
						}}
					>
						<Plus class="size-4" />
					</button>
				</div>

				<button
					class="cursor-pointer px-3 py-1"
					aria-label="REMOVER ITEM"
					onclick={() => {
						funcaoRemoverItem({
							idVariantes: itemDoCarrinho.tabelaVariantes.idVariantes,
						});
					}}
				>
					<Trash class="size-4 text-red-500 hover:text-red-300" />
				</button>
			</div>
		</div>
	</div>
</div>
