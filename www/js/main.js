function disableDragNDrop(element) {
	// Disable Drag And Drop
	let evtNames = ['dragenter', 'dragover', 'dragleave', 'drop'];
	for (let i = 0; i < evtNames.length; i++) {
		element.addEventListener(evtNames[i], function(e) {
			e.preventDefault()
			e.stopPropagation()
		}, false);
	}
}

function onWindowClose() {
	Neutralino.app.exit();
}

async function onReady() {
}

Neutralino.init();
Neutralino.events.on("windowClose", onWindowClose);
Neutralino.events.on("ready", onReady);

window.onload = function() {
	disableDragNDrop(document.body);
}