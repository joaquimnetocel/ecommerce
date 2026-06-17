<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import * as Collapsible from '$lib/shadcn/componentes/ui/collapsible';
	import * as Sidebar from '$lib/shadcn/componentes/ui/sidebar';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import SidebarNode from './ItemDoMenu.svelte';
	import type { typeItemDoMenu } from './typeItemDoMenu';

	let { node, level = 0 }: { node: typeItemDoMenu; level?: number } = $props();

	const pathname = $derived(page.url.pathname);

	function isActive(url: string) {
		return pathname === url || pathname.startsWith(url + '/');
	}

	function containsActive(node: typeItemDoMenu): boolean {
		if (node.type === 'link') {
			return isActive(node.url);
		}

		return node.children.some((child) => containsActive(child));
	}
</script>

{#if node.type === 'group'}
	<Collapsible.Root open={containsActive(node)} class="group/collapsible">
		{#if level === 0}
			<Sidebar.MenuItem>
				<Collapsible.Trigger>
					{#snippet child({ props })}
						<Sidebar.MenuButton
							{...props}
							class="cursor-pointer [&[data-state=open]_.menu-chevron]:rotate-180"
						>
							{#if node.icon}
								<node.icon />
							{/if}

							<span>{node.title}</span>

							<ChevronDown class="menu-chevron ml-auto transition-transform duration-200" />
						</Sidebar.MenuButton>
					{/snippet}
				</Collapsible.Trigger>

				<Collapsible.Content>
					<Sidebar.MenuSub>
						{#each node.children as child (child.id)}
							<SidebarNode node={child} level={level + 1} />
						{/each}
					</Sidebar.MenuSub>
				</Collapsible.Content>
			</Sidebar.MenuItem>
		{:else}
			<Sidebar.MenuSubItem>
				<Collapsible.Trigger>
					{#snippet child({ props })}
						<Sidebar.MenuSubButton {...props} class="[&[data-state=open]_.menu-chevron]:rotate-180">
							{#if node.icon}
								<node.icon />
							{/if}

							<span>{node.title}</span>

							<ChevronDown class="menu-chevron ml-auto transition-transform duration-200" />
						</Sidebar.MenuSubButton>
					{/snippet}
				</Collapsible.Trigger>

				<Collapsible.Content>
					<Sidebar.MenuSub>
						{#each node.children as child (child.id)}
							<SidebarNode node={child} level={level + 1} />
						{/each}
					</Sidebar.MenuSub>
				</Collapsible.Content>
			</Sidebar.MenuSubItem>
		{/if}
	</Collapsible.Root>
{:else if level === 0}
	<Sidebar.MenuItem>
		<Sidebar.MenuButton isActive={isActive(node.url)}>
			{#snippet child({ props })}
				<a href={resolve(node.url)} {...props}>
					{#if node.icon}
						<node.icon />
					{/if}

					<span>{node.title}</span>
				</a>
			{/snippet}
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
{:else}
	<Sidebar.MenuSubItem>
		<Sidebar.MenuSubButton
			isActive={isActive(node.url)}
			class="data-[active=true]:bg-primary/10	data-[active=true]:font-semibold data-[active=true]:text-primary"
		>
			{#snippet child({ props })}
				<a href={resolve(node.url)} {...props}>
					{#if node.icon}
						<node.icon />
					{/if}

					<span>{node.title}</span>
				</a>
			{/snippet}
		</Sidebar.MenuSubButton>
	</Sidebar.MenuSubItem>
{/if}
