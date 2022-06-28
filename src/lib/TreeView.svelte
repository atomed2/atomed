<script>
	import { onMount } from 'svelte';

	export let tree;
	export let onClick = null;

	const { name, children } = tree;
	let { expanded = true } = tree;

	function clickHandler() {
		expanded = !expanded;
		if(!children && !!onClick) {
			onClick(tree, expanded);
		}
	}
</script>

{#if tree}
<div class="treeview-element">
	<div class="treeview-name" on:click={clickHandler}>{name}</div>
	{#if children && expanded}
		<div class="treeview-children">
			{#each children as child}
				<svelte:self tree={child} onClick={onClick}/>
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
		background-color: #333;
	}

	div.treeview-name {
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
