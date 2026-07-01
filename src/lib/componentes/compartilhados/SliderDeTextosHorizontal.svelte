<script lang="ts">
	let {
		duracao,
		textos,
	}: {
		duracao: number;
		textos: string[];
	} = $props();
</script>

<div class="ticker" style={`--ticker-duracao: ${duracao}s`}>
	<div class="ticker__track">
		{#each [...textos, ...textos] as item, i (i)}
			<div class="ticker__item">
				<span>{item}</span>

				<div class="ticker__divider"></div>
			</div>
		{/each}
	</div>
</div>

<style>
	.ticker {
		width: 100%;
		height: 48px;

		overflow: hidden;

		background: black;
		color: white;

		display: flex;
		align-items: center;
	}

	.ticker__track {
		display: flex;
		width: max-content;

		animation: ticker-scroll var(--ticker-duracao) linear infinite;
	}

	.ticker__item {
		display: flex;
		align-items: center;

		white-space: nowrap;

		padding-right: 3rem;
	}

	.ticker__divider {
		width: 120px;
		height: 2px;

		background: #60a5fa;

		margin-left: 3rem;
		border-radius: 999px;
	}

	@keyframes ticker-scroll {
		from {
			transform: translateX(0);
		}

		to {
			transform: translateX(-50%);
		}
	}
</style>
