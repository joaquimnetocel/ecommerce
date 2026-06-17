<script lang="ts">
	import { carrinho } from '$lib/stores/carrinho.svelte';

	function adicionarProdutoSimples() {
		carrinho.adicionar({
			idDaVariante: 1,
			idDoProduto: 1,
			sku: 'NOTEBOOK-001',
			nome: 'Notebook Dell',
			preco: 3500,
			imagem: '/notebook.jpg',
			estoque: 5,
		});
	}

	function adicionarProdutoComVariacao() {
		carrinho.adicionar({
			idDaVariante: 15,
			idDoProduto: 2,
			sku: 'CAM-PRETA-G',
			nome: 'Camiseta Básica',
			preco: 99.9,
			imagem: '/camiseta.jpg',
			estoque: 10,
			precoCheio: 129.9,
		});
	}
</script>

<button onclick={adicionarProdutoSimples}> Adicionar notebook </button>

<button onclick={adicionarProdutoComVariacao}> Adicionar camiseta </button>

<hr />

{#if carrinho.itens.length === 0}
	<p>Carrinho vazio</p>
{:else}
	{#each carrinho.itens as item (item.idDoProduto)}
		<div>
			<img src={item.imagem} alt={item.nome} width="120" />

			<h2>{item.nome}</h2>

			<p>
				SKU:
				{item.sku}
			</p>

			{#if item.descricaoDaVariante}
				<p>
					{item.descricaoDaVariante}
				</p>
			{/if}

			<p>
				Preço: R$
				{item.preco.toFixed(2)}
			</p>

			<p>
				Quantidade:
				{item.quantidade}
			</p>

			<button onclick={() => carrinho.diminuirQuantidade(item.idDaVariante)}> - </button>

			<button onclick={() => carrinho.aumentarQuantidade(item.idDaVariante)}> + </button>

			<button onclick={() => carrinho.removerItem(item.idDaVariante)}> Remover </button>

			<hr />
		</div>
	{/each}

	<h2>
		Subtotal: R$
		{carrinho.precoTotalSemFrete.toFixed(2)}
	</h2>

	<p>
		Quantidade total:
		{carrinho.quantidadeTotalDeItens}
	</p>

	<p>
		Produtos distintos:
		{carrinho.itens.length}
	</p>

	<p>
		Total com frete de R$ 20: R$
		{carrinho.calcularTotalComFrete(20).toFixed(2)}
	</p>
{/if}
aaa
