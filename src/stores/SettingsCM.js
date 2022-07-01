import { writable } from 'svelte/store';

const SettingsCM = writable({
	theme: "default-dark",
	indent: {
		size: 4,
		tabs: true
	},
	mode: "javascript",
	placeholder: "",
	lineNumbers: true,
	extraKeys: {}
});

export default SettingsCM;