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

<style type="text/less">
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
		min-width: 13rem;
		border-left: var(--tab-left-border-size) solid var(--tab-panel-bg);
	}

	.tab span.tab-title {
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