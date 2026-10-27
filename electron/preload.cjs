const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('aeroOptimaNative', {
  isNative: true,
  minimize: () => ipcRenderer.send('window:minimize'),
  maximize: () => ipcRenderer.send('window:maximize'),
  close: () => ipcRenderer.send('window:close'),
  checkAdmin: () => ipcRenderer.invoke('system:checkAdmin'),
  getLiveStats: () => ipcRenderer.invoke('system:getLiveStats'),
  getSystemOverview: () => ipcRenderer.invoke('system:getSystemOverview'),
  getSystemDrivers: () => ipcRenderer.invoke('system:getSystemDrivers'),
  startAction: (actionId, type, params) => ipcRenderer.send('action:start', { actionId, type, params }),
  onActionProgress: (callback) => {
    const handler = (_, data) => callback(data);
    ipcRenderer.on('action:progress', handler);
    return () => ipcRenderer.removeListener('action:progress', handler);
  }
});
