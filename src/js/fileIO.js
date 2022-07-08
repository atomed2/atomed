export function OpenFile() {
	return new Promise(async function(resolve, reject) {
		try {
			let file = await Neutralino.os.showOpenDialog('Save your diagram', {
				title: 'Select a file',
				multiSelections: false
			});
			if (!file || !(file.length >= 0)) {
				throw new Error("User did not select any file.");
			} else {
				resolve(file[0]);
			}
		} catch(err) {
			reject(err);
		}
	})
}