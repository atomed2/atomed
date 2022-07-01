<script>
	import { onDestroy } from 'svelte';
	import MenuStore from '../stores/Menu.js';
	let MenuTemp;

	let unsub = MenuStore.subscribe(template => {
		MenuTemp = template;
	})

	onDestroy(() => {
		unsub();
	})
</script>

{#if MenuTemp && MenuTemp.length > 0}
<div class="MenuBar">
	{#each MenuTemp as MenuEntry}
		<div class="MenuEntry">
			{#if MenuEntry.click}
				<div on:click={MenuEntry.click} class="MenuEntryLabel">{MenuEntry.label}</div>
			{:else}
				<div class="MenuEntryLabel">{MenuEntry.label}</div>
				<ul class="SubMenu">
					{#each MenuEntry.submenu as SubMenuEntry}
						<li on:click={SubMenuEntry.click} class="SubMenuEntry">{SubMenuEntry.label}</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/each}
</div>
{/if}

<style>
	div.MenuBar {
		height: var(--menu-height);
		user-select: none;
		font-size: 0.9rem;
		background-color: var(--menu-bar-bg);
		display: block;
	}

	div.MenuBar ul {
		margin: 0;
		padding: 0;
	}

	div.MenuBar li {
		list-style: none;
	}

	div.MenuEntry {
		position: relative;
		cursor: pointer;
		display: inline-block;
		padding: 3px 5px;
		transition: 0.02s all linear;
	}

	div.MenuEntry:hover {
		background-color: var(--menu-entry-hover-bg);
	}

	div.MenuEntry:hover ul.SubMenu {
		visibility: visible;
	}

	div.MenuEntryLabel {}

	ul.SubMenu {
		position: absolute;
		left: 2px;
		top: 1.4rem;
		visibility: hidden;
		background-color: var(--menu-entry-hover-bg);
		z-index: 999;
		min-width: 7rem;
		border: 1px solid var(--submenu-hover-border);
	}

	ul.SubMenu li.SubMenuEntry {
		padding: 5px;
	}

	ul.SubMenu li.SubMenuEntry:hover {
		background-color: var(--submenu-entry-hover-bg);
	}
</style>