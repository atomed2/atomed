import CodeMirror from 'codemirror';

// Auto Close & Match
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/matchtags";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";

// Misc Addons
import "codemirror/addon/selection/active-line";

import "codemirror/mode/javascript/javascript.js"; // JavaScript, TypeScript, JSON
import "codemirror/mode/clike/clike"; // C Like - C, C++, Java, C#, Objective-C, Scala, GLSL, Squirrel, Ceylon
import "codemirror/mode/brainfuck/brainfuck"; // BrainFuck
import "codemirror/mode/mllike/mllike"; // ML Like - OCaml, F#
import "codemirror/mode/pascal/pascal"; // Pascal
import "codemirror/mode/perl/perl"; // Perl
import "codemirror/mode/php/php"; // PHP, HTML With PHP
import "codemirror/mode/xml/xml"; // XML, HTML
import "codemirror/mode/css/css"; // CSS, SCSS, LESS
import "codemirror/mode/htmlmixed/htmlmixed"; // HTML With CSS, JS
import "codemirror/mode/go/go"; // GoLang
import "codemirror/mode/shell/shell"; // Shell Scripts
import "codemirror/mode/python/python"; // Python, Cython
import "codemirror/mode/rust/rust"; // Rust
import "codemirror/mode/jsx/jsx"; // JSX, TSX
import "codemirror/mode/yaml/yaml"; // Yaml
import "codemirror/mode/yaml-frontmatter/yaml-frontmatter"; // Yaml Frontmatter
import "codemirror/mode/lua/lua"; // Lua
import "codemirror/mode/markdown/markdown"; // Markdown
import "codemirror/mode/gfm/gfm"; // GitHub Flavor For Markdown
import "codemirror/mode/dart/dart"; // Dart
import "codemirror-mode-svelte"; // Svelte
import "codemirror-mode-makefile"; // Makefile

import "codemirror/lib/codemirror.css"; // Default Theme

function CustomError(errorText, errorName) {
	this.name = errorName;
	this.message = errorText;
}

/**
 * Create New CodeMirror Editor
 * @param {String} id DOM Element ID To Put The Editor In
 * @param {Object} options Object Containing Editor Options
 * @param {String} options.theme Theme Name
 * @param {Object} options.indent Object Editor's Indent Information
 * @param {Number} options.indent.size Indent Size
 * @param {Boolean} options.indent.tabs To Use Tabs or Not
 * @param {String} options.mode Editor Mode
 * @param {Boolean} options.lineNumbers To Show Line Numbers or Not
 * @param {Object} options.extraKeys Object containing shortcut & function to call
 * @param {String} initialValue Initial Editor Value
 * @returns {Object} CodeMirror Instance
*/
export function CreateEditor(id, options, initialValue = "") {
	let parent = document.getElementById(id);
	if (!parent) {
		throw new CustomError(`Invalid DOM Element ID: "${id}"`, "CreateEditorException");
	}

	let editor = CodeMirror(parent, {
		lineNumbers:       options.lineNumbers,
		theme:             options.theme,
		value:             initialValue,
		indentUnit:        options.indent.size,
		tabSize:           options.indent.size,
		indentWithTabs:    options.indent.tabs,
		mode:              options.mode,
		extraKeys:         options.extraKeys,
		autofocus:         true,
		matchTags:         { bothTags: true },
		autoCloseTags:     true,
		autoCloseBrackets: true,
		styleActiveLine:   false
	})

	if (!editor) {
		throw new CustomError("Unable To Create A CodeMirror Instance", "CreateEditorException");
	}

	SetEditorTheme(editor, options.theme);
	editor.setSize("100%", "100%");
	return editor;
}

/**
 * Update CodeMirror Theme
 * @param {Object} CodeMirror Instance
 * @param {String} Editor Theme
 * @returns {null}
*/
export function SetEditorTheme(editor, themeName) {
	if (editor) {
		let currTheme = editor.getOption("theme");
		editor.setOption("theme", themeName);
	}
	document.body.className = themeName;
}
