<script lang="ts">
	import { Menu } from '@lucide/svelte';
	import { storeVisivel } from './storeVisivel.svelte';
</script>

<button
	aria-label="Sidebar"
	type="button"
	class="block cursor-pointer text-zinc-200 transition duration-300 hover:text-white focus:outline-none md:hidden"
	onclick={() => {
		storeVisivel.valor = true;
	}}
>
	<Menu class="text-black" />
</button>
