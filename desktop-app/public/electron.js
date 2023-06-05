const path = require('path');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

 
  if (app.isPackaged) {
    win.loadFile(`file://${path.join(__dirname, '../build/index.html')}`); // prod
  } else {
    win.loadURL('http://localhost:3000'); // dev
  }
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// Cette méthode sera appelée lorsque Electron aura terminé l'initialisation et 
// sera prêt à créer des fenêtres de navigation.
 //Certaines API ne peuvent être utilisées qu'après cet événement.
app.whenReady().then(createWindow);

// Quitte lorsque toutes les fenêtres sont fermées
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
