<script>
	// import TabStore from '../stores/TabStore.js';
	import FileStore from '../stores/FileStore.js';
	import { createEventDispatcher, onDestroy } from 'svelte';

	export let currTab = 0;
	let prevTab = 0;
	let Files;

	const dispatch = createEventDispatcher();
	const UnSub = FileStore.subscribe(FilesArr => {
		Files = FilesArr;
	});

	onDestroy(() => {
		UnSub();
	})

	function onTabClose(index) {
		dispatch('tab-close', {
			index: index
		})
	}

	function onTabClick(index) {
		prevTab = currTab;
		currTab = index;

		dispatch('tab-change', {
			currentIndex: currTab,
			previousIndex: prevTab
		})
	}
</script>

{#if Files && Files.length > 0}
<div class="tab-panel">
	{#each Files as file, idx}
		<div on:click={() => onTabClick(idx)} class={`tab${currTab == idx ? " selected" : ''}`}>
			<span class="tab-fileName">{file.fileName}</span>
			<span on:click={() => onTabClose(idx)} class="tab-close">×</span>
		</div>
	{/each}
</div>
{/if}

<style type="text/less">
	.tab-panel {
		background-color: var(--tab-panel-bg);
		height: var(--tab-panel-height);
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.tab {
		display: flex;
		flex-direction: row;
		align-items: center;
		cursor: pointer;
		user-select: none;
		color: var(--tab-fg);
		background-color: var(--tab-panel-bg);
		min-width: 13rem;
		border-left: var(--tab-left-border-size) solid var(--tab-panel-bg);
	}

	.tab span.tab-fileName {
		margin-left: auto;
		color: var(--tab-fg);
	}

	.tab span.tab-close {
		margin-left: auto;
		margin-right: 0.3rem;
		width: 1rem;
		font-size: 0.5rem;
		color: transparent;
		transition: 0.1s all linear;
	}

	.tab:hover span.tab-close {
		font-size: 1.5rem;
		color: var(--tab-close);
	}

	.tab span.tab-close:hover {
		color: var(--tab-close-hover);
	}

	.tab.selected {
		background-color: var(--tab-selected-bg);
		border-left: var(--tab-left-border-size) solid var(--tab-selected-border);
	}
</style>