<script>
	import Tabs from "./lib/Tabs.svelte";
	import TreeView from "./lib/TreeView.svelte";
	import { GetEditorSettings, ApplyEditorSettings } from "./js/editor.js";
	import { onMount } from "svelte";

	var SideBarSize = 200;

	const tree = {
			name: 'Documents',
			fullPath: "/home/adityam/Documents",
			isDirectory: true,
			expanded: true,
			children: [
				{
					name: 'README.md',
					fullPath: "/home/adityam/Documents/README.md",
					isDirectory: false
				},
				{
					name: 'CHANGELOG.md',
					fullPath: "/home/adityam/Documents/CHANGELOG.md",
					isDirectory: false
				},
				{
					name: 'src',
					fullPath: "/home/adityam/Documents/src",
					expanded: false,
					isDirectory: true,
					children: [
						{
							name: 'index.js',
							fullPath: "/home/adityam/Documents/src/index.js",
							isDirectory: false
						},
						{
							name: 'index.css',
							fullPath: "/home/adityam/Documents/src/index.css",
							isDirectory: false
						}
					]
				}
			]
	}

	onMount(() => {
		GetEditorSettings().fontSize = 16;
		ApplyEditorSettings();

		const resize = (e) => SideBarSize = e.x;

		document.getElementById("resizer")?.addEventListener("mousedown", () => {
			document.addEventListener("mousemove", resize, false);
			document.addEventListener("mouseup", () => {
				document.removeEventListener("mousemove", resize, false);
			}, false);
		});
	});
</script>

<editor>
	<sidebar style={`flex-basis: ${SideBarSize}px;`} id="sidebar">
		<div class="treeview-container">
			<TreeView tree={tree} on:itemclick={(e) => console.log(e)} expanded/>
		</div>
	</sidebar>
	<sidebar-resizer id="resizer" />
	<workspace>
		<Tabs />
		<code-area></code-area>
		<statusbar />
	</workspace>
</editor>

<style>
	editor {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	workspace {
		flex: 0 1 100%;
	}

	sidebar-resizer {
		padding: 0 0.2rem;
		flex-basis: 0.1rem;
		cursor: col-resize;
		border-right: 2px solid #111;
		box-sizing: border-box;
	}

	statusbar {
	}

	.treeview-container {
		margin-left: 10px;
		padding: 10px 0;
	}
</style>
