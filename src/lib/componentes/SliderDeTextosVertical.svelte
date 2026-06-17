<script lang="ts">
	let {
		textos,
		duracao,
	}: {
		textos: string[];
		duracao: number;
	} = $props();
</script>

{#if textos.length > 0}
	<div class="max-w-none bg-primary py-2 text-center text-xs text-white sm:text-sm">
		<ul class="sliding-list" style="--item-count: {textos.length}; --anim-duration: {duracao}s;">
			{#each textos as texto, indice (indice)}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<li style={`--index: ${indice + 1};`}>{@html texto}</li>
			{/each}
		</ul>
	</div>
{/if}

<style>
	.sliding-list {
		list-style: none;
		margin: 0;
		padding: 0;
		height: 1.8rem;
		overflow: hidden;
		position: relative;
	}

	.sliding-list li {
		height: 1.8rem;
		line-height: 1.8rem;
		position: absolute;
		width: 100%;
		opacity: 0;
		animation: slideUp var(--anim-duration) linear infinite;
		animation-delay: calc(var(--index) * (var(--anim-duration) / var(--item-count)));
	}

	.sliding-list li:first-child {
		opacity: 1;
		top: 0;
	}

	@media screen and (max-width: 300px) {
		.sliding-list {
			height: 1rem;
		}
		.sliding-list li {
			height: 1rem;
			line-height: 1rem;
		}
	}

	@keyframes slideUp {
		0%,
		3% {
			top: 100%;
			opacity: 0;
		}
		5%,
		33% {
			top: 0;
			opacity: 1;
		}
		36%,
		100% {
			top: -100%;
			opacity: 0;
		}
	}
</style>
