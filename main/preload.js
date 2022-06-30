const { contextBridge, ipcRenderer } = require("electron");
const path = require("path");
const fs = require("fs");

const api = {
	fs: {
		readDirectory: function(dirPath, includeHidden = true) {
			return new Promise(async (resolve, reject) => {
				try {
					let dirConts = fs.readdirSync(path.resolve(dirPath));
					if (includeHidden == false) {
						// Filter Out Hidden Unix Files/Folders
						dirConts = dirConts.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
					}
					resolve(dirConts);
				} catch(err) {
					reject(err);
				}
			})
		},
		readFile: function(filePath) {
			return new Promise(async (resolve, reject) => {
				try {
					let fileContents = fs.readFileSync(path.resolve(filePath), {
						encoding: 'utf-8'
					});
					resolve(fileContents);
				} catch(err) {
					reject(err)
				}
			})
		}
	},
	path: {
		basename: path.basename,
		resolve: path.resolve
	}
}

contextBridge.exposeInMainWorld("api", api);
