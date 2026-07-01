<script lang="ts">
	import Menu from '$lib/componentes/especificosParaRotas//admin/Menu/index.svelte';
	import * as Sidebar from '$lib/shadcn/componentes/ui/sidebar/index.js';
	import './formularios.css';

	let { children } = $props();
</script>

<Sidebar.Provider>
	<Menu />
	<Sidebar.Inset>
		<header>
			<Sidebar.Trigger />
		</header>
		<div class="my-6 px-10">
			{@render children?.()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
