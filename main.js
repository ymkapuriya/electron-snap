// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const { WirelessTools } = require('./src/wireless-tools')
const { Wifi } = require('./src/wifi')

function createWindow() {
  //preload path
  const preloadScriptPath = path.join(__dirname, 'preload.js');

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: preloadScriptPath,
      contextIsolation: true,
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  ipcMain.handle('toMain', async function toMain(_event, data) {
    console.log('data', data);
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.handle('scan-networks', async (_event, data) => {
    const iface = await WirelessTools.getWirelessInterface()
    console.log("Main : ", iface);
    return iface
  })

  ipcMain.handle('list-networks', async (_event, data) => {
    try {
      const networks = await Wifi(data)
      console.log("main networkds", networks);
    } catch (error) {
      console.error("main error", error)
    }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.