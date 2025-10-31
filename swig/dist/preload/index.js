"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const api = {
  // Project APIs
  project: {
    create: (path, template) => electron.ipcRenderer.invoke("project:create", path, template),
    load: (path) => electron.ipcRenderer.invoke("project:load", path),
    getRecent: () => electron.ipcRenderer.invoke("project:getRecent"),
    scanFiles: (projectPath) => electron.ipcRenderer.invoke("project:scanFiles", projectPath),
    selectDirectory: () => electron.ipcRenderer.invoke("project:selectDirectory")
  },
  // Transpiler APIs
  transpiler: {
    transpileFile: (filePath) => electron.ipcRenderer.invoke("transpiler:transpileFile", filePath),
    transpileProject: (projectPath) => electron.ipcRenderer.invoke("transpiler:transpileProject", projectPath)
  },
  // Process control APIs
  process: {
    build: (projectPath) => electron.ipcRenderer.invoke("process:build", projectPath),
    start: (projectPath, port) => electron.ipcRenderer.invoke("process:start", projectPath, port),
    stop: () => electron.ipcRenderer.invoke("process:stop"),
    isRunning: () => electron.ipcRenderer.invoke("process:isRunning"),
    subscribeOutput: () => electron.ipcRenderer.invoke("process:subscribeOutput"),
    onOutput: (callback) => {
      electron.ipcRenderer.on("process:output", (_, data) => callback(data));
      return () => electron.ipcRenderer.removeAllListeners("process:output");
    }
  },
  // File APIs
  file: {
    read: (filePath) => electron.ipcRenderer.invoke("file:read", filePath),
    readFile: (filePath) => electron.ipcRenderer.invoke("file:read", filePath),
    write: (filePath, content) => electron.ipcRenderer.invoke("file:write", filePath, content),
    writeFile: (filePath, content) => electron.ipcRenderer.invoke("file:write", filePath, content),
    openInEditor: (filePath, editor) => electron.ipcRenderer.invoke("file:openInEditor", filePath, editor),
    openExternal: (url) => electron.ipcRenderer.invoke("file:openExternal", url),
    showInFolder: (filePath) => electron.ipcRenderer.invoke("file:showInFolder", filePath)
  },
  // Template APIs
  template: {
    getMetadata: (componentId) => electron.ipcRenderer.invoke("template:getMetadata", componentId),
    getComponents: () => electron.ipcRenderer.invoke("template:getComponents"),
    preview: (request) => electron.ipcRenderer.invoke("template:preview", request),
    getUsageStats: (componentId) => electron.ipcRenderer.invoke("template:getUsageStats", componentId),
    getPerformance: (componentId) => electron.ipcRenderer.invoke("template:getPerformance", componentId),
    subscribeTelemetry: (componentId) => electron.ipcRenderer.invoke("template:subscribeTelemetry", componentId),
    unsubscribeTelemetry: () => electron.ipcRenderer.invoke("template:unsubscribeTelemetry"),
    onTelemetry: (callback) => {
      electron.ipcRenderer.on("template:telemetry", (_, telemetry) => callback(telemetry));
      return () => electron.ipcRenderer.removeAllListeners("template:telemetry");
    }
  },
  // SignalR APIs
  signalr: {
    connect: (url) => electron.ipcRenderer.invoke("signalr:connect", url),
    disconnect: () => electron.ipcRenderer.invoke("signalr:disconnect"),
    getComponentTree: () => electron.ipcRenderer.invoke("signalr:getComponentTree"),
    getComponentState: (componentId) => electron.ipcRenderer.invoke("signalr:getComponentState", componentId),
    updateComponentState: (componentId, stateKey, value) => electron.ipcRenderer.invoke("signalr:updateComponentState", componentId, stateKey, value),
    getAllComponents: () => electron.ipcRenderer.invoke("signalr:getAllComponents"),
    triggerRender: (componentId) => electron.ipcRenderer.invoke("signalr:triggerRender", componentId),
    subscribeStateChanges: (componentId) => electron.ipcRenderer.invoke("signalr:subscribeStateChanges", componentId),
    unsubscribeStateChanges: (componentId) => electron.ipcRenderer.invoke("signalr:unsubscribeStateChanges", componentId),
    isConnected: () => electron.ipcRenderer.invoke("signalr:isConnected"),
    previewCascade: (componentId, stateKey, newValue) => electron.ipcRenderer.invoke("signalr:previewCascade", componentId, stateKey, newValue)
  }
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}
