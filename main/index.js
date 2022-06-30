const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = process.env.APP_DEV ? (process.env.APP_DEV.trim() == "true") : false;

var mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	if (isDev == true) {
		mainWindow.loadURL("http://localhost:3000/");
	} else {
		mainWindow.loadFile(path.join(__dirname, "../frontend-dist/index.html"));
	}

	mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);
app.on('activate', function() {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
