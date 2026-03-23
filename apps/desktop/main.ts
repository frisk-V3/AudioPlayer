import { app, BrowserWindow } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null = null;

function createWindow(filePath?: string) {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));

  // ファイル渡されたら再生
  if (filePath) {
    mainWindow.webContents.once('did-finish-load', () => {
      mainWindow?.webContents.send('open-file', filePath);
    });
  }
}

// アプリ起動
app.whenReady().then(() => {
  // ダブルクリックで渡されたファイル取得
  const fileArg = process.argv.find(arg =>
    arg.endsWith('.mp3') || arg.endsWith('.wav')
  );

  createWindow(fileArg);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
