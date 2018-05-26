const { app, BrowserWindow } = require('electron');
// To reload the project when changes happens
require('electron-reload')(__dirname);

app.on('ready', appReadyCB);
app.on('window-all-closed', appWindowAllClosedCB);

let mainWindow;
function appReadyCB() {
  console.log('[index appReadyCB]');

  // Creating the main window
  mainWindow = new BrowserWindow({ width: 1200, height: 700 });
  // Load the template HTML
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  // Opening the developer tools
  mainWindow.webContents.openDevTools();
  // Clear the memmory when window is closed
  mainWindow.on('closed', mainWindowCloseCB);
  // Handle the crash event
  mainWindow.webContents.on('crashed', mainWindowCrashedCB);
  mainWindow.on('unresponsive', mainWindowUnresponsiveCB);
}

function appWindowAllClosedCB() {
  console.log('[appWindowAllClosedCB]');

  if (process.platform !== 'darwin') {
    app.quit();
  }
}

function mainWindowCloseCB() {
  // Setting this to null cleans the memmory
  mainWindow = null;
}

function mainWindowCrashedCB(event) {
  console.log(`[App\'s main window crashed]`);
}

function mainWindowUnresponsiveCB(event) {
  console.log(`[App\'s main window unresponsive]`);
}
