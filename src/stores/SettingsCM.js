import { writable } from 'svelte/store';

const SettingsCM = writable({
	theme: "dark",
	indent: {
		size: 4,
		tabs: true
	},
	mode: "text/plain",
	lineNumbers: true,
	extraKeys: {}
});

export default SettingsCM;