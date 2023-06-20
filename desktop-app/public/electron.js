const path = require('path');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

function createWindow() {
  // créé une nouvelle fenetre Electron
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
    },
  });

 
  if (app.isPackaged) {
    win.loadFile(`file://${path.join(__dirname, '../build/index.html')}`); // prod
  } else {
    win.loadURL('http://localhost:3001'); // dev
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
