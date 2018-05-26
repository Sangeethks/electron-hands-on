const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

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
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

function appWindowAllClosedCB() {
  console.log('[appWindowAllClosedCB]');

  if (process.platform !== 'darwin') {
    app.quit();
  }
}
