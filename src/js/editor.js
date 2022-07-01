var EditorSettings = {
	fontSize: 18,
	fontFamily: "'Open Sans', sans-serif"
}


export function GetEditorSettings() {
	return EditorSettings;
}

export function ApplyEditorSettings() {
	let styleElement = document.getElementById("EditorDynamicStyles");
	let cssCode = `:root {
	font-size: ${EditorSettings.fontSize}px;
	font-family: ${EditorSettings.fontFamily};
}`
	styleElement.innerHTML = cssCode;
}
