export type typeItemDoCarrinho = {
	idDaVariante: number;
	idDoProduto: number;
	sku: string; // SKU da variante
	nome: string;
	precoCheio?: number;
	preco: number;
	imagem?: string;
	descricaoDaVariante?: string;
	quantidade: number;
	estoque?: number;
	slug: string;
};

const CHAVE_STORAGE = 'CARRINHO';

function funcaoCriarCarrinho() {
	let estadoItens = $state<typeItemDoCarrinho[]>([]);

	if (typeof localStorage !== 'undefined') {
		const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);
		if (dadosSalvos) {
			try {
				estadoItens = JSON.parse(dadosSalvos);
			} catch {
				estadoItens = [];
			}
		}
	}

	$effect.root(() => {
		$effect(() => {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem(CHAVE_STORAGE, JSON.stringify($state.snapshot(estadoItens)));
			}
		});
	});

	function funcaoEncontrarItem(parIdDaVariante: number) {
		return estadoItens.find((item) => item.idDaVariante === parIdDaVariante);
	}

	return {
		get itens() {
			return estadoItens;
		},

		adicionar(produto: Omit<typeItemDoCarrinho, 'quantidade'>, quantidade = 1) {
			const itemExistente = funcaoEncontrarItem(produto.idDaVariante);
			if (itemExistente) {
				const novaQuantidade = itemExistente.quantidade + quantidade;
				if (itemExistente.estoque) {
					if (novaQuantidade > itemExistente.estoque) {
						itemExistente.quantidade = itemExistente.estoque;
						return;
					}
				}
				itemExistente.quantidade = novaQuantidade;
				return;
			}
			estadoItens.push({
				...produto,
				quantidade,
			});
		},

		removerItem(parIdDaVariante: number) {
			estadoItens = estadoItens.filter((item) => item.idDaVariante !== parIdDaVariante);
		},

		definirQuantidade(paridDaVariante: number, parQuantidade: number) {
			const item = funcaoEncontrarItem(paridDaVariante);
			if (!item) return;

			if (parQuantidade <= 0) {
				this.removerItem(paridDaVariante);
				return;
			}

			// Estoque
			if (item.estoque && parQuantidade > item.estoque) {
				item.quantidade = item.estoque;
				return;
			}

			item.quantidade = parQuantidade;
		},

		aumentarQuantidade(parIdDaVariante: number) {
			const item = funcaoEncontrarItem(parIdDaVariante);
			if (!item) return;
			if (item.estoque && item.quantidade >= item.estoque) {
				return;
			}
			item.quantidade += 1;
		},

		diminuirQuantidade(parIdDaVariante: number) {
			const item = funcaoEncontrarItem(parIdDaVariante);
			if (!item) return;
			if (item.quantidade <= 1) {
				this.removerItem(parIdDaVariante);
				return;
			}
			item.quantidade -= 1;
		},

		// -------------------------
		// Consultas
		// -------------------------

		existe(parIdDaVariante: number) {
			return estadoItens.some((item) => item.idDaVariante === parIdDaVariante);
		},

		obterQuantidade(parIdDaVariante: number) {
			return funcaoEncontrarItem(parIdDaVariante)?.quantidade ?? 0;
		},

		limpar() {
			estadoItens = [];
		},

		get precoTotalSemFrete() {
			return estadoItens.reduce((total, item) => {
				return total + item.preco * item.quantidade;
			}, 0);
		},

		get quantidadeTotalDeItens() {
			return estadoItens.reduce((total, corrente) => {
				return total + corrente.quantidade;
			}, 0);
		},

		aplicarCupomPercentual(percentual: number) {
			return this.precoTotalSemFrete - this.precoTotalSemFrete * (percentual / 100);
		},

		aplicarCupomFixo(valor: number) {
			return Math.max(this.precoTotalSemFrete - valor, 0);
		},

		calcularTotalComFrete(frete: number) {
			return this.precoTotalSemFrete + frete;
		},
	};
}

export const carrinho = funcaoCriarCarrinho();
