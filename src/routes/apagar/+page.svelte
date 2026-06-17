<script lang="ts">
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<pre>
{JSON.stringify(data.item, null, 2)}
</pre>
