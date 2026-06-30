<script lang="ts">
	// import { funcaoGerarSku } from '$lib/funcoes/funcaoGerarSku';
	import { funcaoGerarSlug } from '$lib/funcoes/funcaoGerarSlug';
	import { funcaoAdicionarItem } from '$lib/stores/storeCarrinho/actions/funcaoAdicionarItem';
	import { funcaoAumentarQuantidade } from '$lib/stores/storeCarrinho/actions/funcaoAumentarQuantidade';
	import { funcaoDiminuirQuantidade } from '$lib/stores/storeCarrinho/actions/funcaoDiminuirQuantidade';
	import { funcaoRemoverItem } from '$lib/stores/storeCarrinho/actions/funcaoRemoverItem';
	import {
		derivedPrecoTotalSemDesconto,
		derivedQuantidadeTotalNocarrinho,
	} from '$lib/stores/storeCarrinho/deriveds.svelte';
	import { storeCarrinho } from '$lib/stores/storeCarrinho/storeCarrinho.svelte';

	const idVariantes = '4f3a9b2c-1d5e-4b7f-a9c8-2e1d0f3a4b5c'; //crypto.randomUUID();
	const idProdutos = '4f3a9b2c-1d5e-4b7f-a9c8-2e1d0f3a4b5c'; //crypto.randomUUID();
	const campoSku = 'aa'; //funcaoGerarSku();
</script>

<button
	onclick={() => {
		funcaoAdicionarItem({
			novoItem: {
				tabelaVariantes: {
					idVariantes,
					campoEstoque: 5,
					campoPreco: 3500,
					campoPrecoCheio: 3500,
					campoSku,
				},
				tabelaProdutos: {
					campoNome: 'Notebook Dell',
					campoSlug: funcaoGerarSlug('Notebook Dell'),
					idProdutos: idProdutos,
				},
				imagem: '/notebook.jpg',
				quantidade: 1,
			},
		});
	}}
>
	Adicionar notebook
</button>

<hr />

{#if storeCarrinho.itens.length === 0}
	<p>Carrinho vazio</p>
{:else}
	{#each storeCarrinho.itens as item (item.tabelaVariantes.idVariantes)}
		<div>
			<img src={item.imagem} alt={item.tabelaProdutos.campoNome} width="120" />

			<h2>{item.tabelaProdutos.campoNome}</h2>

			<p>
				SKU:
				{item.tabelaVariantes.campoSku}
			</p>

			<!-- {#if item.tabelaVariantes.}
				<p>
					{item.descricaoDaVariante}
				</p>
			{/if} -->

			<p>
				Preço: R$
				{item.tabelaVariantes.campoPreco.toFixed(2)}
			</p>

			<p>
				Quantidade:
				{item.quantidade}
			</p>

			<button
				onclick={() =>
					funcaoDiminuirQuantidade({
						idVariantes: item.tabelaVariantes.idVariantes,
					})}
			>
				-
			</button>

			<button
				onclick={() =>
					funcaoAumentarQuantidade({
						idVariantes: item.tabelaVariantes.idVariantes,
					})}
			>
				+
			</button>

			<button
				onclick={() =>
					funcaoRemoverItem({
						idVariantes: item.tabelaVariantes.idVariantes,
					})}
			>
				Remover
			</button>

			<hr />
		</div>
	{/each}

	<h2>
		Subtotal: R$
		{derivedPrecoTotalSemDesconto().toFixed(2)}
	</h2>

	<p>
		Quantidade total:
		{derivedQuantidadeTotalNocarrinho()}
	</p>

	<p>
		Produtos distintos:
		{storeCarrinho.itens.length}
	</p>

	<!-- <p>
		Total com frete de R$ 20: R$
		{carrinho.calcularTotalComFrete(20).toFixed(2)}
	</p> -->
{/if}
aaa
