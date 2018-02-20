const electron = require('electron')

const app = electron.app

const BrowserWindow = electron.BrowserWindow

const electronReload = require('electron-reload')(__dirname)

let mainWindow
let createWindow = () => {
  mainWindow = new BrowserWindow({ width: 1200, height: 600 })

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    console.log('mainWindow | closed ');

    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  console.log('app | window-all-closed ');

  if (process.platform !== 'darwin') {
    app.quit()
  }
})
