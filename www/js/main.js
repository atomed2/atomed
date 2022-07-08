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

Neutralino.init();
Neutralino.events.on("windowClose", onWindowClose);

window.onload = function() {
    disableDragNDrop(document.body);
}