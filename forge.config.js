module.exports = {
	packagerConfig: {
		name: "atom2",
		// icon: "public/icon.ico",
		asar: true, // Source Code Will Be packaged in Asar file.
		junk: true, // Don't Include Junk Files Like .DS_Store.
		prune: true, // Doesn't Include Dev Dependencies in Build
		win32metadata: {
			ProductName: "atom2",
			CompanyName: "atom2",
			FileDescription: "The Hackable Text Editor 2",
			InternalName: "atom2",
			OriginalFilename: "atom2.exe"
		},
		appCategoryType: "app-category-type=public.app-category.developer-tools",
		ignore: [
			/src/,
			/public/,
			/LICENSE/,
			/CODE_OF_CONDUCT.md/,
			/.github/,
			/.gitignore/,
			/README.md/,
			/forge.config.js/,
			/jsconfig.json/
		]
	},
	makers: [
		{
			name: "@electron-forge/maker-zip",
			platforms: [ "darwin", "linux", "win32" ]
		}
	]
}
