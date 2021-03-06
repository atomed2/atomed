<script>
	import Tabs from "./lib/Tabs.svelte";
	import MenuBar from "./lib/MenuBar.svelte";
	import TreeView from "./lib/TreeView.svelte";

	import SettingsCMStore from './stores/SettingsCM.js';
	import FileStore from './stores/FileStore.js';

	import { OpenFile } from "./js/fileIO.js";
	import { AddMenuItem } from "./js/menubar.js";
	import { CreateEditor, SetEditorTheme } from "./js/cm.js";
	import { GetEditorSettings, ApplyEditorSettings } from "./js/editor.js";
	import { onMount, onDestroy } from "svelte";
	import FileTypeMap from './js/FileTypeMap.js';

	import DetectIndent from 'detect-indent';

	var SideBarSize = 200;

	var Files;
	var currTabIndex = 0;
	var prevTabIndex = 0;

	let CodeMirrorOptions;

	const UnSubCMOpts = SettingsCMStore.subscribe((opts) => {
		CodeMirrorOptions = opts;
		SetEditorTheme(null, CodeMirrorOptions.theme);
	});

	const UnSubFileStore = FileStore.subscribe(FilesArr => {
		Files = FilesArr

		function clamp(num, min, max) {
			return num <= min ? min : num >= max ? max : num
		}

		prevTabIndex = currTabIndex;
		currTabIndex = Files.length - 1;
		prevTabIndex = clamp(prevTabIndex, 0, Files.length - 1);
		currTabIndex = clamp(currTabIndex, 0, Files.length - 1);

		if (Files.length > 0) {
			Files[prevTabIndex].editor.getWrapperElement().style.display = "none";
			Files[currTabIndex].editor.getWrapperElement().style.display = "";
		}
	})

	var reRenderTreeView = 0; // Change To Anything To Re-Render
	var tree = {};// = {
	// 		name: 'Documents',
	// 		fullPath: "/home/adityam/Documents",
	// 		isDirectory: true,
	// 		expanded: true,
	// 		children: [
	// 			{
	// 				name: 'README.md',
	// 				fullPath: "/home/adityam/Documents/README.md",
	// 				isDirectory: false
	// 			},
	// 			{
	// 				name: 'CHANGELOG.md',
	// 				fullPath: "/home/adityam/Documents/CHANGELOG.md",
	// 				isDirectory: false
	// 			},
	// 			{
	// 				name: 'src',
	// 				fullPath: "/home/adityam/Documents/src",
	// 				expanded: false,
	// 				isDirectory: true,
	// 				children: [
	// 					{
	// 						name: 'index.js',
	// 						fullPath: "/home/adityam/Documents/src/index.js",
	// 						isDirectory: false
	// 					},
	// 					{
	// 						name: 'index.css',
	// 						fullPath: "/home/adityam/Documents/src/index.css",
	// 						isDirectory: false
	// 					}
	// 				]
	// 			}
	// 		]
	// }

	function onTabChange(e) {
		prevTabIndex = e.detail.previousIndex;
		currTabIndex = e.detail.currentIndex;

		Files[prevTabIndex].editor.getWrapperElement().style.display = "none";
		Files[currTabIndex].editor.getWrapperElement().style.display = "";
	}

	function onTabClose(e) {
		let file = Files[e.detail.index];
		file.editor.getWrapperElement().remove();

		FileStore.update(FilesArr => {
			FilesArr.splice(e.detail.index, 1);
			return FilesArr;
		})

		console.log("Curr: " + currTabIndex + "\nPrev: " + prevTabIndex);
	}

	async function __openFileToEditor(filePath) {
		let fileContents = await Neutralino.filesystem.readFile(filePath);
		let editor = CreateEditor("cmArea", CodeMirrorOptions, fileContents);

		let file = {
			fileName: filePath.replace(/^.*[\\\/]/, ''),
			filePath: filePath,
			editor: editor
		}

		let fileExt = file.fileName.substr(file.fileName.lastIndexOf('.') + 1);

		if (!fileExt || fileExt === "") { fileExt = file.fileName; }
		fileExt = fileExt.toLowerCase();

		let detectedIndent = DetectIndent(fileContents);
		if (detectedIndent.type == undefined || detectedIndent.type == "tab") {
			editor.setOption("indentUnit", 4);
			editor.setOption("tabSize", 4);
			editor.setOption("indentWithTabs", true);
		} else {
			if (detectedIndent.type == "space") {
				editor.setOption("indentUnit", detectedIndent.amount);
				editor.setOption("indentWithTabs", false);
			}
		}

		FileTypeMap.forEach(FileType => {
			if (FileType.extension.includes(fileExt) == true) {
				console.log("Setting CodeMirror Mode To '" + FileType.cmMode + "'")
				file.editor.setOption("mode", FileType.cmMode);
			}
		});

		FileStore.update(FilesArr => {
			return [...FilesArr, file];
		})

		Files[prevTabIndex].editor.getWrapperElement().style.display = "none";
		editor.getWrapperElement().style.display = "";
	}

	function __openFileWrapper() {
		OpenFile()
			.then(__openFileToEditor)
			.catch(err => {
				console.log(err);
			})
	}

	function __newFile() {
		let editor = CreateEditor("cmArea", CodeMirrorOptions, "");

		let file = {
			fileName: "untitled",
			filePath: null,
			editor: editor
		}

		FileStore.update(FilesArr => {
			return [...FilesArr, file]
		})

		Files[prevTabIndex].editor.getWrapperElement().style.display = "none";
		editor.getWrapperElement().style.display = "";
	}

	function __setEditorTheme(theme) {
		SettingsCMStore.update(opts => {
			opts.theme = theme;
			return opts;
		})

		SetEditorTheme(null, theme); // Making Sure it is executed once
		Files.forEach(file => {
			SetEditorTheme(file.editor, theme);
		})
	}

	function reRenderTV() {
		reRenderTreeView > 5 ? reRenderTreeView = 0 : reRenderTreeView++
	}

	// Convert Neutralino Folder Content Array To TreeView Object
	function __neuArrToTreeObj(parent, folderContents) {
		folderContents.forEach(item => {
			if (item.entry == "." || item.entry == "..") return;
			parent.children.push({
				name: item.entry,
				fullPath: parent.fullPath + "/" + item.entry,
				isDirectory: item.type == "DIRECTORY",
				children: item.type == "DIRECTORY" ? [] : null
			});
		});
	}

	async function __treeViewItemClick(e) {
		let itemClicked = e.detail.item;

		if (!itemClicked.isDirectory) {
			await __openFileToEditor(itemClicked.fullPath);
		} else if (!itemClicked.children || itemClicked.children.length == 0) {
			itemClicked.children = [];

			let folderContents = await Neutralino.filesystem.readDirectory(itemClicked.fullPath);
			__neuArrToTreeObj(itemClicked, folderContents);

			reRenderTV();
		}
	}

	onMount(async () => {
		const docPath = await Neutralino.os.getPath("documents");
		const folderContents = await Neutralino.filesystem.readDirectory(docPath);
		tree = {
			name: docPath.match(/([^\/]*)\/*$/)[1], // Get Last Segment From The Path
			fullPath: docPath,
			isDirectory: true,
			expanded: true,
			children: []
		}

		__neuArrToTreeObj(tree, folderContents);

		reRenderTV();

		AddMenuItem({
			label: "File",
			submenu: [
				{ label: "New", click: __newFile },
				{ label: "Open", click: __openFileWrapper },
				{ label: "Save", click: function() { console.log("Save Clicked...") } },
				{ label: "Save As", click: function() { console.log("Save As Clicked...") } }
			]
		});

		AddMenuItem({
			label: "Theme",
			submenu: [
				{ label: "Dark", click: () => { __setEditorTheme("dark") } },
				{ label: "Light", click: () => { __setEditorTheme("light") } }
			]
		});

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

	onDestroy(() => {
		UnSubCMOpts();
		UnSubFileStore();
	})
</script>

<MenuBar />
<editor>
	<div style={`flex-basis: ${SideBarSize}px;`} id="sidebar">
		{#key reRenderTreeView}
			<div class="treeview-container">
				<TreeView tree={tree} on:itemclick={__treeViewItemClick} expanded/>
			</div>
		{/key}
	</div>
	<div id="resizer"></div>
	<workspace>
		<Tabs currTab={currTabIndex} on:tab-change={onTabChange} on:tab-close={onTabClose} />
		<div id="cmArea"></div>
		<statusbar />
	</workspace>
</editor>

<style>
	editor {
		height: calc(100% - var(--menu-height));
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	workspace {
		flex: 0 1 100%;
	}

	div#sidebar {}

	div#cmArea {
		width: 100%;
		height: calc(100% - var(--menu-height) - 0.8rem); /* Little Hack To Keep CodeMirror Instances in View Without Overflow */
	}

	div#resizer {
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
