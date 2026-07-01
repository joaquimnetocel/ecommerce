<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { House } from '@lucide/svelte';
</script>

{#if page?.url?.pathname !== '/'}
	<a
		href={resolve('/')}
		class="flex items-center justify-center rounded-full p-2 text-gray-500 transition-all duration-300 ease-out hover:scale-110 hover:bg-gray-100 hover:text-primary active:scale-95"
		aria-label="Home"
	>
		<House class="h-5 w-5" />
	</a>
{/if}
