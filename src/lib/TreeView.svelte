<script>
	import { onMount, createEventDispatcher } from 'svelte';
	export let tree;

	const dispatch = createEventDispatcher();

	const { name, children } = tree;
	let { expanded = true } = tree;

	function clickHandler() {
		expanded = !expanded;
		dispatch('itemclick', {
			item: tree,
			expanded: expanded
		})
	}
</script>

{#if tree}
<div class="treeview-element">
	<div class="treeview-name" on:click={clickHandler}>{name}</div>
	{#if children && expanded}
		<div class="treeview-children">
			{#each children as child}
				<svelte:self tree={child} on:itemclick/> <!-- Event Forwarding ~ https://svelte.dev/tutorial/event-forwarding -->
			{/each}
		</div>
	{/if}
</div>
{/if}

<style>
	.treeview-element {
		width: 100%;
		position: relative;
		user-select: none;
	}

	div.treeview-name:hover {
		color: var(--treeview-item-hover-fg);
		background-color: var(--treeview-item-hover-bg);
	}

	div.treeview-name {
		color: var(--treeview-item-fg);
		background-color: var(--treeview-item-bg);
		cursor: pointer;
		border-radius: 5px;
		padding: 5px 6px;
		display: block;
	}

	div.treeview-children {
		margin: 0;
		padding: 0 0 0 10px;
	}
</style>
