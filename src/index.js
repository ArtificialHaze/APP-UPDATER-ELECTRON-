const { app, BrowserWindow } = require("electron");
const path = require("path");
const { autoUpdater, AppUpdater } = require("electron-updater");

// ===========================<<<<<!!!IMPORTANT!!!>>>>>==========================

// 1. DO NOT ENABLE NODE INTEGRATION
// 2. ENABLE CONTEXT ISOLATION
// 3. DEFINE CONTENT SECURITY POLICY IN HTML
// 4. VALIDATE USER INPUT
// 5. png to ico - icon for electron app, nsis installer for windows,license file.md,
// 6. webpreferences: devtools:false,

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

const showMessage = (message) => {
  win.webContents.send("updateMessage", message);
};

if (require("electron-squirrel-startup")) {
  app.quit();
}

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1366,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: true,
    },
  });
  win.loadFile(path.join(__dirname, "index.html"));
  win.on("ready-to-show", () => {
    win.show();
  });
  win.webContents.openDevTools();
};

app.on("ready", () => {
  createWindow();
  autoUpdater.checkForUpdates();
  showMessage(`Checking for updates. Current version is ${app.getVersion()}`);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

autoUpdater.on("update-available", (info) => {
  showMessage("Update available");
  let path = autoUpdater.downloadUpdate();
  showMessage(path);
});

autoUpdater.on("update-not-available", (info) => {
  showMessage("No updates available");
  showMessage(info);
});

autoUpdater.on("update-downloaded", (info) => {
  showMessage("Update downloaded");
});

autoUpdater.on("error", (info) => {
  showMessage(info);
});
