import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  onOpenFile: (callback: (file: string) => void) => {
    ipcRenderer.on('open-file', (_, file) => callback(file));
  }
});
