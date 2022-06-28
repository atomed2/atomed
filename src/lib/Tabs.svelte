<script>
	let prevTab = 0;
	let currTab = 0;
	let List = [
		{
			title: "index.html",
			selected: true
		},
		{
			title: "index.js",
			selected: false
		},
		{
			title: "styles.css",
			selected: false
		}
	];

	function onTabClose(index) {
		console.log("Close Requested:", index);
	}

	function onTabClick(index) {
		prevTab = currTab;
		currTab = index;
		List[prevTab].selected = false;
		List[currTab].selected = true;
	}
</script>

<div class="tab-panel">
	{#each List as tab, idx}
		<div on:click={() => onTabClick(idx)} class={`tab${tab.selected ? " selected" : ''}`}>
			<span class="tab-title">{tab.title}</span>
			<span on:click={() => onTabClose(idx)} class="tab-close">×</span>
		</div>
	{/each}
</div>

<style>
	.tab-panel {
		background-color: var(--tab-panel-bg);
		height: 1.9rem;
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
		min-width: 10rem;
		border-left: 2px solid var(--tab-panel-bg);
	}

	.tab span.tab-title {
		margin-left: auto;
		color: var(--tab-fg);
	}

	.tab span.tab-close {
		margin-left: auto;
		margin-right: 0.3rem;
		font-size: 1.5rem;
		color: transparent;
	}

	.tab:hover span.tab-close {
		color: var(--tab-close);
	}

	.tab span.tab-close:hover {
		color: var(--tab-close-hover);
	}

	.tab.selected {
		background-color: var(--tab-selected-bg);
		border-left: 2px solid var(--tab-selected-border);
	}
</style>